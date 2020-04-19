<template>
  <div id="app">
    <LocaleSwitcher />
    <router-view></router-view>
  </div>
</template>

<script>

import store from './store'
import router from './router'
import {CHECK_AUTH} from './store/actions/auth'
import LocaleSwitcher from './components/LocaleSwitcher.vue'

export default {
  name: 'App',

  components: {
    LocaleSwitcher 
  },

  methods: {
    checkAuthUser() {
      let user_id = localStorage.getItem('id') || "";
      let token = localStorage.getItem('token') || "";

      if(user_id && token) {
          let data = {
              "token": token,
              "params": JSON.stringify({"id": user_id})
          };

          store.dispatch(CHECK_AUTH, data).catch(() => {
              router.push({name: "startpage"});
          });
      } 
    }
  },

  created() {
    this.checkAuthUser();
  }
}
</script>

<style>

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin-top: 100px;
}
</style>
