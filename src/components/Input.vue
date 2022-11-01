<template>
  <div class="row justify-content-center">
    <p class="mr-4">Select a Category:</p>
    <select
      class="form-select mr-4"
      aria-label="Select Category"
      v-model="selectedCategory"
      @change="changeCategory"
    >
      <option v-for="category in categories" :value="category" :key="category">
        {{ category }}
      </option>
    </select>
    <button
      type="button"
      class="btn btn-primary"
      data-toggle="modal"
      data-target="#createModal"
    >
      Create a New Entry
    </button>

    <!-- Modal -->
    <div
      class="modal fade"
      id="createModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">
              Create a New Entry
            </h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="submit-form">
              <div class="form-group">
                <label for="name">Name</label>
                <input
                  type="text"
                  class="form-control"
                  id="name"
                  required
                  v-model="newEntry.name"
                  name="name"
                />
              </div>

              <div class="form-group">
                <label for="date">Date</label>
                <input
                  type="date"
                  class="form-control"
                  id="date"
                  required
                  v-model="newEntry.date"
                  name="date"
                />
              </div>

              <div class="form-group">
                <label for="amount">Amount</label>
                <input
                  type="number"
                  class="form-control"
                  id="amount"
                  required
                  v-model="newEntry.amount"
                  name="amount"
                />
              </div>

              <button
                @click="saveNewEntry()"
                class="btn btn-success"
                data-dismiss="modal"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <br />
  <br />
  <DataTable class="display" id="my-table" :key="isReady">
    <thead>
      <tr>
        <th>Name</th>
        <th>Date</th>
        <th>Amount</th>
        <th>Edit</th>
        <th>Delete</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in items" :value="item" :key="item.id">
        <td>{{ item.name }}</td>
        <td>{{ item.date }}</td>
        <td>{{ item.amount }}</td>
        <td>
          <button
            class="btn btn-primary"
            data-toggle="modal"
            @click="changeSelectedEntry(item)"
          >
            Edit
          </button>
        </td>
        <td>
          <button
            type="button"
            class="btn btn-primary"
            @click="deleteEntry(item)"
          >
            Delete
          </button>
        </td>
      </tr>
    </tbody>
  </DataTable>
  <!-- Modal -->
  <div
    class="modal fade"
    id="editModal"
    tabindex="-1"
    role="dialog"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
    :key="isReady"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Edit an Entry</h5>
          <button
            type="button"
            class="close"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div class="submit-form">
            <div class="form-group">
              <label for="name">Name</label>
              <input
                type="text"
                class="form-control"
                id="name"
                required
                v-model="selectedEntry.name"
                name="name"
              />
            </div>

            <div class="form-group">
              <label for="date">Date</label>
              <input
                type="date"
                class="form-control"
                id="date"
                required
                v-model="selectedEntry.date"
                name="date"
              />
            </div>

            <div class="form-group">
              <label for="amount">Amount</label>
              <input
                type="number"
                class="form-control"
                id="amount"
                required
                v-model="selectedEntry.amount"
                name="amount"
              />
            </div>

            <button
              @click="editEntry(this.selectedEntry)"
              class="btn btn-success"
              data-dismiss="modal"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import DataTable from "datatables.net-vue3";
import $ from "jquery";

export default {
  name: "input-page",
  components: { DataTable },
  data() {
    return {
      categories: ["savings", "expenses", "debt", "assets", "income"],
      selectedCategory: "savings",
      items: [],
      ready: false,
      newEntry: {
        "name:": "",
        date: "",
        amount: 0,
      },
      selectedEntry: {},
    };
  },
  methods: {
    changeSelectedEntry(item) {
      this.selectedEntry = item;
      $("#editModal").modal();
    },
    async retrieveCategoryEntries() {
      await axios
        .get(
          "https://be-asset-guardian.onrender.com/api/category/" +
            this.selectedCategory,
          {
            headers: {
              Accept: "application/json",
              "User-Id": this.$store.state.userId,
            },
          }
        )
        .then((response) => {
          this.items = response.data.category;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async saveNewEntry() {
      this.ready = false;
      if (this.selectedCategory == "savings") this.newEntry.type = 1;
      else if (this.selectedCategory == "expenses") this.newEntry.type = 2;
      else if (this.selectedCategory == "debts") this.newEntry.type = 3;
      else if (this.selectedCategory == "assets") this.newEntry.type = 4;
      else if (this.selectedCategory == "income") this.newEntry.type = 5;

      try {
        await axios
          .post(
            "https://be-asset-guardian.onrender.com/api/category/",
            this.newEntry,
            {
              headers: {
                Accept: "application/json",
                "User-Id": this.$store.state.userId,
              },
            }
          )
          .then((response) => {
            console.log(response.data.category);
            alert(this.selectedCategory + " new entry created successfully!");
            this.items.push(response.data.category);
          });
      } catch (err) {
        alert("Error!");
      }
      this.$nextTick().then(() => (this.ready = true));
    },
    async editEntry(item) {
      this.ready = false;
      try {
        await axios
          .put(
            "https://be-asset-guardian.onrender.com/api/category/" + item.id,
            item,
            {
              headers: {
                Accept: "application/json",
                "User-Id": this.$store.state.userId,
              },
            }
          )
          .then((response) => {
            console.log(response.data.category);
            alert(this.selectedCategory + " entry edited successfully!");
          });
      } catch (err) {
        alert("Error!");
      }
      this.$nextTick().then(() => (this.ready = true));
    },
    async deleteEntry(item) {
      this.ready = false;
      try {
        await axios
          .delete(
            "https://be-asset-guardian.onrender.com/api/category/" + item.id,
            {
              headers: {
                Accept: "application/json",
                "User-Id": this.$store.state.userId,
              },
            }
          )
          .then((response) => {
            console.log(response.data.category);
            alert(this.selectedCategory + " entry deleted successfully!");
            const idx = this.items.indexOf(item);
            if (idx > -1) {
              this.items.splice(idx, 1);
            }
          });
      } catch (err) {
        alert("Error!");
      }
      this.$nextTick().then(() => (this.ready = true));
    },
    async changeCategory() {
      this.ready = false;
      await this.retrieveCategoryEntries();
      this.$nextTick().then(() => (this.ready = true));
    },
  },
  async mounted() {
    if (this.$store.state.userId == 0) {
      this.$router.push("/login");
    }
    await this.retrieveCategoryEntries();
    console.log(this.items);

    this.$nextTick().then(() => (this.ready = true));
  },
  computed: {
    isReady() {
      return this.ready;
    },
  },
};
</script>

<style>
@import "datatables.net-dt";
</style>