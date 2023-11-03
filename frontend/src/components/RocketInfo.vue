<script setup>
import { ref, onMounted } from 'vue'

const props = defineProps(['rocketName'])

</script>

<template>
  <div class="info">
    <h1>{{ props.rocketName }}</h1>
    <hr/>
    
  </div>
</template>

<style scoped>
.info{
  width:90vw;
  max-width: 400px;
  height: 80vh;
  background-color: rgba(12,12,12,0.7);
  position:absolute;
  right: 2vw;
  top:5vh;
  padding:15px;
  border-right:2px solid rgba(170, 120, 12,1);
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