<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Footer from './components/Footer.vue';
import Navigation from './components/Navigation.vue';
import { userStore } from './stores/user'

const usr = userStore();

</script>

<template>
  <div>
    <Navigation v-if="usr.getLoggedIn"/>
    <RouterView />
    <Footer />
  </div>
</template>

<style scoped>

@media (min-width: 1024px) {

}
</style>
