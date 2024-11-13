<template>
  <Breadcrumb class="text-gray-500 text-xl" :model="breadcrumbItems">
    <template #item="{ item }">
      <router-link v-slot="{ href }" :to="item.route" custom>
        <NuxtLink :to="href">
          <span class="text-primary font-semibold hover:text-green-500">{{
            item.label
          }}</span>
        </NuxtLink>
      </router-link>
    </template>
  </Breadcrumb>
  <div
    class="p-4"
    v-if="!postDetailStore.isLoading && postDetailStore.postDetail"
  >
    <p class="text-gray-500 mb-1">
      {{ formatDate(postDetailStore.postDetail.created_at) }}
    </p>
    <h1 class="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
      {{ postDetailStore.postDetail.title }}
    </h1>
    <div class="flex mb-6 items-center">
      <Avatar
        :image="postDetailStore.postDetail.created_by.avatar"
        class="mr-2"
        shape="circle"
      />
      <div class="font-medium">
        <p>
          {{ postDetailStore.postDetail.created_by.first_name }}
          {{ postDetailStore.postDetail.created_by.last_name }}
        </p>
        <p class="text-gray-500 leading-4">
          @{{ postDetailStore.postDetail.created_by.username }}
        </p>
      </div>
    </div>
    <div v-html="postDetailStore.postDetail.body"></div>
  </div>
  <div
    v-else-if="!postDetailStore.isError"
    class="flex justify-center h-[80vh] items-center"
  >
    <ProgressSpinner aria-label="Loading" />
  </div>
  <div class="text-3xl flex justify-center h-[80vh] items-center" v-else>
    Fetch Data Fail <br />
    Message: {{ postDetailStore.error?.message }} <br />
  </div>
</template>

<script setup lang="ts">
import { usePostDetailStore } from "~/stores/postDetailStore";
type Props = {
  postId: number;
};
const props = defineProps<Props>();

const postDetailStore = usePostDetailStore();

const breadcrumbItems = computed(() => [
  { label: "Home", route: "/" },
  {
    label: postDetailStore.postDetail?.title ?? "Loading title...",
    route: `/post/${props.postId}`,
  },
]);
</script>
