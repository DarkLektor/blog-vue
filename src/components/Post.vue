<template>
  <article
    class="posts-item border p-4 mb-sm-4 mb-3 rounded w-100 d-flex flex-column justify-content-start align-items-start"
  >
    <h3 class="posts-item-title">{{ post.title }}</h3>
    <p>{{ post.body }}</p>

    <div :id="'comments-' + post.id" class="posts-item-comments collapse w-100">
      <p v-if="noComments" class="mb-4">No comments</p>

      <div v-else class="wrapper rounded p-4 pb-2 mb-4 w-100 bg-light">
        <CommentsList :comments="comments" />
      </div>
    </div>

    <button
      class="btn btn-dark ms-auto"
      data-bs-toggle="collapse"
      :data-bs-target="'#comments-' + post.id"
      aria-expanded="false"
      :aria-controls="'comments-' + post.id"
      @click="getComments(post.id)"
      :disabled="loading"
    >
      <span v-if="!isShowComments">Show comments</span>
      <span v-else>Hide comments</span>
    </button>
  </article>
</template>

<script setup lang="ts">
import { ref, defineProps } from "vue";
import postsApi from "@/api/posts";
import CommentsList from "./CommentsList.vue";

type Comments = {
  id: number;
  body: string;
  postId: number;
  user: {
    id: number;
    username: string;
  };
};

const { post } = defineProps(["post"]);
const comments = ref<Comments[]>([]);
const noComments = ref<boolean>(false);
const isShowComments = ref<boolean>(false);
const loading = ref<boolean>(false);

async function getComments(id: number) {
  if (!comments.value.length && !noComments.value) {
    loading.value = true;
    comments.value = await postsApi.getCommentsById(id);
    noComments.value = !comments.value.length;
  }

  isShowComments.value = !isShowComments.value;
  loading.value = false;
}
</script>

<style scoped></style>
