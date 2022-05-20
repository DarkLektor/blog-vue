import { Store } from "vuex";
import posts from "@/models/posts.model";

declare module "@vue/runtime-core" {
  // declare your own store states
  interface State {
    posts: posts[];
  }

  // provide typings for `this.$store`
  interface ComponentCustomProperties {
    $store: Store<State>;
  }
}
