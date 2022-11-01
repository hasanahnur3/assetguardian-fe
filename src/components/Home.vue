<template>
  <div class="row justify-content-center align-items-center">
    <div class="col-md-8 col-sm-12">
      <div class="row">
        <div class="col-md-2 col-sm-10"></div>
        <div class="col-md-3 col-sm-10 chart-box">
          <h3>Savings</h3>
          <h5>Total: {{ savingsTotal }}</h5>
          <br />
          <Pie :chart-data="savingsData" />
        </div>
        <div class="col-md-3 col-sm-10 chart-box">
          <h3>Expenses</h3>
          <h5>Total: {{ expensesTotal }}</h5>
          <br />
          <Pie :chart-data="expensesData" />
        </div>
      </div>
      <div class="row">
        <div class="col-md-3 col-sm-10 chart-box">
          <h3>Debts</h3>
          <h5>Total: {{ debtTotal }}</h5>
          <br />
          <Pie :chart-data="debtData" />
        </div>
        <div class="col-md-3 col-sm-10 chart-box">
          <h3>Assets</h3>
          <h5>Total: {{ assetsTotal }}</h5>
          <br />
          <Pie :chart-data="assetsData" />
        </div>
        <div class="col-md-3 col-sm-10 chart-box">
          <h3>Income</h3>
          <h5>Total: {{ incomeTotal }}</h5>
          <br />
          <Pie :chart-data="incomeData" />
        </div>
      </div>
    </div>
    <div class="col-md-2 col-sm-12 chart-box">
      <h3>Investment</h3>
      <br />
      <br />

      <div class="investment-box">
        <p class="mr-4 text-left">
          Open Positon <br />
          Initial Amount
        </p>
        <h5>
          <b class="text-right">{{ investmentData.open_positions.total_initial_amount }}</b>
        </h5>
      </div>
      <hr />

      <div class="investment-box">
        <p class="mr-4 text-left">
          Open Positon <br />
          Current Amount
        </p>
        <h5>
          <b class="text-right">{{ investmentData.open_positions.total_current_amount }}</b>
        </h5>
      </div>
      <hr />

      <div class="investment-box">
        <p class="mr-4 text-left">
          Open Positon <br />
          Profit
        </p>
        <h5>
          <b class="text-right">{{ investmentData.open_positions.total_profit }}</b>
        </h5>
      </div>
      <hr />

      <div class="investment-box">
        <p class="mr-4 text-left">
          Close Positon <br />
          Initial Amount
        </p>
        <h5>
          <b class="text-right">{{ investmentData.close_positions.total_initial_amount }}</b>
        </h5>
      </div>
      <hr />

      <div class="investment-box">
        <p class="mr-4 text-left">
          Close Positon <br />
          Current Amount
        </p>
        <h5>
          <b class="text-right">{{ investmentData.close_positions.total_current_amount }}</b>
        </h5>
      </div>
      <hr />
      <div class="investment-box">
        <p class="mr-4 text-left">
          Close Positon <br />
          Profit
        </p>
        <h5>
          <b class="text-right">{{ investmentData.close_positions.total_profit }}</b>
        </h5>
      </div>
      <hr />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { Pie } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
} from "chart.js";

ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale);

export default {
  name: "home-page",
  components: { Pie },
  data() {
    return {
      categories: [],
      savingsTotal: 0,
      expensesTotal: 0,
      debtTotal: 0,
      assetsTotal: 0,
      incomeTotal: 0,
      investmentData: {
        open_positions: {
          total_initial_amount: 0,
          total_current_amount: 0,
          total_profit: 0,
        },
        close_positions: {
          total_initial_amount: 0,
          total_current_amount: 0,
          total_profit: 0,
        },
      },
      savingsData: {
        labels: [],
        datasets: [
          {
            backgroundColor: ["#41B883", "#E46651", "#00D8FF", "#DD1B16"],
            data: [],
          },
        ],
      },
      expensesData: {
        labels: [],
        datasets: [
          {
            backgroundColor: ["#41B883", "#E46651", "#00D8FF", "#DD1B16"],
            data: [],
          },
        ],
      },
      debtData: {
        labels: [],
        datasets: [
          {
            backgroundColor: ["#41B883", "#E46651", "#00D8FF", "#DD1B16"],
            data: [],
          },
        ],
      },
      assetsData: {
        labels: [],
        datasets: [
          {
            backgroundColor: ["#41B883", "#E46651", "#00D8FF", "#DD1B16"],
            data: [],
          },
        ],
      },
      incomeData: {
        labels: [],
        datasets: [
          {
            backgroundColor: ["#41B883", "#E46651", "#00D8FF", "#DD1B16"],
            data: [],
          },
        ],
      },
    };
  },
  methods: {
    async retrieveInvestmentStats() {
      await axios
        .get("https://be-asset-guardian.onrender.com/api/position/stats/", {
          headers: {
            Accept: "application/json",
            "User-Id": this.$store.state.userId,
          },
        })
        .then((response) => {
          console.log(response);
          this.investmentData = response.data.stats;
        });
    },
    async retrieveCategoriesStats() {
      await axios
        .get("https://be-asset-guardian.onrender.com/api/category/stats/", {
          headers: {
            Accept: "application/json",
            "User-Id": this.$store.state.userId,
          },
        })
        .then((response) => {
          this.categories = response;

          // Savings
          let savingsLabel = [];
          let savingsData = [];
          this.savingsTotal = this.categories.data.stats.savings.total;
          this.categories.data.stats.savings.items.forEach((item) => {
            console.log(item.name);
            console.log(item.total);
            savingsLabel.push(item.name);
            savingsData.push(item.total);
          });

          this.savingsData.labels = savingsLabel;
          this.savingsData.datasets[0].data = savingsData;

          // Expenses
          let expensesLabel = [];
          let expensesData = [];
          this.expensesTotal = this.categories.data.stats.expenses.total;
          this.categories.data.stats.expenses.items.forEach((item) => {
            console.log(item.name);
            console.log(item.total);
            expensesLabel.push(item.name);
            expensesData.push(item.total);
          });

          this.expensesData.labels = expensesLabel;
          this.expensesData.datasets[0].data = expensesData;

          //Debts
          let debtLabel = [];
          let debtData = [];
          this.debtTotal = this.categories.data.stats.debt.total;
          this.categories.data.stats.debt.items.forEach((item) => {
            debtLabel.push(item.name);
            debtData.push(item.total);
          });

          this.debtData.labels = debtLabel;
          this.debtData.datasets[0].data = debtData;

          //Assets
          let assetsLabel = [];
          let assetsData = [];
          this.assetsTotal = this.categories.data.stats.assets.total;
          this.categories.data.stats.assets.items.forEach((item) => {
            assetsLabel.push(item.name);
            assetsData.push(item.total);
          });

          this.assetsData.labels = assetsLabel;
          this.assetsData.datasets[0].data = assetsData;

          //Income
          let incomeLabel = [];
          let incomeData = [];
          this.incomeTotal = this.categories.data.stats.income.total;
          this.categories.data.stats.income.items.forEach((item) => {
            incomeLabel.push(item.name);
            incomeData.push(item.total);
          });

          this.incomeData.labels = incomeLabel;
          this.incomeData.datasets[0].data = incomeData;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  async mounted() {
    if(this.$store.state.userId == 0){
      this.$router.push("/login");
    }
    await this.retrieveCategoriesStats();
    await this.retrieveInvestmentStats();
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

.investment-box {
  display: flex;
}
</style>
