<script setup>
import { ref, onMounted } from 'vue'
import { userStore } from '../stores/user';
import Chip from './Chip.vue';

const usr = userStore();

const props = defineProps({
  rocket: Object,
})

</script>

<template>
  <div class="info">
    <div class="content-text">
      <h1 style="display:inline-block">{{ props.rocket.name }}</h1>
      <div style="display:inline-block; float:right;">
        <Chip v-if="props.rocket.active" text="Active" color="green" outlined/>
        <Chip v-else text="Not Active" color="red" outlined/>
      </div>
    </div>
    <hr/>
    <div class="content-text">
      <h3>Description</h3>
      <p>{{ props.rocket.description }}</p>
    </div>
    <hr/>
    <div class="content-text">
      <h3>Technical Information</h3>
      <p>Mass: {{ props.rocket.mass[usr.getUnitsWeight] }} {{ usr.getUnitsWeight }}</p>
      <p>Height: {{ props.rocket.height[usr.getUnitsSize] }} {{ usr.getUnitsSize }}</p>
      <p>Diameter: {{ props.rocket.diameter[usr.getUnitsSize] }} {{ usr.getUnitsSize }}</p>
      <Chip icon="attach_money" color="green" :text="props.rocket.cost_per_launch + ' per launch'"/>
    </div>
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
h3{
  color:#464646;
}

.content-text{
  margin: 10px 0;
}
</style>