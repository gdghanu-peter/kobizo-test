<template>
  <h1
    class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl mb-2 lg:mb-4"
  >
    The Blog
  </h1>
  <div class="mb-4 lg:mb-6 text-lg text-gray-500">
    Read the latest news about all solutions, from framework announcements to
    integration tutorials.
  </div>
  <div v-if="!isLoading">
    <div
      class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8 items-center mb-4"
    >
      <div v-for="card in postsStore.posts" :key="card.id">
        <NuxtLink :to="`/post/${card.id}`">
          <Card class="max-w-[400px] overflow-hidden hover:bg-gray-50">
            <template #title
              ><h2 class="min-h-[60px]">{{ card.title }}</h2>
            </template>
            <template #content>
              <p class="line-clamp-3" v-html="card.body"></p>
            </template>
            <template #footer>
              <div class="flex justify-between items-center mt-2">
                <div>{{ formatDate(card.created_at) }}</div>
                <Avatar
                  :image="card.created_by.avatar"
                  class="mr-2"
                  shape="circle"
                />
              </div>
            </template>
          </Card>
        </NuxtLink>
      </div>
    </div>
    <Paginator
      :rows="10"
      :totalRecords="30"
      :page="postsStore.currentPage - 1"
      @page="onPageChange"
    />
  </div>
  <div v-else-if="!isError" class="flex justify-center h-[80vh] items-center">
    <ProgressSpinner v-if="!isError" aria-label="Loading" />
  </div>
  <div class="text-3xl flex justify-center h-[80vh] items-center" v-else>
    Fetch Data Fail <br> 
    Message: {{ error?.message }} <br>
  </div>
</template>
<script setup lang="ts">
import type { PageState } from "primevue/paginator";

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

const onPageChange = (event: PageState) => {
  postsStore.setPage(event.page + 1);
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
