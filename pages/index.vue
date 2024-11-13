<template>
  <Post @change-page="onPageChange"></Post>
</template>
<script setup lang="ts">
const queryClient = useQueryClient();
const postsStore = usePostsStore();

const page = computed(() => {
  return postsStore.currentPage;
});
const { data, isLoading, isError, error } = useQuery({
  queryKey: ["posts", page.value],
  queryFn: () => fetchPosts(page.value),
});

watch(data, (newData) => {
  if (newData) {
    postsStore.setPosts(newData);
  }
});

watch(isError, (errorState) => {
  postsStore.setIsError(errorState);
});
watch(isLoading, (loadingState) => {
  postsStore.setIsLoading(loadingState);
});
watch(error, (newError) => {
  if (newError) {
    postsStore.setError(newError);
  }
});
const onPageChange = (newPage: number) => {
  postsStore.setPage(newPage + 1);
  queryClient.invalidateQueries({ queryKey: ["posts"] });
};

useHead({
  title: "The Blog",
  meta: [
    { name: "description", content: "Blog description Seo" },
    { name: "keywords", content: "Blog" },
    { property: "og:title", content: "Demo title" },
    { property: "og:description", content: "Demo description" },
  ],
});
</script>
