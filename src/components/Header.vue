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
          @click="showMenu = !showMenu"
          :class="{ collapsed: showMenu }"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <div
          class="collapse navbar-collapse align-items-center pt-lg-0 pt-3"
          id="navbarSupportedContent"
          :class="{ show: showMenu }"
        >
          <form class="d-flex ms-auto" role="search">
            <input
              class="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
              v-model="query"
            />

            <button
              class="btn btn-outline-light"
              type="submit"
              @click.prevent="searchPosts"
            >
              Search
            </button>
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
