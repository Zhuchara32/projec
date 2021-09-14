<template>
  <header class="searchMovies">
    <button class="favorite-btn btn" id="favorite-btn"
    v-on:click="getFavMovies">Избранное</button>
    <h1 class="searchMovies__title">Find your movie</h1>
    <form action="#" id="form" class="searchMovies__form">
        <input class="searchMovies__form__input"
        v-model="message" type="text" id="form__input">
        <p>{{ message }}</p>
        <select class="searchMovies__form__select"
        v-model="selected" name="select" id="select">
            <option value="movie">Movie</option>
            <option value="series">Series</option>
            <option value="episode">Episode</option>
        </select>
        <span>Выбрано: {{ selected }}</span>
        <button type="button" id="btn__request" class="btn"
        v-on:click="getSearchResult()" value="Search">Search</button>
        <transition name="error">
          <p class="error-message" v-if="active">
            Такой фильм не найдено
          </p>
        </transition>
    </form>
    <main class="main">
      <!-- <transition name="fade"> -->
        <ul class="block-movie" v-if='show'>
          {{ arrResp }}
          <li class="movie-item"
          v-for='item in arrResp'
          v-bind:key="item.id">
            <!-- <template v-bind:items="item.id"> -->
              <img src= {{ item.Poster }}>
                <div class="block-info">
                    <font-awesome-icon v-on:click='findFavorites(item)' :icon="myIcon" />
                    <span>{{ resp.imdbID }}</span>
                    <p>{{ resp.Title }}</p>
                </div>;
            <!-- </template> -->
            <!-- <MovieItem v-bind="item" /> -->
            <!-- <movieDetail v-bind:movie='item' /> -->
            </li>
        </ul>
    </main>
  </header>
</template>

<script>
// import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
// import { library } from '@fortawesome/fontawesome-svg-core';
// import { faHeart } from '@fortawesome/free-solid-svg-icons';
// import MovieItem from './MovieItem.vue';
// import movieDetail from '../main';

// library.add(faHeart);

export default {
  name: 'SearchMovies',
  components: {
  // movieDetail,
  //   FontAwesomeIcon,
    // MovieItem,
  },
  data() {
    return {
      url: 'http://www.omdbapi.com/?apikey=75d35365&',
      arrResp: [],
      // newEl: '',
      errMessage: '',
      show: false,
      // myIcon: faHeart,
      active: false,
      selected: '',
      message: '',
    };
  },
  methods: {
    // Делает запрос на сервер исходя из параметров поиска
    getSearchResult() {
      fetch(this.getURL(this.url))
        .then((response) => response.json())
        .then((json) => json.Search)
        .then((array) => this.createMovieBlock(array))
        .catch(() => {
          console.log('j');
          this.createErrorMessage();
        });
    },
    // Формирует URL для поискового запроса из базового URL и того что ввёл пользователь
    getURL(url) {
      // const inp = document.querySelector('#form__input');
      // const select = document.querySelector('#select');
      // const inpValue = inp.value;
      // const opt = select.value;
      if (this.message !== '') {
        let urlClone = url;
        urlClone = `${url}s=${this.message}&type=${this.selected}`;
        return urlClone;
      }
      alert('Введите, пожалуйста название фильма');
      return url;
    },
    // Формирует блоки с фильмами из поиска и выводит их на страницу
    createMovieBlock(arrResp) {
      console.log(arrResp);
      console.log(this.show === false);
      console.log(arrResp !== '');
      // if (this.newEl === undefined && arrResp !== '') {
      if (this.show === false && arrResp !== '') {
        // this.newEl = document.createElement('div');
        // this.newEl.classList.add('block-movie');
        // for (const item of this.arrResp) {
        // this.arrResp.forEach((item) => {
        //   const movieItem = document.createElement('div');
        //   movieItem.classList.add('movie-item');
        //   movieItem.innerHTML += `
        this.show = true;
      //   this.item.innerHTML = `
      // <img src= {{ item.Poster }}>
      //   <div class="block-info">
      //       <font-awesome-icon v-on:click='findFavorites(item)' :icon="myIcon" />
      //       <span>{{ item.imdbID }}</span>
      //       <p>{{ item.Title }}</p>
      //   </div>`;
        //   this.newEl.append(movieItem);
        // });
        // main.append(newEl);
      } else if (this.show === true && arrResp !== '') {
        // this.newEl.remove();
        // this.newEl = document.createElement('div');
        // this.newEl.classList.add('block-movie');
        // for (const item of arrResp) {
        // this.arrResp.forEach((item) => {
        //   const movieItem = document.createElement('div');
        //   movieItem.classList.add('movie-item');
        //   movieItem.innerHTML += `
        //   <img src="${item.Poster}">
        //   <div class="block-info">
        //       <a class="fas fa-heart" style="color:${this.findFavorites(item)}"></a>
        //       <span>${item.imdbID}</span>
        //       <p>${item.Title}</p>
        //   </div>`;
        // this.newEl.append(movieItem);
        // });
        // main.append(newEl);
        this.show = true;
      } else if (this.arrResp === undefined) {
        console.log('a');
        this.createErrorMessage();
        this.clearForm();
      } else {
        console.log('b');
        this.createErrorMessage();
        this.clearForm();
      }
      // получаем все сердечки из выведенных фильмов и навешиваем на каждое обработчик
      const hearts = document.querySelectorAll('.fa-heart');
      // for (const item of hearts) {
      hearts.forEach((item) => {
        const itemClon = item;
        itemClon.onclick = this.chooseHeart;
      });
      this.clearError();
      this.clearForm();
    },
    getFavMovies() {
      this.clearError();
      const arr = [];
      let arrOfHeart = [];
      //  перебираем Local Storage и складываем id фильмов в массив
      for (let i = 0; i < localStorage.length; i += 1) {
        const key = localStorage.key(i);
        const value = localStorage.getItem(key);
        arr.push(value);
      }

      if (this.newEl === undefined && arr !== '') {
        this.newEl = document.createElement('div');
        this.newEl.classList.add('block-movie');
        // поочерёдно делаем запрос на сервер используя каждый ID фильма в адесной строке
        // for (let item of arr) {
        arr.forEach((item) => {
          const urlReq = `${this.url}i=${item}`;
          fetch(urlReq)
            .then((response) => response.json())
            .then((data) => this.createFavMovieBlock(data, this.newEl))
            .then(() => {
              //  получаем все сердечки избранных фильмов и навешиваем на каждое обработчик
              const heart = document.querySelectorAll('.fa-heart');
              arrOfHeart = [...heart];
              // for (let item of arrOfHeart) {
              arrOfHeart.arr.forEach((ite) => {
                const iteClon = ite;
                iteClon.onclick = this.chooseHeart();
              });
            })
            .catch((err) => {
              console.log(err);
            });
        });
        // main.append(newEl);
      } else if (this.newEl !== undefined && arr !== '') {
        this.newEl.remove();
        this.newEl = document.createElement('div');
        this.newEl.classList.add('block-movie');

        // for (let item of arr) {
        arr.forEach((item) => {
          const urlReq = `${this.url}i=${item}`;
          fetch(urlReq)
            .then((response) => response.json())
            .then((data) => this.createFavMovieBlock(data, this.newEl))
            .then(() => {
              //  получаем все сердечки избранных фильмов и навешиваем на каждое обработчик
              const heart = document.querySelectorAll('.fa-heart');
              arrOfHeart = [...heart];
              // for (let item of arrOfHeart) {
              arrOfHeart.forEach((ite) => {
                const iteClon = ite;
                iteClon.onclick = this.chooseHeart();
              });
            })
            .catch((err) => {
              console.log(err);
            });
        });
        // main.append(newEl);
      }
    },
    createFavMovieBlock(arr, parent) {
      const movieItem = document.createElement('div');
      movieItem.classList.add('movie-item');
      movieItem.innerHTML += `
          <img src="${arr.Poster}">
          <div class="block-info">
              <a class="fas fa-heart" style="color:${this.findFavorites(arr)}"></a>
              // <font-awesome-icon :icon="myIcon" />
              <span>${arr.imdbID}</span>
              <p>${arr.Title}</p>
          </div>`;
      parent.append(movieItem);
    },
    //  Управляет сердечком и соответственно добавляет в local storage id фильма или удаляет
    chooseHeart() {
      const idSpan = this.nextElementSibling;
      const keyTag = idSpan.nextElementSibling;
      const key = keyTag.innerHTML;
      const id = idSpan.innerHTML;
      if (this.style.color !== 'red') {
        this.style.color = 'red';
        localStorage.setItem(key, id);
      } else if (this.style.color === 'red') {
        this.style.color = 'white';
        localStorage.removeItem(key);
      }
    },
    //  Сравнивает id фильма из поиска с содержимым local storage и соответственно
    //  окрашивает сердце в красный, если фильм уже был лайкнут раньше
    findFavorites(item) {
      for (let i = 0; i < localStorage.length; i += 1) {
        const key = localStorage.key(i);
        const value = localStorage.getItem(key);
        if (item.imdbID === value) {
          let itemClone = item.style.color;
          itemClone = 'red';
          return itemClone;
        }
      }
      let itemClone = item.style.color;
      itemClone = '#fff';
      return itemClone;
    },
    //  Формирует сообщение об ошибке поиска и выводит на страницу
    createErrorMessage() {
      this.clearForm();
      if (this.errMessage === undefined) {
        console.log('c');
        // this.errMessage = document.createElement('p');
        // this.errMessage.classList.add('error-message');
        // this.errMessage.innerHTML = 'Такой фильм не найдено';
        // header.append(errMessage);
        this.active = true;
      } else if (this.errMessage !== undefined) {
        console.log('d');
        // this.errMessage.remove();
        this.active = true;
        // this.errMessage = document.createElement('p');
        // this.errMessage.classList.add('error-message');
        // this.errMessage.innerHTML = 'Такой фильм не найдено';
        // header.append(errMessage);
      }
    },
    //  Очищает инпут от текста
    clearForm() {
      this.message = '';
      this.selected = '';
    },
    clearError() {
      if (this.errMessage !== undefined) {
        this.active = false;
      }
    },
  },
};
</script>

<style lang="scss">
.searchMovies {
  height: 100%;
  width: 100%;
  position: relative;
  padding: 2rem;
  background: greenyellow;
  margin-bottom: 1.5rem;
  &__title {
    text-align: center;
    margin-bottom: 1.3rem;
    color: #fff;
    font-size: 2em;
  }

  &__form {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    &__select {
      width: 9rem;
      padding: 0.2rem;
      border-radius: 5px;
      height: 2rem;
      outline: none;
      border: none;
      margin-bottom: 1.3rem;
    }

    &__input {
      padding: 0.2rem;
      border-radius: 5px;
      height: 2rem;
      outline: none;
      border: none;
      margin-bottom: 1.3rem;
    }
  }
}
.favorite-btn {
    position: absolute;
    top: 40px;
    left: 40px;
  }

  .btn {
  padding: 10px 30px;
  border-radius: 5px;
  outline: none;
  border: none;
  background-color: rgb(143, 100, 184);
  color: #fff;
  transition: transform 0.2s;
  &:active {
    transform: scale(0.9);
  }
}

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
