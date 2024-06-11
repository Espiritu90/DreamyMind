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
    expand: 'user'
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
export async function getMostLikedPostLastWeek(): Promise<{ dream: DreamResponse, user: UsersResponse } | null> {
  try {
    const startOfWeek = new Date();
    startOfWeek.setHours(0, 0, 0, 0);
    startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay() + 1); // Go to the start of the week (Monday)

    const endOfWeek = new Date();
    endOfWeek.setHours(23, 59, 59, 999);
    endOfWeek.setDate(startOfWeek.getDate() + 6); // Go to the end of the week (Sunday)

    const lastWeekLikes = await pb.collection<LikePostResponse>('likePost').getFullList({
      filter: `created >= "${startOfWeek.toISOString()}" && created <= "${endOfWeek.toISOString()}"`,
    });

    const postIdCounts: { [key: string]: number } = {};
    for (const like of lastWeekLikes) {
      postIdCounts[like.dream] = (postIdCounts[like.dream] || 0) + 1;
    }

    const mostLikedPostId = Object.keys(postIdCounts).reduce((a, b) => postIdCounts[a] > postIdCounts[b] ? a : b);

    const mostLikedPost = await pb.collection<DreamResponse>('dream').getOne(mostLikedPostId);
    if (mostLikedPost) {
      const user = await pb.collection<UsersResponse>('users').getOne(mostLikedPost.user);
      if (user) {
        console.log("most liked post", mostLikedPost, user);
        return { dream: mostLikedPost, user };
      }
    }
  } catch (error) {
    console.error('Failed to fetch most liked post', error);
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

    const prompt = `You are an expert in dream interpretation. Please provide a simple interpretation of the following dream in no more than 100 words: '${dreamText}'.`;
    console.log('Prompt:', prompt);

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
