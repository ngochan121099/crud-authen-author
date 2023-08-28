import { Schema } from 'mongoose';

export interface BlogList {
  title?: string;
  description?: string;
  userId: Schema.Types.ObjectId;
}

export interface CreateBlog extends BlogList {}

export interface BlogId {
  id: string;
}

export interface UpdateBlog {
  title?: string;
  description?: string;
}
