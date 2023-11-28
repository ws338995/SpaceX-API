<script setup>
import { ref, onMounted, defineEmits, onUpdated } from 'vue'

const emit = defineEmits(['click'])

const props = defineProps({
  icon: String,
  text: String,
  color: String,
  outlined: Boolean,
  selectable: Boolean
})

const color = ref('#1b1b1b');

const backgroundColor = ref(color.value);

const cursor = ref('auto');

onMounted(()=>{
  if(props.selectable){
    cursor.value = 'pointer'
  }
  if(props.color){color.value=props.color}
  if(props.outlined){
    backgroundColor.value = 'rgba(0,0,0,0)';
  }else{
    backgroundColor.value = color.value;
  }
})

onUpdated(()=>{
  if(props.color){color.value=props.color}
  if(props.outlined){
    backgroundColor.value = 'rgba(0,0,0,0)';
  }else{
    backgroundColor.value = color.value;
  }
})

</script>

<template>
  <div 
    class="chip" 
    @click="emit('click')" 
    :style="{ 'background-color' : backgroundColor, 'border-color' : color,  'cursor': cursor}"
    :class="{ 'selectable' : props.selectable }"
    >
    <div class="icon" v-if="props.icon">
      <span class="material-symbols-outlined" :style="[props.outlined ? {'color': color} : {'color': '#fff'}]">
        {{ props.icon }}
      </span>
    </div>
    <div :style="[props.outlined ? {'color': color} : {'color': '#fff'}]">
      {{ props.text }}
    </div>
  </div>
</template>

<style scoped>
.chip{
  padding:3px 10px;
  color:white;
  width:fit-content;
  border-radius: 24px;
  border: 1px solid rgba(255, 255, 255, 0);
  transition:0.2s;
  display:grid;
  margin:5px;
  grid-template-columns: auto auto;
}
.chip.selectable:hover{
  background-color: orange !important;
  border-color:white!important;
}
.chip.selectable:hover div{
  color:white !important;
}
.icon{
  padding-top:3px;
  padding-right:4px;
  transition: 0.2s;
}
.icon span{
  font-size:17px;
}
</style>