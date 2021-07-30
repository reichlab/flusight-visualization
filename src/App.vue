<template lang="pug">
img(alt="Vue logo" src="./assets/logo.png")
Chart
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import HelloWorld from "./components/HelloWorld.vue";
import Chart from "./components/Chart.vue";

import * as d3 from "d3";

@Options({
  components: {
    HelloWorld,
    Chart,
  },
  mounted() {
    console.log("App mounted");
  },
})
export default class App extends Vue {}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
