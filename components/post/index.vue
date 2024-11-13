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
    <div v-if="!postsStore.isLoading">
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
    <div v-else-if="!postsStore.isError" class="flex justify-center h-[80vh] items-center">
      <ProgressSpinner aria-label="Loading" />
    </div>
    <div class="text-3xl flex justify-center h-[80vh] items-center" v-else>
      Fetch Data Fail <br> 
      Message: {{ postsStore.error?.message }} <br>
    </div>
  </template>
  <script setup lang="ts">
import type { PageState } from 'primevue/paginator';

  const postsStore = usePostsStore();

  
  const emit = defineEmits<{
  (e: 'changePage', page: number): void
}>()

const onPageChange =(event: PageState) =>{
    emit('changePage', event.page)
}
  </script>
  