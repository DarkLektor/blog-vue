<template>
  <article
    class="posts-item border p-4 mb-sm-4 mb-3 rounded w-100 d-flex flex-column justify-content-start align-items-start"
  >
    <h3 class="posts-item-title">{{ post.title }}</h3>
    <p>{{ post.body }}</p>

    <div
      v-if="showComments && !noComments"
      class="posts-item-comments mb-4 w-100 bg-light rounded p-4 pb-2"
    >
      <article
        v-for="(comment, index) in comments"
        :key="index"
        class="border-bottom"
        :class="{
          'border-bottom-0': comments.length - 1 === index,
          'pt-2': index !== 0,
        }"
      >
        <a href="#" class="fw-semibold text-decoration-none">{{
          comment.user.username
        }}</a>
        <p class="my-2">{{ comment.body }}</p>
      </article>
    </div>

    <p v-if="noComments" class="mb-4">No comments</p>

    <button
      class="btn btn-dark ms-auto"
      @click="getComments(post.id)"
      :disabled="loading"
    >
      <span v-if="!showComments">Show comments</span>
      <span v-if="showComments">Hide comments</span>
    </button>
  </article>
</template>

<script setup lang="ts">
import { defineProps, ref } from "vue";
import postsApi from "@/api/posts";

type commentsType = {
  id: number;
  body: string;
  postId: number;
  user: {
    id: number;
    username: string;
  };
};

const { post } = defineProps(["post"]);
const comments = ref<commentsType[]>([]);
const noComments = ref<boolean>(false);
const showComments = ref<boolean>(false);
const loading = ref<boolean>(false);

async function getComments(id: number) {
  if (comments.value.length === 0 && !noComments.value) {
    loading.value = true;
    comments.value = await postsApi.getCommentsById(id);
    noComments.value = comments.value.length === 0;
  }

  showComments.value = !showComments.value;
  loading.value = false;
}
</script>

<style scoped></style>
