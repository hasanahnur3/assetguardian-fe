<template>
  <div class="row justify-content-center">
    <p class="mr-4">Select a Category:</p>
    <select
      class="form-select mr-4"
      aria-label="Select Category"
      v-model="selectedCategory"
      @change="changeSelectedCategory(selectedCategory)"
    >
      <option
        v-for="category in investmentCategories"
        :value="category"
        :key="category"
      >
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
          <!-- Open Position Form -->
          <div class="modal-body">
            <div class="submit-form">
              <div class="form-group">
                <label for="open-name">Name</label>
                <input
                  type="text"
                  class="form-control"
                  id="open-name"
                  required
                  v-model="newOpenPositionEntry.name"
                />
              </div>

              <div class="form-group">
                <label for="open-date-purchase">Date Purchase</label>
                <input
                  type="date"
                  class="form-control"
                  id="dopen-ate-purchase"
                  required
                  v-model="newOpenPositionEntry.date_purchased"
                />
              </div>

              <div class="form-group">
                <label for="open-purchase-price">Purchase Price</label>
                <input
                  type="number"
                  class="form-control"
                  id="open-purchase-price"
                  required
                  v-model="newOpenPositionEntry.purchase_price"
                  name="amount"
                />
              </div>

              <div class="form-group">
                <label for="open-number-of-shares">Number of Shares</label>
                <input
                  type="number"
                  class="form-control"
                  id="open-number-of-shares"
                  required
                  v-model="newOpenPositionEntry.number_of_shares"
                  name="amount"
                />
              </div>

              <div class="form-group">
                <label for="open-initial-amount">Initial Amount</label>
                <input
                  type="number"
                  class="form-control"
                  id="open-initial-amount"
                  required
                  v-model="newOpenPositionEntry.initial_amount"
                  name="amount"
                />
              </div>

              <button
                @click="saveNewOpenPositionEntry()"
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

  <div>
    <DataTable class="display" :key="isReady">
      <thead>
        <tr>
          <th>Name</th>
          <th>Date Purchased</th>
          <th>Purchase Price</th>
          <th>Number of Shares</th>
          <th>Initial Amount</th>
          <th>Current Price</th>
          <th>Edit</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in items" :value="item" :key="item.id">
          <td>{{ item.name }}</td>
          <td>{{ item.date_purchased }}</td>
          <td>{{ item.purchase_price }}</td>
          <td>{{ item.number_of_shares }}</td>
          <td>{{ item.initial_amount }}</td>
          <td>{{ item.current_price }}</td>
          <td>
            <button
              class="btn btn-primary"
              data-toggle="modal"
              data-target="#editOpenModal"
            >
              Edit
            </button>
            <!-- Modal -->
            <div
              class="modal fade"
              id="editOpenModal"
              tabindex="-1"
              role="dialog"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div class="modal-dialog" role="document">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">
                      CEdit Open Position Entry
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
                        <label for="open-name">Name</label>
                        <input
                          type="text"
                          class="form-control"
                          id="open-name"
                          required
                          v-model="item.name"
                        />
                      </div>

                      <div class="form-group">
                        <label for="open-date-purchase">Date Purchase</label>
                        <input
                          type="date"
                          class="form-control"
                          id="dopen-ate-purchase"
                          required
                          v-model="item.date_purchased"
                        />
                      </div>

                      <div class="form-group">
                        <label for="open-purchase-price">Purchase Price</label>
                        <input
                          type="number"
                          class="form-control"
                          id="open-purchase-price"
                          required
                          v-model="item.purchase_price"
                          name="amount"
                        />
                      </div>

                      <div class="form-group">
                        <label for="open-number-of-shares"
                          >Number of Shares</label
                        >
                        <input
                          type="number"
                          class="form-control"
                          id="open-number-of-shares"
                          required
                          v-model="item.number_of_shares"
                          name="amount"
                        />
                      </div>

                      <div class="form-group">
                        <label for="open-initial-amount">Initial Amount</label>
                        <input
                          type="number"
                          class="form-control"
                          id="open-initial-amount"
                          required
                          v-model="item.initial_amount"
                          name="amount"
                        />
                      </div>

                      <div class="form-group">
                        <label for="open-initial-amount">Current Price</label>
                        <input
                          type="number"
                          class="form-control"
                          id="open-initial-amount"
                          required
                          v-model="item.initial_amount"
                          name="amount"
                        />
                      </div>

                      <button
                        @click="editOpenPositionEntry()"
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
              @click="deleteOpenEntry(item.id)"
            >
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </DataTable>
  </div>
</template>

<script>
import axios from "axios";
import DataTable from "datatables.net-vue3";
export default {
  name: "open-position-page",
  components: { DataTable },
  data() {
    return {
      investmentCategories: ["open position", "close position"],
      selectedCategory: "open position",
      newOpenPositionEntry: {
        name: "",
        date_purchased: "",
        purchase_price: "",
        number_of_shares: "",
        initial_amount: "",
      },
      items: [],
      ready: false,
    };
  },
  methods: {
    saveNewOpenPositionEntry() {
      alert("create open");
    },
    deleteOpenEntry(id) {
      alert(id);
    },
    editOpenPositionEntry() {},
    async retrieveOpenPositionEntries() {
      await axios
        .get(
          "https://ac780f41-cb23-4f7e-b82d-20715791d805.mock.pstmn.io/api/position/open"
        )
        .then((response) => {
          this.items = response.data.open_position;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    changeSelectedCategory(category) {
      alert("!!!!");
      if(category == "open position"){
        this.$router.push('open') 
      }else{
        this.$router.push('close') 
      }
    },
  },
  async mounted() {
    await this.retrieveOpenPositionEntries();
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