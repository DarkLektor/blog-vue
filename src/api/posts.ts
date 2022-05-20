import axios from "axios";

const api_url = import.meta.env.VITE_APP_API_URL;

export default {
  getPosts(page: number = 1) {
    const start: number = page === 1 ? 0 : (page - 1) * 10;
    const url: string = `${api_url}/posts?limit=10&skip=${start}`;

    return axios.get(url).then((res) => {
      return res.data.posts;
    });
  },

  searchPosts(query: string) {
    const url: string = `${api_url}/posts/search?q=${query}`;

    return axios.get(url).then((res) => {
      return res.data.posts;
    });
  },

  getCommentsById(id: number) {
    const url: string = `${api_url}/posts/${id}/comments`;

    return axios.get(url).then((res) => {
      return res.data.comments;
    });
  },
};
