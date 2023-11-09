<script setup>
import { ref, onMounted } from 'vue'

// lifecycle hooks
onMounted(() => {
})

const emit = defineEmits(['click'])

const props = defineProps({
  image: String,
  title: String,
  description: String
})

</script>

<template>
  <div class="itemSelect" @click="emit('click')">
    <img alt="image" :src="props.image"/>
    <h3>{{ props.title }}</h3>
    <p v-if="props.description">{{ props.description }}</p>
  </div>
</template>

<style scoped>
.itemSelect{
  padding:0;
  width: 200px;
  height: 300px;
  background-color:rgb(24, 24, 24);
  margin:5px;
}
.itemSelect img{
  width:100%;
  height: 80%;
  object-fit: cover;
}

.itemSelect:hover{
  background-color:rgb(37, 37, 37);
  cursor: pointer;
}
</style>