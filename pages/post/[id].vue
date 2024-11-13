<template>
  <Breadcrumb class="text-gray-500 text-xl" :model="breadcrumbItems">
    <template #item="{ item }">
      <router-link v-slot="{ href }" :to="item.route" custom>
        <NuxtLink :to="href">
          <span class="text-primary font-semibold hover:text-green-500">{{ item.label }}</span>
        </NuxtLink>
      </router-link>
    </template>
  </Breadcrumb>
  <div class="p-4" v-if="!isLoading && postsStore.postDetail">
    <p class="text-gray-500 mb-1">
      {{ formatDate(postsStore.postDetail.created_at) }}
    </p>
    <h1 class="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
      {{ postsStore.postDetail.title }}
    </h1>
    <div class="flex mb-6 items-center">
      <Avatar
        :image="postsStore.postDetail.created_by.avatar"
        class="mr-2"
        shape="circle"
      />
      <div class="font-medium">
        <p>
          {{ postsStore.postDetail.created_by.first_name }}
          {{ postsStore.postDetail.created_by.last_name }}
        </p>
        <p class="text-gray-500 leading-4">
          @{{ postsStore.postDetail.created_by.username }}
        </p>
      </div>
    </div>
    <div v-html="postsStore.postDetail.body"></div>
  </div>
  <div v-else-if="!isError" class="flex justify-center h-[80vh] items-center">
    <ProgressSpinner aria-label="Loading" />
  </div>
  <div class="text-3xl flex justify-center h-[80vh] items-center" v-else>
    Fetch Data Fail <br> 
    Message: {{ error?.message }} <br>
  </div>
</template>

<script setup lang="ts">
import type { Post } from "~/types/post";

const route = useRoute();
const postId = Number(route.params.id);
const postsStore = usePostsStore();
const { data, isLoading, isError, error } = useQuery({
  queryKey: ["postId", postId],
  queryFn: () => fetchPostDetail(postId),
  enabled: !!postId,
});

const breadcrumbItems = computed(() => [
  { label: "Home", route: "/" },
  {
    label: postsStore.postDetail?.title ?? "Loading title...",
    route: `/post/${postId}`,
  },
]);

watch(data, (newData) => {
  if (newData) {
    postsStore.setPostDetail(newData);
    setSeoMetadata(newData);
  }
});

const setSeoMetadata = (post: Post) => {
  useHead({
    title: post.title,
    meta: [
      { name: "description", content: post.body.slice(0, 150) + "..." }, // Description of the post
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
};
</script>
