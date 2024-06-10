import PocketBase from 'pocketbase'
import { type DreamResponse, type TypedPocketBase, type UsersResponse, type CommentResponse } from './pocketbase-types.js'

export const pb = new PocketBase(import.meta.env.VITE_URL_POCKETBASE) as TypedPocketBase

export async function dreamsOfUser(id: string){
    const records = await pb.collection<UsersResponse<{dream_via_user:DreamResponse}>>('users').getOne(
        id, {
        expand: "dream_via_user",},
    );
    console.log("dreams of a user", id, records);
    return records;
}

export async function userOfComment(id: string){
    const records = await pb.collection<UsersResponse<{user_via_commment:CommentResponse}>>('users').getOne( id, { expand: "user_via_comment"},);
    console.log(records);
    return records;
}