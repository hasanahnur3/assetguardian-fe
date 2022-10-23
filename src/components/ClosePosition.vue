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

          <!-- Close Position Form -->
          <div class="modal-body" v-if="selectedCategory == 'close position'">
            <div class="submit-form">
              <div class="form-group">
                <label for="close-name">Name</label>
                <input
                  type="text"
                  class="form-control"
                  id="close-name"
                  required
                  v-model="newClosePositionEntry.name"
                />
              </div>

              <div class="form-group">
                <label for="close-date-purchase">Date Purchase</label>
                <input
                  type="date"
                  class="form-control"
                  id="close-date-purchase"
                  required
                  v-model="newClosePositionEntry.date_purchased"
                />
              </div>

              <div class="form-group">
                <label for="close-date-sold">Date Sold</label>
                <input
                  type="date"
                  class="form-control"
                  id="close-date-sold"
                  required
                  v-model="newClosePositionEntry.date_sold"
                />
              </div>

              <div class="form-group">
                <label for="close-purchase-price">Purchase Price</label>
                <input
                  type="number"
                  class="form-control"
                  id="close-purchase-price"
                  required
                  v-model="newClosePositionEntry.purchase_price"
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
                  v-model="newClosePositionEntry.number_of_shares"
                  name="amount"
                />
              </div>

              <button
                @click="saveNewClosePositionEntry()"
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
          <th>Date Sold</th>
          <th>Purchase Price</th>
          <th>Number of Shares</th>
          <th>Current Price</th>
          <th>Edit</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in items" :value="item" :key="item.id">
          <td>{{ item.name }}</td>
          <td>{{ item.date_purchased }}</td>
          <td>{{ item.date_sold }}</td>
          <td>{{ item.purchase_price }}</td>
          <td>{{ item.number_of_shares }}</td>
          <td>{{ item.current_price }}</td>
          <td>
            <button
              class="btn btn-primary"
              data-toggle="modal"
              data-target="#editCloseModal"
            >
              Edit
            </button>
            <!-- Modal -->
            <div
              class="modal fade"
              id="editCloseModal"
              tabindex="-1"
              role="dialog"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div class="modal-dialog" role="document">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">
                      Edit Close Position Entry
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
                        <label for="close-name">Name</label>
                        <input
                          type="text"
                          class="form-control"
                          id="close-name"
                          required
                          v-model="item.name"
                        />
                      </div>

                      <div class="form-group">
                        <label for="close-date-purchase">Date Purchase</label>
                        <input
                          type="date"
                          class="form-control"
                          id="close-date-purchase"
                          required
                          v-model="item.date_purchased"
                        />
                      </div>

                      <div class="form-group">
                        <label for="close-date-sold">Date Sold</label>
                        <input
                          type="date"
                          class="form-control"
                          id="close-date-sold"
                          required
                          v-model="item.date_sold"
                        />
                      </div>

                      <div class="form-group">
                        <label for="close-purchase-price">Purchase Price</label>
                        <input
                          type="number"
                          class="form-control"
                          id="close-purchase-price"
                          required
                          v-model="item.purchase_price"
                        />
                      </div>

                      <div class="form-group">
                        <label for="close-number-of-shares"
                          >Number of Shares</label
                        >
                        <input
                          type="number"
                          class="form-control"
                          id="close-number-of-shares"
                          required
                          v-model="item.number_of_shares"
                        />
                      </div>

                      <div class="form-group">
                        <label for="close-current-price"
                          >Current Price</label
                        >
                        <input
                          type="number"
                          class="form-control"
                          id="close-current-price"
                          required
                          v-model="item.current_price"
                        />
                      </div>

                      <button
                        @click="EditPositionEntry()"
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
              @click="deleteCloseEntry(item.id)"
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
  name: "close-position-page",
  components: { DataTable },
  data() {
    return {
      investmentCategories: ["open position", "close position"],
      selectedCategory: "close position",
      newClosePositionEntry: {
        name: "",
        date_purchased: "",
        date_sold: "",
        purchase_price: "",
        number_of_shares: "",
      },
      items: [],
      ready: false,
    };
  },
  methods: {
    saveNewClosedPositionEntry() {
      alert("create close");
    },
    deleteCloseEntry(id) {
      alert(id);
    },
    editClosePositionEntry() {},
    async retrieveClosePositionEntries() {
      await axios
        .get(
          "https://ac780f41-cb23-4f7e-b82d-20715791d805.mock.pstmn.io/api/position/close"
        )
        .then((response) => {
          this.items = response.data.close_position;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    changeSelectedCategory(category){
      alert("!!!!");
      if(category == "open position"){
        this.$router.push('open') 
      }else{
        this.$router.push('close') 
      }
    }
  },
  async mounted() {
    await this.retrieveClosePositionEntries();
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