<template>
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
</template>

<script setup lang="ts">
import { defineProps } from "vue";

const { comments } = defineProps(["comments"]);
</script>

<style scoped></style>
