import type { Post } from "~/types/post";

export const usePostsStore = defineStore("posts", () => {
  const currentPage = ref<number>(1);
  const posts = ref<Post[]>([]);
  const postDetail = ref<Post>();

  const setPage = (page: number) => {
    currentPage.value = page;
  };

  const setPosts = (newPosts: Post[]) => {
    posts.value = newPosts;
  };
  const setPostDetail = (newPosts: Post) => {
    postDetail.value = newPosts;
  };

  return { currentPage, postDetail, posts, setPage, setPosts, setPostDetail };
});
