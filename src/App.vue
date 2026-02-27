<template>
  <div id="app">
    <AppHeader />
    <main class="main-content">
      <router-view />
    </main>
    <AppFooter />
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
  }
}
</script>

<style>
/* Remove scoped so html/body styles actually apply */
html, body {
  overflow-x: clip;
  margin: 0;
  padding: 0;
}
</style>

<style scoped>
#app {
  min-height: 100vh;
  /* Remove flex — this is what breaks sticky */
}

.main-content {
  width: 100%;
}
</style>
