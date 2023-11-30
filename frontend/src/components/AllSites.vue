<script setup>
import { ref, onMounted } from 'vue'
import { userStore } from '../stores/user';
import Chip from './Chip.vue';
import { useRouter, useRoute } from 'vue-router'

const usr = userStore();
const router = useRouter();

const emit = defineEmits(['selectSite'])

const expanded = ref(false);

const props = defineProps({
  launchSites:Array,
  ships:Array,
  landSites: Array,
})

</script>

<template>
  <div class="wrapper">
    <div class="cont" :class="[expanded ? '' : 'minimized']">
      <h3>Landing Pads</h3>
      <div>
        <Chip 
        selectable
        @click="emit('selectSite',l)" 
        v-for="(l,i) in props.landSites" :key="i" 
        :text="l.name" 
        outlined 
        color="red"/>
      </div>
      <hr/>
      <h3>Launching Pads</h3>
      <div>
        <Chip 
        selectable
        @click="emit('selectSite',ll)" 
        v-for="(ll,i) in props.launchSites" :key="i" 
        :text="ll.name" 
        outlined 
        color="#1e90ff"/>
      </div>
      <hr/>
      <h3>Ships</h3>
      <div>
        <Chip 
        selectable
        @click="emit('selectSite',lll)" 
        v-for="(lll,i) in props.ships" :key="i" 
        :text="lll.name" 
        outlined 
        color="rgb(225, 255, 30)"/>
      </div>
    </div>
    <div class="expandBtn" @click="()=>{expanded = !expanded}">
      <span class="material-symbols-outlined">
        {{expanded ? 'chevron_left' : 'chevron_right'}}
      </span>
    </div>
  </div>
</template>

<style scoped>

.wrapper{
  z-index: 4;
  position:absolute;
  left: 10px;
  bottom:10px;
  display:flex;
}
.cont{
  width:300px;
  height: 70vh;
  background-color: rgba(12,12,12,0.7);
  padding:15px;
  border-left:2px solid rgba(170, 120, 12,1);
  overflow-y: scroll;
  transition: 0.2s;
}

.cont div{
  display:flex;
  flex-wrap: wrap;
}

.wrapper .expandBtn{
  background-color:rgba(12,12,12,0.4);
  padding:10px;
  transition:0.2s;
  height: fit-content;
  font-size: 5px;
  cursor: pointer;
}
.wrapper .expandBtn:hover{
  background-color:orange;
}


.cont.minimized{
  overflow:hidden;
  width:0px;
  padding:0px;
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