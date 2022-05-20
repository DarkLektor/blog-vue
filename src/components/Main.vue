<template>
  <main
    class="posts container py-4 d-flex flex-column justify-content-start align-items-start"
  >
    <h1 class="mb-4">Posts</h1>

    <p v-if="!posts.length" class="fs-5">
      There are no suitable posts for this criteria
    </p>

    <Post v-for="(post, index) in posts" :post="post" />

    <button
      @click="getNextPage"
      class="btn btn-dark ms-auto"
      v-if="showNextPageBtn"
    >
      More posts
    </button>
  </main>
</template>

<script setup lang="ts">
import { computed, onMounted } from "vue";
import { useStore } from "@/store";
import Post from "./Post.vue";

const store = useStore();
const posts = computed(() => store.state.posts);
const showNextPageBtn = computed(() => store.state.showNextPageBtn);

onMounted(() => {
  store.dispatch("getPosts");
});

function getNextPage() {
  store.dispatch("getNextPage");
}
</script>

<style scoped></style>
