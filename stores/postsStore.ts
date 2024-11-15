import type { Post } from "~/types/post";

export const usePostsStore = defineStore("posts", () => {
  const currentPage = ref<number>(1);
  const posts = ref<Post[]>([]);
  const isError = ref<boolean>(false)
  const isLoading = ref<boolean>(true)
  const error =ref<Error>()
  const setPage = (page: number) => {
    currentPage.value = page;
  };

  const setPosts = (newPosts: Post[]) => {
    posts.value = newPosts;
  };

  const setIsError = (errorState: boolean) => {
    isError.value = errorState;
  };
  const setIsLoading = (loadingState: boolean) => {
    isLoading.value = loadingState;
  };
  const setError = (newError: Error) => {
    error.value = newError
  }
  return { currentPage, posts, isError, isLoading, error, setPage, setPosts , setIsError, setIsLoading, setError};
});
