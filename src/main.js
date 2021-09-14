import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');

Vue.component('movieDetail', {
  props: ['movie'],
  template: `
  <li class="movie-item" v-bind:movie="items">
    <img src= {{ movie.Poster }}>
    <div class="block-info" width="50px" heidth="50px" backgraund="black">
        <font-awesome-icon v-on:click='findFavorites(item)' :icon="myIcon" />
        <span>{{ movie.imdbID }}</span>
        <p>{{ movie.Title }}</p>
    </div>;
  </li>
  `,
});

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
