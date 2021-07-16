<template>
  <header class="flex flex-wrap justify-center">
    <div class="w-40 h-8 relative my-7">
      <div
        class="
          bg-memoYellow-500
          shadow-memo
          h-7
          w-7
          rounded-br-xl
          absolute
          -left-2
          -top-0.5
        "
      ></div>
      <div class="text-green-700 z-10 relative text-xl tracking-wider">
        Memo Todo list
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: "Memo Todo list",
  props: {
    msg: String,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/* h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
} */
</style>
