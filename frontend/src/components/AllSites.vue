<script setup>
import { ref, onMounted } from 'vue'
import { userStore } from '../stores/user';
import Chip from './Chip.vue';
import { useRouter, useRoute } from 'vue-router'
import { TreeView } from "@grapoza/vue-tree"

const usr = userStore();
const router = useRouter();

const emit = defineEmits(['selectSite'])

const props = defineProps({
  launchSites:Array,
  ships:Array,
  landSites: Array,
})

const dataModel = ref([
  {
    id: 0,
    label: "Ships",
    children: []
  },
  {
    id: 0,
    label: "Landing Pads",
    children: []
  },
  {
    id: 0,
    label: "Launching Pads",
    children: []
  },
])

onMounted(()=>{
  dataModel.value[0].children = props.ships.map((s)=>{
    return{
      id: s.id,
      label: s.name,
      selectable:true,
    }
  });
  dataModel.value[1].children = props.landSites.map((s)=>{
    return{
      id: s.id,
      label: s.name,
      selectable:true,
    }
  });
  dataModel.value[2].children = props.launchSites.map((s)=>{
    return{
      id: s.id,
      label: s.name,
      treeNodeSpec: {
        title: s.name,
        selectable: true,
      }
    }
  });
})

</script>

<template>
  <div class="cont">
    <tree-view id="my-tree" :initial-model="dataModel"></tree-view>
    <!-- <Chip 
    selectable
    @click="emit('selectSite',l)" 
    v-for="(l,i) in props.landSites" :key="i" 
    :text="l.name" 
    outlined 
    color="red"/>
    <Chip 
    selectable
    @click="emit('selectSite',ll)" 
    v-for="(ll,i) in props.launchSites" :key="i" 
    :text="ll.name" 
    outlined 
    color="#1e90ff"/>
    <Chip 
    selectable
    @click="emit('selectSite',lll)" 
    v-for="(lll,i) in props.ships" :key="i" 
    :text="lll.name" 
    outlined 
    color="rgb(225, 255, 30)"/> -->
  </div>
</template>

<style scoped>
.cont{
  z-index: 4;
  width:300px;
  height: 70vh;
  background-color: rgba(12,12,12,0.7);
  position:absolute;
  left: 2vw;
  bottom:5vh;
  padding:15px;
  border-left:2px solid rgba(170, 120, 12,1);
  overflow-y: scroll;
  display:flex;
  flex-wrap: wrap;
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