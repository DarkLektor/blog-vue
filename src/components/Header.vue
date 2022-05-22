<template>
  <header>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container">
        <a class="navbar-brand fs-4 fw-bold" href="#">Blog</a>

        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <img
            src="@/assets/search.svg"
            :style="{ width: '20px', height: '25px' }"
          />
        </button>

        <div
          class="collapse navbar-collapse align-items-center"
          id="navbarSupportedContent"
          :class="{ show: showMenu }"
        >
          <form
            class="d-flex ms-auto mt-lg-0 mt-3"
            role="search"
            @submit.prevent="searchPosts"
          >
            <input
              class="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
              v-model="query"
            />
            <button class="btn btn-outline-light" type="submit">Search</button>
          </form>
        </div>
      </div>
    </nav>
  </header>
</template>

<script setup lang="ts">
import postsApi from "@/api/posts";
import { ref, watch } from "vue";
import { useStore } from "@/store";

const store = useStore();
const query = ref<string>("");
const showMenu = ref<boolean>(false);

async function searchPosts() {
  if (query.value) {
    store.dispatch("searchPosts", query.value);
  }
}

watch(
  () => query.value,
  (value) => {
    if (!value) store.dispatch("getPosts");
  }
);
</script>

<style scoped></style>
