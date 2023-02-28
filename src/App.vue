<template>
  <v-app>
    <nav>
      <BaseHeader></BaseHeader>
    </nav>
    <v-main style="background: #e8e2df">
      <v-container fluid>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>
<script>
import BaseHeader from "./components/BaseHeader.vue";
export default {
  components: {
    BaseHeader,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
