import type { Post } from "~/types/post";
import { API_URL } from "./const";
export const fetchPosts = async (page: number): Promise<Post[]> => {
  return $fetch<Post[]>(`${API_URL}/posts?page=${page}&limit=10`);
};

export const fetchPostDetail = async (id: number): Promise<Post> => {
  return $fetch<Post>(`${API_URL}/posts/${id}`);
};
