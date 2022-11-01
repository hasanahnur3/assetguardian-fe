<template>
  <div class="container">
    <h1 class="m4 p-4"><b>AssetGuardian</b></h1>

    <div class="container chart-box">
      <h3 class="m-2 p-2 pb-4" style="color: grey"><b>Login</b></h3>

      <div class="submit-form">
        <div class="form-group">
          <label for="name">Email</label>
          <input
            type="text"
            class="form-control"
            id="email"
            required
            v-model="loginInfo.email"
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
            v-model="loginInfo.password"
            name="password"
          />
        </div>

        <br />

        <button
          @click="login()"
          class="btn btn-primary mr-4"
          data-dismiss="modal"
        >
          Submit
        </button>

        <button
          @click="register()"
          class="btn btn-outline btn-outline-primary"
          data-dismiss="modal"
        >
          Sign Up
        </button>

        <p class="text-primary mt-4" @click="forgotPassword()">
          <u>Forgot Password</u>
        </p>

        <br />
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "login-page",
  components: {},
  data() {
    return {
      loginInfo: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    async login() {
      try {
        await axios
          .post(
            "https://be-asset-guardian.onrender.com/api/user/login/",
            this.loginInfo,
            {
              headers: {
                Accept: "application/json",
              },
            }
          )
          .then((response) => {
            try {
              let data = response.data;
              console.log(data);
              this.$store.commit('changeUserId', data.user.id)
              console.log(this.$store.state.userId);
              this.$router.push("/");
            } catch (err) {
              console.log(err);
              alert("Error!");
            }
          });
      } catch (err) {
        if (
          err.response.data.detail != null ||
          err.response.data.detal != undefined
        ) {
          alert("Email of password not match!");
        }
      }
    },
    register() {
      this.$router.push("register");
    },
    forgotPassword() {
      this.$router.push("forgot-password");
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