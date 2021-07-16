<template>
  <div
    class="
      flex flex-col
      content-center
      h-screen
      bg-gradient-to-br
      from-memoYellow-bg-light
      via-memoYellow-bg
      to-memoYellow-bg
      ...
    "
  >
    <!-- <img alt="Vue logo" src="./assets/logo.png" /> -->
    <Header msg="Welcome to Your Vue.js App" />
    <Memo />
  </div>
</template>

<script>
import Header from "./components/Header.vue";
import Memo from "./components/Memo.vue";

export default {
  name: "App",
  components: {
    Header,
    Memo,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
