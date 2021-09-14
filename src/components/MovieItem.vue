<template>
  <!-- <div class="block-movie" v-if='show'> -->
  <div>
    <!-- <div class="movie-item"
          v-for='item of arrResp'
          v-bind:key="item.id"> -->
      <img src= {{ item.Poster }}>
        <div class="block-info">
            <font-awesome-icon v-on:click='findFavorites(item)' :icon="myIcon" />
            <span>{{ item.imdbID }}</span>
            <p>{{ item.Title }}</p>
        <!-- </div>; -->
    </div>
  <!-- </div> -->
  </div>
</template>

<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

library.add(faHeart);

export default {
  name: 'MovieItem',
  components: {
    FontAwesomeIcon,
  },
  // props: [movieItems],
  data() {
    return {
      myIcon: faHeart,
      show: false,
      arrResp: [],
    };
  },
};
</script>

<style lang='scss'>
.error-message {
    width: fit-content;
    padding: 1rem;
    background-color: rgb(248, 81, 81);
    color: #fff;
    border-radius: 5px;
    margin: 0.8rem auto;
  }
  .block-movie {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  height: 1000px;
  width: 100%;
}
.movie-item {
  width: 200px;
  height: 400px;
  display: flex;
  flex-direction: column;
  color: #fff;
  background: hotpink;
  margin-right: 10px;
  margin-bottom: 15px;
  & img {
    max-width: 100%;
    height: 300px;
  }
  .block-info {
    position: relative;
    padding: 10px;
    & span {
      visibility: hidden;
    }
    .fa-heart {
      position: absolute;
      top: 10px;
      width: 20px;
      color: #fff;
    }
    & p {
      position: absolute;
      top: 35px;
      color: #fff;
      font-size: 13px;
    }
  }
  &:hover {
    opacity: 0.7;
  }
}
.main {
  padding: 0 10px 0 20px;
}

</style>
