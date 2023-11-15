<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import ItemSelect from './ItemSelect.vue';
import router from '../router';

const emit = defineEmits(['close'])

let loaded = ref(false);
let crews = [];

function openCrewPage(rocketId){
  router.push("/crew/"+rocketId);
  emit("close");
}

// lifecycle hooks
onMounted(() => {
  //lets grab a list of crews from the API
  axios.get('https://api.spacexdata.com/v4/crew')
  .then(function (response) {
    // handle success
    crews = response.data;
    loaded.value = true;
  })
})
</script>

<template>
  <div class="box">
    <div class="content" v-if="loaded">
      <ItemSelect v-for="crew in crews" :key="crew.id"
        :title="crew.name"
        :image="crew.image"
        @click="openCrewPage(crew.id)"
      />
    </div>
  </div>
</template>

<style scoped>
.box{
    z-index:9;
    position:absolute;
    top:50px;left:0;right:0;
    margin: auto;
    background-color: rgba(12,12,12,1);
    border-bottom:2px solid orange;
    border-top: 2px solid orange;
    width: 90%;
    height: 90%;
    padding:5px;
    text-align: center;
    user-select: none;
    animation: open 1.5s ease;
    overflow: hidden;
}
.content{
  height: 100%;
  display: flex;
  flex-flow: row;
  flex-wrap: wrap;
  justify-content: center;
  overflow: scroll;
}
.btn{
    padding:5px;
    transition:0.2s;
}
.btn:hover{
    color:white;
    cursor: pointer;
}

@keyframes open {
  0%{width: 0;height: 0;}
  45%{width: 90%;height: 0;}
  100%{width: 90%;height: 90%;}
}
</style>