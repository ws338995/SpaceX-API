<script setup>
import { ref, onMounted, onUpdated } from 'vue'

const props = defineProps({
  label:String,
  icon:String,
  placeholder:String,
  type:String,
  value: String
})

const value = ref('');

const emit = defineEmits(['change'])

onMounted(()=>{
  value.value = props.value;
})

function change(){
  emit('change',value.value);
}

</script>

<template>
  <div class="inputBox">
    <div class="icon">
      <span class="material-symbols-outlined">
        {{ props.icon }}
      </span>
    </div>
    <input @change="change" v-model="value" class="input" :type="props.type" :placeholder="props.placeholder"/>
  </div>
</template>

<style scoped>
.inputBox{
  margin:15px;
  display:grid;
  grid-template-columns: 30px auto;
  background-color: rgba(12,12,12,1);
  border-bottom: 1px solid rgb(131, 131, 131);
  transition:0.2s;
}
.input{
  padding:10px;
  background-color: rgba(12,12,12,1);
  border-style: none;
  color:white;
}
.inputBox:has(.input:focus){
  border-bottom: 1px solid orange;
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