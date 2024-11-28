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
    title: post.title,
    meta: [
      { name: "description", content: post.body.slice(0, 150) + "..." },
      {
        name: "keywords",
        content:
          post.title +
          ", blog, " +
          post.created_by.first_name +
          " " +
          post.created_by.last_name,
      },
      {
        name: "author",
        content: `${post.created_by.first_name} ${post.created_by.last_name}`,
      },
      { property: "og:title", content: post.title },
      { property: "og:description", content: post.body.slice(0, 150) + "..." },
      { property: "og:type", content: "article" },
      { property: "og:image", content: post.created_by.avatar },
    ],
  });
</script>
