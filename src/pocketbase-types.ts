/**
* This file was @generated using pocketbase-typegen
*/

import type PocketBase from 'pocketbase'
import type { RecordService } from 'pocketbase'

export enum Collections {
	Comment = "comment",
	Dream = "dream",
	Interpretation = "interpretation",
	LikePost = "likePost",
	Users = "users",
}

// Alias types for improved usability
export type IsoDateString = string
export type RecordIdString = string
export type HTMLString = string

// System fields
export type BaseSystemFields<T = never> = {
	id: RecordIdString
	created: IsoDateString
	updated: IsoDateString
	collectionId: string
	collectionName: Collections
	expand?: T
}

export type AuthSystemFields<T = never> = {
	email: string
	emailVisibility: boolean
	username: string
	verified: boolean
} & BaseSystemFields<T>

// Record types for each collection

export type CommentRecord = {
	dream?: RecordIdString
	textComment?: string
	user?: RecordIdString
}

export type DreamRecord = {
	nightmare?: boolean
	published?: boolean
	textDream?: string
	title?: string
	user?: RecordIdString
}

export type InterpretationRecord = {
	dream?: RecordIdString
	textInterpretation?: string
}

export type LikePostRecord = {
	dream?: RecordIdString
	user?: RecordIdString
}

export type UsersRecord = {
	avatar?: number
	name?: string
	premium?: boolean
}

// Response types include system fields and match responses from the PocketBase API
export type CommentResponse<Texpand = unknown> = Required<CommentRecord> & BaseSystemFields<Texpand>
export type DreamResponse<Texpand = unknown> = Required<DreamRecord> & BaseSystemFields<Texpand>
export type InterpretationResponse<Texpand = unknown> = Required<InterpretationRecord> & BaseSystemFields<Texpand>
export type LikePostResponse<Texpand = unknown> = Required<LikePostRecord> & BaseSystemFields<Texpand>
export type UsersResponse<Texpand = unknown> = Required<UsersRecord> & AuthSystemFields<Texpand>

// Types containing all Records and Responses, useful for creating typing helper functions

export type CollectionRecords = {
	comment: CommentRecord
	dream: DreamRecord
	interpretation: InterpretationRecord
	likePost: LikePostRecord
	users: UsersRecord
}

export type CollectionResponses = {
	comment: CommentResponse
	dream: DreamResponse
	interpretation: InterpretationResponse
	likePost: LikePostResponse
	users: UsersResponse
}

// Type for usage with type asserted PocketBase instance
// https://github.com/pocketbase/js-sdk#specify-typescript-definitions

export type TypedPocketBase = PocketBase & {
	collection(idOrName: 'comment'): RecordService<CommentResponse>
	collection(idOrName: 'dream'): RecordService<DreamResponse>
	collection(idOrName: 'interpretation'): RecordService<InterpretationResponse>
	collection(idOrName: 'likePost'): RecordService<LikePostResponse>
	collection(idOrName: 'users'): RecordService<UsersResponse>
}
