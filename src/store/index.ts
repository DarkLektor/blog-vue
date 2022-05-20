import postsModel from "@/models/posts.model";
import { InjectionKey } from "vue";
import { createStore, useStore as baseUseStore, Store } from "vuex";
import postsApi from "@/api/posts";

export interface State {
  posts: postsModel[];
  page: number;
  showNextPageBtn: boolean;
}

export const key: InjectionKey<Store<State>> = Symbol();

export const store = createStore<State>({
  state: {
    posts: [],
    page: 1,
    showNextPageBtn: false,
  },

  mutations: {
    setPosts(state, list: postsModel[]) {
      state.posts = list;
    },

    setPage(state, page: number) {
      state.page = page;
    },

    setShowNextPageBtn(state, payload: boolean) {
      state.showNextPageBtn = payload;
    },
  },

  actions: {
    async getPosts({ commit }) {
      const postsList: postsModel[] = await postsApi.getPosts();

      commit("setPosts", postsList);
      commit("setShowNextPageBtn", postsList.length === 10);
    },

    async getNextPage({ commit, state }) {
      const postsList: postsModel[] = await postsApi.getPosts(state.page + 1);

      commit("setPage", state.page + 1);
      commit("setPosts", [...state.posts, ...postsList]);
      commit("setShowNextPageBtn", postsList.length == 10);
    },

    async searchPosts({ commit }, query) {
      const postsList: postsModel[] = await postsApi.searchPosts(query);

      commit("setPosts", postsList);
      commit("setPage", 1);
      commit("setShowNextPageBtn", postsList.length == 10);
    },
  },
  getters: {},
});

// define your own `useStore` composition function
export function useStore() {
  return baseUseStore(key);
}
