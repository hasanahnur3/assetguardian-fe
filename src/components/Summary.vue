<template>
  <div class="chart-box m-4 p-4">
    <h3>Summary</h3>
    <br />
    <select class="form-select" aria-label="Select Year" v-model="selectedYear">
      <option v-for="year in years" :value="year" :key="year">
        {{ year }}
      </option>
    </select>
    <br />
    <br />
    <Line :chart-data="lineChartData" />
  </div>
</template>

<script>
import axios from "axios";
import { Line } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  CategoryScale,
} from "chart.js";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  CategoryScale
);

export default {
  name: "summary-page",
  components: { Line },
  data() {
    return {
      years: ["2022", "2021"],
      selectedYear: "2022",
      summary: {},
      lineChartData: {
        labels: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sept",
          "Oct",
          "Nov",
          "Dec",
        ],
        datasets: [],
      },
    };
  },
  methods: {
    async retrieveCategoriesSummary() {
      await axios
        .get(
          "https://ac780f41-cb23-4f7e-b82d-20715791d805.mock.pstmn.io/api/category/summary"
        )
        .then((response) => {
          this.summary = response.data.summary;

          //Savings
          var savings = {
            label: "Savings",
            data: [
              this.summary.savings.january == undefined
                ? 0
                : this.summary.savings.january,
              this.summary.savings.february == undefined
                ? 0
                : this.summary.savings.february,
              this.summary.savings.march == undefined
                ? 0
                : this.summary.savings.march,
              this.summary.savings.april == undefined
                ? 0
                : this.summary.savings.april,
              this.summary.savings.may == undefined
                ? 0
                : this.summary.savings.may,
              this.summary.savings.june == undefined
                ? 0
                : this.summary.savings.june,
              this.summary.savings.july == undefined
                ? 0
                : this.summary.savings.july,
              this.summary.savings.august == undefined
                ? 0
                : this.summary.savings.august,
              this.summary.savings.september == undefined
                ? 0
                : this.summary.savings.september,
              this.summary.savings.october == undefined
                ? 0
                : this.summary.savings.october,
              this.summary.savings.november == undefined
                ? 0
                : this.summary.savings.november,
              this.summary.savings.desember == undefined
                ? 0
                : this.summary.savings.december,
            ],
            lineTension: 0,
            fill: false,
            borderColor: "blue",
          };
          this.lineChartData.datasets.push(savings);
          //Expenses
          var expenses = {
            label: "Expenses",
            data: [
              this.summary.expenses.january == undefined
                ? 0
                : this.summary.expenses.january,
              this.summary.expenses.february == undefined
                ? 0
                : this.summary.expenses.february,
              this.summary.expenses.march == undefined
                ? 0
                : this.summary.expenses.march,
              this.summary.expenses.april == undefined
                ? 0
                : this.summary.expenses.april,
              this.summary.expenses.may == undefined
                ? 0
                : this.summary.expenses.may,
              this.summary.expenses.june == undefined
                ? 0
                : this.summary.expenses.june,
              this.summary.expenses.july == undefined
                ? 0
                : this.summary.expenses.july,
              this.summary.expenses.august == undefined
                ? 0
                : this.summary.expenses.august,
              this.summary.expenses.september == undefined
                ? 0
                : this.summary.expenses.september,
              this.summary.expenses.october == undefined
                ? 0
                : this.summary.expenses.october,
              this.summary.expenses.november == undefined
                ? 0
                : this.summary.expenses.november,
              this.summary.expenses.desember == undefined
                ? 0
                : this.summary.expenses.december,
            ],
            lineTension: 0,
            fill: false,
            borderColor: "red",
          };
          this.lineChartData.datasets.push(expenses);
          //Debt
          var debt = {
            label: "Debt",
            data: [
              this.summary.debt.january == undefined
                ? 0
                : this.summary.debt.january,
              this.summary.debt.february == undefined
                ? 0
                : this.summary.debt.february,
              this.summary.debt.march == undefined
                ? 0
                : this.summary.debt.march,
              this.summary.debt.april == undefined
                ? 0
                : this.summary.debt.april,
              this.summary.debt.may == undefined ? 0 : this.summary.debt.may,
              this.summary.debt.june == undefined ? 0 : this.summary.debt.june,
              this.summary.debt.july == undefined ? 0 : this.summary.debt.july,
              this.summary.debt.august == undefined
                ? 0
                : this.summary.debt.august,
              this.summary.debt.september == undefined
                ? 0
                : this.summary.debt.september,
              this.summary.debt.october == undefined
                ? 0
                : this.summary.debt.october,
              this.summary.debt.november == undefined
                ? 0
                : this.summary.debt.november,
              this.summary.debt.desember == undefined
                ? 0
                : this.summary.debt.december,
            ],
            lineTension: 0,
            fill: false,
            borderColor: "brown",
          };
          this.lineChartData.datasets.push(debt);
          //Assets
          var assets = {
            label: "Assets",
            data: [
              this.summary.assets.january == undefined
                ? 0
                : this.summary.assets.january,
              this.summary.assets.february == undefined
                ? 0
                : this.summary.assets.february,
              this.summary.assets.march == undefined
                ? 0
                : this.summary.assets.march,
              this.summary.assets.april == undefined
                ? 0
                : this.summary.assets.april,
              this.summary.assets.may == undefined
                ? 0
                : this.summary.assets.may,
              this.summary.assets.june == undefined
                ? 0
                : this.summary.assets.june,
              this.summary.assets.july == undefined
                ? 0
                : this.summary.assets.july,
              this.summary.assets.august == undefined
                ? 0
                : this.summary.assets.august,
              this.summary.assets.september == undefined
                ? 0
                : this.summary.assets.september,
              this.summary.assets.october == undefined
                ? 0
                : this.summary.assets.october,
              this.summary.assets.november == undefined
                ? 0
                : this.summary.assets.november,
              this.summary.assets.desember == undefined
                ? 0
                : this.summary.assets.december,
            ],
            lineTension: 0,
            fill: false,
            borderColor: "pink",
          };
          this.lineChartData.datasets.push(assets);
          //Income
          var income = {
            label: "Income",
            data: [
              this.summary.income.january == undefined
                ? 0
                : this.summary.income.january,
              this.summary.income.february == undefined
                ? 0
                : this.summary.income.february,
              this.summary.income.march == undefined
                ? 0
                : this.summary.income.march,
              this.summary.income.april == undefined
                ? 0
                : this.summary.income.april,
              this.summary.income.may == undefined
                ? 0
                : this.summary.income.may,
              this.summary.income.june == undefined
                ? 0
                : this.summary.income.june,
              this.summary.income.july == undefined
                ? 0
                : this.summary.income.july,
              this.summary.income.august == undefined
                ? 0
                : this.summary.income.august,
              this.summary.income.september == undefined
                ? 0
                : this.summary.income.september,
              this.summary.income.october == undefined
                ? 0
                : this.summary.income.october,
              this.summary.income.november == undefined
                ? 0
                : this.summary.income.november,
              this.summary.income.desember == undefined
                ? 0
                : this.summary.income.december,
            ],
            lineTension: 0,
            fill: false,
            borderColor: "green",
          };
          this.lineChartData.datasets.push(income);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  async mounted() {
    console.log("aaaa");
    await this.retrieveCategoriesSummary();
    console.log(this.lineChartData);
  },
};
</script>

<style>
.chart-box {
  background-color: white;
  border: 2px solid #d0d8e0;
  border-radius: 20px;
  padding: 2%;
  margin-right: 1%;
  margin-bottom: 1%;
}
</style>