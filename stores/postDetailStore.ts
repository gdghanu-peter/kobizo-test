import type { Post } from "~/types/post";

export const usePostDetailStore = defineStore("detailPost", () => {
  const isError = ref<boolean>(false)
  const isLoading = ref<boolean>(true)
  const postDetail = ref<Post>();
  const error =ref<Error>()

  const setPostDetail = (newPosts: Post) => {
    postDetail.value = newPosts;
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
  return { postDetail, isError, isLoading, error, setPostDetail, setIsError ,setIsLoading, setError };
});
