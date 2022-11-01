<template>
  <div class="container">
    <h1 class="m4 p-4"><b>AssetGuardian</b></h1>

    <div class="container chart-box">
      <h3 class="m-2 p-2 pb-4" style="color: grey"><b>Forgot Password</b></h3>

      <div class="submit-form">
        <div class="form-group">
          <label for="name">Email</label>
          <input
            type="text"
            class="form-control"
            id="email"
            required
            v-model="fpInfo.email"
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
            v-model="fpInfo.password"
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
            v-model="fpInfo.cpassword"
            name="cpassword"
          />
        </div>

        <br />

        <button
          @click="forgotPassword()"
          class="btn btn-primary mr-4"
          data-dismiss="modal"
        >
          Forgot Password
        </button>

        <br />
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "forgot-password-page",
  components: {},
  data() {
    return {
      fpInfo: {
        email: "",
        password: "",
        cpassword: "",
      },
    };
  },
  methods: {
    async forgotPassword() {
      if (this.fpInfo.password != this.fpInfo.cpassword) {
        alert("Password not match!");
      } else {
        let fpRequestbody = {
          email: this.fpInfo.email,
          password: this.fpInfo.password,
        };

        try {
          await axios
            .post(
              "https://be-asset-guardian.onrender.com/api/user/forgot-password/",
              fpRequestbody,
              {
                headers: {
                  Accept: "application/json",
                },
              }
            )
            .then((response) => {
              try {
                let data = response.data;
                alert(
                  "user " +
                    data.user.email +
                    "'s password changed successfully!"
                );
                this.$router.push("/");
              } catch (err) {
                alert("Error!");
              }
            });
        } catch (err) {
          if (
            err.response.data.detail != null ||
            err.response.data.detal != undefined
          ) {
            alert("Email not found!");
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