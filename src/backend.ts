import PocketBase from 'pocketbase'
import { type DreamResponse, type TypedPocketBase, type UsersResponse, type CommentResponse, type LikePostResponse, type InterpretationResponse } from './pocketbase-types.js'

export const pb = new PocketBase(import.meta.env.VITE_URL_POCKETBASE) as TypedPocketBase

export async function dreamsOfUser(id: string){
    const records = await pb.collection<UsersResponse<{dream_via_user:DreamResponse}>>('users').getOne(
        id, {
        expand: "dream_via_user",},
    );
    console.log("dreams of a user", id, records);
    return records;
}
export async function publicDreamsOfUser(id: string) {
  const user = await pb.collection('users').getOne(id);
  const dreams = await pb.collection('dream').getFullList({
    filter: `user = "${id}" && published = true`,
    expand: 'user',
    sort: '-created',
  });
  return { ...user, expand: { dream_via_user: dreams } };
}


export async function userOfComment(id: string){
    const records = await pb.collection<UsersResponse<{user_via_commment:CommentResponse}>>('users').getOne( id, { expand: "user_via_comment"},);
    console.log(records);
    return records;
}

export async function dreamById(id: string){
    const records = await pb.collection('dream').getOne(id);
    console.log(records);
    return records;
}

export async function doLikePost(idPost: string, idUser: string){
    
}

export async function getMostLikedPostThisWeek(): Promise<{ dream: DreamResponse, user: UsersResponse } | null> {
  try {
    // Calculate the start and end dates of the current week
    const startOfWeek = new Date();
    startOfWeek.setHours(0, 0, 0, 0);
    startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay()); // Go to the start of the current week (Monday)

    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6); // Go to the end of the current week (Sunday)
    endOfWeek.setHours(23, 59, 59, 999); // Set the time to the end of the day

    // Fetch all the dream posts created within the current week
    const thisWeekDreams = await pb.collection<DreamResponse>('dream').getFullList({
      filter: `created >= "${startOfWeek.toISOString()}" && created <= "${endOfWeek.toISOString()}"`,
    });

    // Fetch all the likes that were created within the current week
    const thisWeekLikes = await pb.collection<LikePostResponse>('likePost').getFullList({
      filter: `created >= "${startOfWeek.toISOString()}" && created <= "${endOfWeek.toISOString()}"`,
    });

    // Count the number of likes for each dream post created this week
    const postIdCounts = thisWeekLikes.reduce((counts, like) => {
      if (thisWeekDreams.some(dream => dream.id === like.dream)) {
        counts[like.dream] = (counts[like.dream] || 0) + 1;
      }
      return counts;
    }, {} as { [key: string]: number });

    // Check if there are any likes
    if (Object.keys(postIdCounts).length === 0) {
      console.log('No likes found for the dream posts created this week');
      return null;
    }

    // Find the dream post with the most likes
    const mostLikedPostId = Object.keys(postIdCounts).reduce((a, b) =>
      postIdCounts[a] > postIdCounts[b] ? a : b
    );

    // Fetch the dream post and the user who created it
    const mostLikedPost = await pb.collection<DreamResponse>('dream').getOne(mostLikedPostId);
    if (mostLikedPost) {
      const user = await pb.collection<UsersResponse>('users').getOne(mostLikedPost.user);
      if (user) {
        console.log("most liked post created this week", mostLikedPost, user);
        return { dream: mostLikedPost, user };
      }
    }
  } catch (error) {
    console.error('Failed to fetch most liked post created this week', error);
  }

  return null;
}


const API_URL = "https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.3";
const headers = { "Authorization": "Bearer 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", "Content-Type": "application/json" };

export async function interpretDream(id) {
  try {
    const records = await pb.collection('dream').getOne(id);
    const dreamText = records.textDream;
    console.log('Dream text:', dreamText);

 const prompt = `You are an expert in dream interpretation. Please provide a simple interpretation of the following dream in no more than 100 words: '${dreamText}'`;    console.log('Prompt:', prompt);

    const payload = {
      inputs: prompt,
      parameters: { max_new_tokens: 500, return_full_text: true }
    };

    const response = await fetch(API_URL, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(payload)
    });

    const responseData = await response.json();
    console.log('Response data:', responseData);

    const generatedText = responseData[0].generated_text;
    console.log('Generated text:', generatedText);

    const promptLength = prompt.length;
    const output = generatedText.substring(promptLength).trim();

    // Remove Markdown-style code blocks from the response
    const cleanedOutput = output.replace(/```json\n|\n```/g, "");
    console.log('Cleaned output:', cleanedOutput);

    const newInterpretation = await pb.collection('interpretation').create({ textInterpretation: cleanedOutput, dream: id });
    console.log('New interpretation created:', newInterpretation);

    return cleanedOutput;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

export async function interpretationByDream(id: string) {
  console.log('Fetching interpretation for dream:', id);
  const records = await pb.collection<DreamResponse<{ interpretation_via_dream: InterpretationResponse }>>('dream').getOne(
    id,
    {
      expand: 'interpretation_via_dream',
    }
  );
  console.log('Interpretation for dream:', id, records);
  return records;
}

//stats

export async function getUserActivityPercentage(userId: string): Promise<number> {
  // Fetch user data
  const user = await pb.collection<UsersResponse>('users').getOne(userId);
  if (!user) {
    throw new Error('User not found');
  }

  // Calculate the number of days since account creation
  const accountCreationDate = new Date(user.created);
  const currentDate = new Date();
  const daysSinceCreation = Math.ceil((currentDate.getTime() - accountCreationDate.getTime()) / (1000 * 60 * 60 * 24));

  // Fetch user's dreams
  const userDreams = await pb.collection<DreamResponse>('dream').getFullList({
    filter: `user="${userId}"`,
  });

  // Extract the unique dates on which dreams were created
  const uniqueDreamDates = new Set(userDreams.map(dream => new Date(dream.created).toDateString()));

  // Calculate the percentage of days with dreams
  const activeDays = uniqueDreamDates.size;
  const activityPercentage = (activeDays / daysSinceCreation) * 100;

  // Return the percentage value without the % sign, rounded to the nearest integer
  return Math.round(activityPercentage);
}



export async function getNightmarePercentage(userId: string): Promise<number> {
  try {
    // Fetch all dreams of the user
    const response = await pb.collection('dream').getFullList<DreamResponse>({
      filter: `user="${userId}"`,
    });

    const dreams = response;

    // Check if there are any dreams
    if (!dreams.length) {
      return 0; // No dreams
    }

    // Count the number of nightmares
    const nightmareCount = dreams.filter(dream => dream.nightmare).length;

    // Calculate the percentage
    const percentage = (nightmareCount / dreams.length) * 100;

    return Math.round(percentage); // Return the percentage rounded to the nearest integer
  } catch (error) {
    console.error('Error fetching dreams:', error);
    return 0; // In case of an error, return 0
  }
}
