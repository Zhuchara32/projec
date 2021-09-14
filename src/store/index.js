import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  },
});

// Vue.component('movieDetail', {
//   props: ['movie'],
//   template: `
//   <img src= {{ item.Poster }}>
//   <div class="block-info">
//       <font-awesome-icon v-on:click='findFavorites(item)' :icon="myIcon" />
//       <span>{{ item.imdbID }}</span>
//       <p>{{ item.Title }}</p>
//   </div>;
//   `,
// });

// const vue = new Vue({
//   el: '#mymovie',
//   data() {
//     return {
//       url: 'http://www.omdbapi.com/?apikey=75d35365&',
//       arrResp: [],
//     };
//   },
//   methods: {
//     getSearchResult() {
//       fetch(this.getURL(this.url))
//         .then((response) => response.json())
//         .then((json) => json.Search)
//         .then((array) => this.createMovieBlock(array))
//         .catch(() => {
//           console.log('j');
//           this.createErrorMessage();
//         });
//     },
//   },
// });
