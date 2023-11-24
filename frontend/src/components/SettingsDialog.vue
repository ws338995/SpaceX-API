<script setup>
import { ref, onMounted } from 'vue'
import { userStore } from '../stores/user';
const usr = userStore();
const emit = defineEmits(['close'])

</script>

<template>
  <div class="menu">
    <p>Settings</p>
    <button @click="usr.toggleUnitsWeight()">Mass</button>
    <button @click="usr.toggleUnitsForce()">Force</button>
    <button @click="usr.toggleUnitsSize()">Dimension</button>

    <button @click="emit('close')">close</button>
  </div>
</template>

<style scoped>
.menu{
    z-index: 11;
    position:absolute;
    bottom:0;
    margin:20px;
    box-shadow: 0 0 10px black;
    background-color: var(--color-background);
    border: 2px solid orange;
    padding: 20px;
    color: var(--color-text);
    width: 300px;
    height: 500px;
    user-select: none;
}
/* div p{
    text-align: center;
    width:160px;
    transform: translate(-140px, 50px);
} */
</style>