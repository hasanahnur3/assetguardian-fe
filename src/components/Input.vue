<template>
  <div class="row justify-content-center">
    <p class="mr-4">Select a Category:</p>
    <select
      class="form-select mr-4"
      aria-label="Select Category"
      v-model="selectedCategory"
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
            data-target="#editModal"
          >
            Edit
          </button>
          <!-- Modal -->
          <div
            class="modal fade"
            id="editModal"
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
                        v-model="item.name"
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
                        v-model="item.date"
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
                        v-model="item.amount"
                        name="amount"
                      />
                    </div>

                    <button
                      @click="
                        editEntry(
                          item.id,
                          item.date,
                          item.amount,
                          item.type,
                          item.user_id
                        )
                      "
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
        </td>
        <td>
          <button
            type="button"
            class="btn btn-primary"
            @click="deleteEntry(item.id)"
          >
            Delete
          </button>
        </td>
      </tr>
    </tbody>
  </DataTable>
</template>

<script>
import axios from "axios";
import DataTable from "datatables.net-vue3";

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
    };
  },
  methods: {
    async retrieveCategoryEntries() {
      await axios
        .get(
          "https://ac780f41-cb23-4f7e-b82d-20715791d805.mock.pstmn.io/api/category"
        )
        .then((response) => {
          this.items = response.data.category;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    saveNewEntry() {
      console.log("calledd");
    },
    editEntry(id, date, amount, type, user_id) {
      console.log(id);
      console.log(date);
      console.log(amount);
      console.log(type);
      console.log(user_id);
      alert("Success Edit");
    },
    deleteEntry(id) {
      console.log(id);
      alert("Success Delete");
    },
  },
  async mounted() {
    console.log("aaaa");
    await this.retrieveCategoryEntries();
    console.log("bbb");
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