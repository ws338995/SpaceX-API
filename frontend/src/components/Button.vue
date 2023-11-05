<script setup>
import { ref, onMounted, defineEmits } from 'vue'

const emit = defineEmits(['click'])

const props = defineProps({
  icon: String,
  text: String,
  width: String
})


</script>

<template>
  <div class="btnBox" :style="{width:props.width}" @click="emit('click')">
    <div class="icon" v-if="props.icon">
      <span class="material-symbols-outlined">
        {{ props.icon }}
      </span>
    </div>
    <div v-else>
      {{ props.text }}
    </div>
  </div>
</template>

<style scoped>
.btnBox{
  margin:15px;
  padding:6px;
  color:black;
  background-color: orange;
  border: 1px solid rgba(131, 131, 131,0);

  transition:0.2s;
}
.btnBox:hover{
  border:1px solid orange;
  background-color: black;
  color:white;
  cursor: pointer;
}
.input{
  padding:10px;
  background-color: rgba(12,12,12,1);
  border-style: none;
  color:white;
}
.inputBox:has(.input:focus){
  border-bottom: 2px solid orange;
}
.inputBox:has(.input:focus) .icon{
  color:orange;
}
input:focus{
  outline:none;
}
.icon{
  padding:4px;
  transition: 0.2s;
}
</style>