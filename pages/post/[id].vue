<template>
  <PostDetail :post-id="postId"></PostDetail>
</template>
<script setup lang="ts">
import { usePostDetailStore } from "~/stores/postDetailStore";
import type { Post } from "~/types/post";

const route = useRoute();
const postId = Number(route.params.id);
const postDetailStore = usePostDetailStore();
const { data, isLoading, isError, error } = useQuery({
  queryKey: ["postId", postId],
  queryFn: () => fetchPostDetail(postId),
  enabled: !!postId,
});

watch(data, (newData) => {
  if (newData) {
    postDetailStore.setPostDetail(newData);
  }
});
watch(isError, (errorState) => {
  postDetailStore.setIsError(errorState);
});
watch(isLoading, (loadingState) => {
  postDetailStore.setIsLoading(loadingState);
});
watch(error, (newError) => {
  if (newError) {
    postDetailStore.setError(newError);
  }
});

  useHead({
    title: data.title,
    meta: [
      { name: "description", content: data.body.slice(0, 150) + "..." },
      {
        name: "keywords",
        content:
          data.title +
          ", blog, " +
          data.created_by.first_name +
          " " +
          data.created_by.last_name,
      },
      {
        name: "author",
        content: `${data.created_by.first_name} ${data.created_by.last_name}`,
      },
      { property: "og:title", content: data.title },
      { property: "og:description", content: data.body.slice(0, 150) + "..." },
      { property: "og:type", content: "article" },
      { property: "og:image", content: data.created_by.avatar },
    ],
  });
</script>
