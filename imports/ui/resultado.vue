<template>
  <div class="d-flex justify-center">
    <logo></logo>
  </div>
  <v-col>
    <v-card>
      <v-card-title class="text-h6 text-md-h5 text-lg-h4 text-blue"
        >Resultado</v-card-title
      >
      <v-divider class="border-opacity-100" color="info"></v-divider>
      <v-col>
        <BarChart :chartData="dataChart" :options="options"></BarChart>
      </v-col>
    </v-card>
  </v-col>
</template>

<script setup>
import Logo from "./logo.vue";
import { BarChart } from "vue-chart-3";
import { subscribe, autorun } from "vue-meteor-tracker";
import { votacaoTotal } from "../api/votacaoTotal";
import { ref, watch } from "vue";
import { Chart, registerables } from "chart.js";
subscribe("votacao");
const payload = autorun(() => votacaoTotal.find({}).fetch()).result;
const dataChart = ref(null);
const result = ref(null);
const labels = ref(null);
const data = ref(null);

const options = ref({
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
  },
});

Chart.register(...registerables);
const gerarDados = (res) => {
  console.log(res);
  labels.value = null;
  data.value = null;
  data.value = [res[0].total, res[1].total, res[2].total, res[3].total];

  labels.value = [res[0].name, res[1].name, res[2].name, res[3].name];

  dataChart.value = {
    labels: labels.value,
    datasets: [
      {
        label: "",
        data: data.value,
        backgroundColor: ["#0079AF", "#123E6B", "#97B0C4", "#A5C8ED"],
      },
    ],
  };
};

watch(payload, async (a, b) => {
  if (a.length) {
    gerarDados(payload.value);
  }
});
// console.log(payload.value);
</script>
