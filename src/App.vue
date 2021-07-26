<template lang="pug">
img(alt="Vue logo" src="./assets/logo.png")
HelloWorld(msg="Customized message")
Chart
p abc1
p abc2
p abc3
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
    console.log("App loaded");
    d3.selectAll("p")
      .data([4, 8, 15, 16, 23, 42])
      .enter()
      .append("p")
      .text(function (d) {
        return "I’m number " + d + "!";
      });
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
