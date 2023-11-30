<script setup>
import { ref, onMounted } from 'vue'
import RocketList from './RocketList.vue';
import CrewList from './CrewList.vue';
import LaunchList from './LaunchList.vue';
import router from '../router';
let selectedMenu = ref('')

function selectMenu(menu){
  if(selectedMenu.value == menu){
    selectedMenu.value = "";
  }else{
    selectedMenu.value = menu;
  }

  if(menu =='map'){
    router.push('/map/')
  }
  else if(menu == 'events'){
    router.push('/events')
  }
}

// lifecycle hooks
onMounted(() => {
})
</script>

<template>
  <div>
    <div class="bar">
      <div class="btn" @click="selectMenu('map')" :class="{selected : selectedMenu == 'map'}" >MAP</div>
      <div class="btn" @click="selectMenu('events')" :class="{selected : selectedMenu == 'events'}" >EVENTS</div>
      <div class="btn" @click="selectMenu('launches')" :class="{selected : selectedMenu == 'launches'}" >LAUNCHES</div>
      <div class="btn" @click="selectMenu('rockets')" :class="{selected : selectedMenu == 'rockets'}">ROCKETS</div>
      <div class="btn" @click="selectMenu('crews')" :class="{selected : selectedMenu == 'crews'}">CREWS</div>
    </div>
    <RocketList v-if="selectedMenu == 'rockets'" @close="selectMenu('rockets')"/>
    <CrewList v-if="selectedMenu == 'crews'" @close="selectMenu('crews')"/>
    <LaunchList v-if="selectedMenu == 'launches'" @close="selectMenu('launches')"/>
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

.btn.selected{
  color:orange; 
}
.btn:hover{
    color:white;
    cursor: pointer;
}
</style>