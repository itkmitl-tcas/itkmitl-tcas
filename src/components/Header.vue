<template>
  <div class="header-container">
    <div class="py-4 container">
      <div class="d-flex flex-row align-items-center">
        <img v-lazy="require('@images/logo.png')" class="mr-3" />
        <div class="d-flex flex-column">
          <div class="text-white-50 title">
            Faculty of Information Technology
          </div>
          <div class="text-muted subtitle">
            King Mongkut's Institute of Technology Ladkrabang
          </div>
        </div>
        <a
          href="#"
          @click="signOut()"
          class="title text-white-50 flex-grow-1 text-right"
        >
          Sign Out
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Header",
  methods: {
    signOut() {
      axios.post("http://localhost:3000/auth/signout").then(() => {
        localStorage.removeItem("token");
        delete axios.defaults.headers.common["Authorization"];
        this.$swal("success", "ออกจากระบบ").then(() =>
          this.$router.push({
            name: "SLogin"
          })
        );
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.header-container {
  height: 70px;

  img {
    width: 40px;
  }

  .title {
    font-size: 13px;
  }

  .subtitle {
    font-size: 10px;
  }
}
</style>
