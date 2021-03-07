<template>
  <StayBookForm />
</template>

<script>
import StayBookForm from "./components/StayBookForm.vue";

export default {
  name: "App",
  components: {
    StayBookForm,
  },
};
</script>

<style lang="scss">
body {
  background: var(--bg);
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  min-height: 100vh;
}
</style>
