<template>
  <div id="app">
    <nav class="navbar navbar-expand navbar-light bg-light">
      <router-link to="/" class="navbar-brand"
        ><b>AssetGuardian</b></router-link
      >
      <div class="navbar-nav mr-auto">
        <li class="nav-item">
          <router-link to="/" class="nav-link">Home</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/summary" class="nav-link">Summary</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/input" class="nav-link">Input</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/investment/open" class="nav-link"
            >Investment</router-link
          >
        </li>
      </div>
      <button
        type="button"
        class="btn btn-primary"
        v-if="this.$store.state.userId != 0"
        @click="logout()"
      >
        Logout
      </button>
    </nav>

    <div class="m-4 p-4">
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  name: "app",
  methods: {
    logout() {
      this.$store.commit("changeUserId", 0);
      this.$router.push("/login");
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

.puple-text {
  color: #2a27b5;
}
</style>
