<script setup>
import { ref, onMounted } from 'vue'
import { userStore } from '../stores/user';
import Chip from './Chip.vue';

const usr = userStore();

function percColor(num){
  if(num > 85){return 'green'}
  else if(num > 60){return 'orange'}
  else if(num > 30){return 'rgb(170, 82, 12)'}
  else{return 'red'}
}
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
      <p>Mass: <b>{{ props.rocket.mass[usr.getUnitsWeight] }} {{ usr.getUnitsWeight }}</b></p>
      <p>Height: <b>{{ props.rocket.height[usr.getUnitsSize] }} {{ usr.getUnitsSize }}</b></p>
      <p>Diameter: <b>{{ props.rocket.diameter[usr.getUnitsSize] }} {{ usr.getUnitsSize }}</b></p>
    </div>
    <hr/>
    <div class="content-text">
      <h3>Other Information</h3>
      <p>Company: <b>{{ props.rocket.company }}</b></p>
      <p>Success Rate: <b :style="{'color':percColor(props.rocket.success_rate_pct)}">{{ props.rocket.success_rate_pct }}%</b></p>
      <Chip style="margin: 7px;" icon="attach_money" color="green" :text="props.rocket.cost_per_launch + ' per launch'"/>
      <p>First Flight: <b>{{ props.rocket.first_flight }}</b></p>
      <p>Country: <b>{{ props.rocket.country }}</b></p>
    </div>
    <hr/>
    <div class="content-text">
      <img v-for="(img, i) in props.rocket.flickr_images" :key="i" :src="img" style="width:100%" :alt="'Image ' + i"/>
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
  overflow-y: scroll;
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
b{
  font-weight: 600;
}
.content-text{
  margin: 10px 0;
}
</style>