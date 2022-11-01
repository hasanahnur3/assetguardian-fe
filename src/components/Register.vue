<template>
  <div class="container">
    <h1 class="m4 p-4"><b>AssetGuardian</b></h1>

    <div class="container chart-box">
      <h3 class="m-2 p-2 pb-4" style="color: grey"><b>Sign Up</b></h3>

      <div class="submit-form">
        <div class="form-group">
          <label for="name">Email</label>
          <input
            type="text"
            class="form-control"
            id="email"
            required
            v-model="registerInfo.email"
            name="email"
          />
        </div>
        <br />
        <div class="form-group">
          <label for="name">Password</label>
          <input
            type="password"
            class="form-control"
            id="password"
            required
            v-model="registerInfo.password"
            name="password"
          />
        </div>

        <br />

        <div class="form-group">
          <label for="name">Confirm Password</label>
          <input
            type="password"
            class="form-control"
            id="cpasword"
            required
            v-model="registerInfo.cpassword"
            name="cpassword"
          />
        </div>

        <br />

        <button
          @click="register()"
          class="btn btn-primary mr-4"
          data-dismiss="modal"
        >
          Sign Up
        </button>

        <br />
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "register-page",
  components: {},
  data() {
    return {
      registerInfo: {
        email: "",
        password: "",
        cpassword: "",
      },
      user: {},
    };
  },
  methods: {
    async register() {
      if (this.registerInfo.password != this.registerInfo.cpassword) {
        alert("password not match");
      } else {
        try {
          await axios
            .post(
              "https://be-asset-guardian.onrender.com/api/user/",
              this.registerInfo,
              {
                headers: {
                  Accept: "application/json",
                },
              }
            )
            .then((response) => {
              try {
                let data = response.data;
                alert("user " + data.user.email + " created successfully!");
                this.$store.commit("changeUserId", data.user.id);
                console.log(this.$store.state.userId);
                this.$router.push("/");
              } catch (err) {
                console.log(err);
                alert("Error!");
              }
            });
        } catch (err) {
          if (
            err.response.data.email != null ||
            err.response.data.email != undefined
          ) {
            alert("Email must be unique!");
          }
        }
      }
    },
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