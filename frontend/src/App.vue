<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Footer from './components/Footer.vue';
import Navigation from './components/Navigation.vue';

</script>

<template>
  <div>
    <Navigation />
    <RouterView />
    <Footer />
  </div>
</template>

<style scoped>

@media (min-width: 1024px) {

}
</style>
