import PocketBase from 'pocketbase'
import { type DreamResponse, type TypedPocketBase, type UsersResponse, type CommentResponse, type LikePostResponse } from './pocketbase-types.js'

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
    startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay()); // Go to the start of the week (Sunday)

    const endOfWeek = new Date();
    endOfWeek.setHours(23, 59, 59, 999);
    endOfWeek.setDate(startOfWeek.getDate() + 6); // Go to the end of the week (Saturday)

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
