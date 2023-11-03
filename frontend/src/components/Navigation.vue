<script setup>
import { ref, onMounted } from 'vue'

// lifecycle hooks
onMounted(() => {
})
</script>

<template>
  <div class="bar">
    <div class="btn">LAUNCHES</div>
    <div class="btn">ROCKETS</div>
    <div class="btn">CREWS</div>
  </div>
</template>

<style scoped>
.bar{
    z-index: 10;
    position:absolute;
    top:0;left:0;right:0;
    margin: auto;
    background-color: var(--color-background-mute);
    width: 100%;
    max-width: 700px;
    padding:5px;
    text-align: center;
    user-select: none;
    display: flex;
    flex-flow: row;
    justify-content:space-around;
}
.btn{
    padding:5px;
    transition:0.2s;
}
.btn:hover{
    color:white;
    cursor: pointer;
}
</style>