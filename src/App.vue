<template>
  <div id="app">
    <AppHeader v-if = "showLayout" />
    <main class="main-content">
      <router-view />
    </main>
    <AppFooter v-if="showLayout"/>
  </div>
</template>

<script>
import AppHeader from './components/AppHeader.vue'
import AppFooter from './components/AppFooter.vue'

export default {
  name: 'App',
  components: {
    AppHeader,
    AppFooter
  },
  computed: {
    showLayout() {
      const noLayoutRoutes = ['SignUp', 'Login']
      return !noLayoutRoutes.includes(this.$route.name)
    }
  }

}
</script>

<style>
html, body {
  overflow-x: clip;
  margin: 0;
  padding: 0;
}
</style>

<style scoped>
#app {
  min-height: 100vh;
}

.main-content {
  width: 100%;
}
</style>
