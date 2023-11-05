<script setup>
import FalconHeavy from '../components/FalconHeavy.vue';
import RocketInfo from '../components/RocketInfo.vue';
import { userStore } from '../stores/user';

const usr = userStore();


</script>

<template>
  <main>
    <RocketInfo rocket-name="Flacon Heavy"/>
    <FalconHeavy />
  </main>
</template>
