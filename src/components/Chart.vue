<template lang="pug">
div(class="chart")
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { mapActions } from "vuex";
import { useStore } from "../store";
import * as d3 from "d3";

@Options({
  name: "Chart",
  props: ["tweetData"],
  methods: {
    ...mapActions(["fetchValues"]),
  },
  data() {
    const store = useStore();
    let valuesMin = d3.min(store.state.values);
    let valuesMedian = d3.median(store.state.values);
    let valuesMax = d3.max(store.state.values);
    return {
      msg: "👋 from the Chart Component",
      height: 600,
      width: 600,
      values: store.state.values,
      min: valuesMin,
      median: valuesMedian,
      max: valuesMax,
    };
  },
  mounted() {
    const store = useStore();
    this.fetchValues();
    this.values = store.state.values;
    this.min = d3.min(store.state.values);
    this.median = d3.median(store.state.values);
    this.max = d3.max(store.state.values);

    const test = d3.select(".chart");

    // add root svg component
    test.append("svg").attr("viewBox", `0 0 ${this.width} ${this.height}`);

    // define bin generator
    const binGen = d3.bin().thresholds(40);

    // generate bins from data
    const bins = binGen(store.state.values);
    console.log(bins);

    // define x scale
    const xMin = bins[0].x0;
    const xMax = bins[bins.length - 1].x1;
    var xScale = null;
    if (xMin && xMax) {
      xScale = d3.scaleLinear().domain([xMin, xMax]);
    } else {
      console.error("Could not construct axis; check binned data");
    }

    console.log(test);
    console.log("Component mounted");
  },
})
export default class Chart extends Vue {
  msg!: string;
  height!: number;
  width!: number;
  values!: Array<number>;
  min!: number;
  median!: number;
  max!: number;
}
</script>

<style lang="scss">

</style>