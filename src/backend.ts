import PocketBase from 'pocketbase'
import { type TypedPocketBase } from './pocketbase-types.js'

export const pb = new PocketBase(import.meta.env.VITE_URL_POCKETBASE) as TypedPocketBase

export async function feed() {
    const posts = await pb.collection('dream').getFullList(
        {filter: "published: true", sort: "created"}
    );
    return posts;
}