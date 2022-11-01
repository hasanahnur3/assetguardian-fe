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
              @click="changeSelectedEntry(item)"
            >
              Edit
            </button>
          </td>
          <td>
            <button
              type="button"
              class="btn btn-primary"
              @click="deleteClosePositionEntry(item)"
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
                  v-model="this.selectedEntry.name"
                />
              </div>

              <div class="form-group">
                <label for="close-date-purchase">Date Purchase</label>
                <input
                  type="date"
                  class="form-control"
                  id="close-date-purchase"
                  required
                  v-model="this.selectedEntry.date_purchased"
                />
              </div>

              <div class="form-group">
                <label for="close-date-sold">Date Sold</label>
                <input
                  type="date"
                  class="form-control"
                  id="close-date-sold"
                  required
                  v-model="this.selectedEntry.date_sold"
                />
              </div>

              <div class="form-group">
                <label for="close-purchase-price">Purchase Price</label>
                <input
                  type="number"
                  class="form-control"
                  id="close-purchase-price"
                  required
                  v-model="this.selectedEntry.purchase_price"
                />
              </div>

              <div class="form-group">
                <label for="close-number-of-shares">Number of Shares</label>
                <input
                  type="number"
                  class="form-control"
                  id="close-number-of-shares"
                  required
                  v-model="this.selectedEntry.number_of_shares"
                />
              </div>

              <div class="form-group">
                <label for="close-current-price">Current Price</label>
                <input
                  type="number"
                  class="form-control"
                  id="close-current-price"
                  required
                  v-model="this.selectedEntry.current_price"
                />
              </div>

              <button
                @click="editClosePositionEntry()"
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
        date_purchased: 0,
        date_sold: 0,
        purchase_price: 0,
        number_of_shares: 0,
        current_price: 0,
      },
      selectedEntry: {},
      items: [],
      ready: false,
    };
  },
  methods: {
    async deleteClosePositionEntry(item) {
      this.ready = false;
      try {
        await axios
          .delete(
            "https://be-asset-guardian.onrender.com/api/position/close/" +
              item.id,
            {
              headers: {
                Accept: "application/json",
                "User-Id": this.$store.state.userId,
              },
            }
          )
          .then((response) => {
            if (response.data.message.includes("has been deleted")) {
              alert("Close position entry deleted successfully!");
              const idx = this.items.indexOf(item);
              if (idx > -1) {
                this.items.splice(idx, 1);
              }
            }
          });
      } catch (err) {
        alert("Error!");
      }
      this.$nextTick().then(() => (this.ready = true));
    },
    async editClosePositionEntry() {
      this.ready = false;
      try {
        await axios
          .put(
            "https://be-asset-guardian.onrender.com/api/position/close/" +
              this.selectedEntry.id,
            this.selectedEntry,
            {
              headers: {
                Accept: "application/json",
                "User-Id": this.$store.state.userId,
              },
            }
          )
          .then((response) => {
            console.log(response.data.open_position);
            alert("Close investment entry edited successfully!");
          });
      } catch (err) {
        alert("Error!");
      }
      this.$nextTick().then(() => (this.ready = true));
    },
    changeSelectedEntry(item) {
      this.selectedEntry = item;
    },
    async saveNewClosePositionEntry() {
      this.ready = false;
      this.newClosePositionEntry.current_price =
        this.newClosePositionEntry.purchase_price;

      try {
        await axios
          .post(
            "https://be-asset-guardian.onrender.com/api/position/close/",
            this.newClosePositionEntry,
            {
              headers: {
                Accept: "application/json",
                "User-Id": this.$store.state.userId,
              },
            }
          )
          .then((response) => {
            alert("Close investment new entry created successfully!");
            this.items.push(response.data.close_position);
          });
      } catch (err) {
        alert("Error!");
      }
      this.$nextTick().then(() => (this.ready = true));
    },
    deleteCloseEntry(id) {
      alert(id);
    },
    async retrieveClosePositionEntries() {
      await axios
        .get("https://be-asset-guardian.onrender.com/api/position/close", {
          headers: {
            Accept: "application/json",
            "User-Id": this.$store.state.userId,
          },
        })
        .then((response) => {
          this.items = response.data.close_position;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    changeSelectedCategory(category) {
      if (category == "open position") {
        this.$router.push("open");
      } else {
        this.$router.push("close");
      }
    },
  },
  async mounted() {
    if (this.$store.state.userId == 0) {
      this.$router.push("/login");
    }
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