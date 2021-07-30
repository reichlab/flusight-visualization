<template lang="pug">
div(class="chart")
  p Chart should be here
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { mapActions } from "vuex";
import { useStore } from "../store";
import * as d3 from "d3";

@Options({
  name: "Chart",
  methods: {
    ...mapActions(["fetchValues"]),
  },
  data() {
    const store = useStore();
    return {
      msg: "👋 from the Chart Component",
      height: 200,
      width: 400,
      values: store.state.values,
    };
  },
  mounted() {
    const store = useStore();
    this.fetchValues();
    this.values = store.state.values;

    const test = d3.select(".chart");
    const color = "steelblue";
    const margin = { top: 20, right: 20, bottom: 30, left: 40 };

    // define bin generator
    const binGen = d3.bin().thresholds(40);

    // generate bins from data
    const bins = binGen(store.state.values);
    console.log(bins);

    // define x scale
    const xMin = bins[0].x0;
    const xMax = bins[bins.length - 1].x1;
    if (xMin && xMax) {
      var xScale = d3
        .scaleLinear()
        .domain([xMin, xMax])
        .range([margin.left, this.width - margin.right]);
    } else {
      console.error("Could not construct axis; check binned data");
    }

    // define y scale
    const yMax = d3.max(bins, (d) => d.length);
    if (yMax) {
      var yScale = d3
        .scaleLinear()
        .domain([0, yMax])
        .nice()
        .range([this.height - margin.bottom, margin.top]);
    }

    // define x axis generator
    const xAxisGen = (
      g: d3.Selection<SVGGElement, unknown, HTMLElement, unknown>
    ) =>
      g
        .attr("transform", `translate(0, ${this.height - margin.bottom})`)
        .call(
          d3
            .axisBottom(xScale)
            .ticks(this.width / 80)
            .tickSizeOuter(0)
        )
        .call((g) =>
          g
            .append("text")
            .attr("x", this.width - margin.right)
            .attr("y", "-4")
            .attr("fill", "currentColor")
            .attr("font-weight", "bold")
            .attr("text-anchor", "end")
            .text("x axis")
        );

    // define y axis generator
    const yAxisGen = (
      g: d3.Selection<SVGGElement, unknown, HTMLElement, unknown>
    ) =>
      g
        .attr("transform", `translate(${margin.left}, 0)`)
        .call(d3.axisLeft(yScale).ticks(this.height / 40))
        .call((g) => g.select(".domain").remove())
        .call((g) =>
          g
            .select(".tick:last-of-type text")
            .clone()
            .attr("x", 4)
            .attr("text-anchor", "start")
            .attr("font-weight", "bold")
            .text("y axis")
        );

    // make chart
    // add root svg component
    const svg = test
      .append("svg")
      .attr("viewBox", `0 0 ${this.width} ${this.height}`);

    svg
      .append("g")
      .attr("fill", color)
      .selectAll("rect")
      .data(bins)
      .join("rect")
      .attr("x", (d) => {
        if (d.x0 !== undefined) {
          return xScale(d.x0) + 1;
        } else {
          throw "Error: Bin data incorrect; missing start-of-bin value";
        }
      })
      .attr("width", (d) => {
        if (d.x0 !== undefined && d.x1 !== undefined) {
          return Math.max(0, xScale(d.x1) - xScale(d.x0) - 1);
        } else {
          throw "Error: Bin data incorrect; missing bin range";
        }
      })
      .attr("y", (d) => yScale(d.length))
      .attr("height", (d) => yScale(0) - yScale(d.length));

    svg.append("g").call(xAxisGen);
    svg.append("g").call(yAxisGen);
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