<script setup>
import { ref, onMounted } from 'vue'
import { userStore } from '../stores/user';
import Toggle from '@vueform/toggle'

const usr = userStore();
const emit = defineEmits(['close'])

const forceMetric = ref(true);
const massMetric = ref(true);
const sizeMetric = ref(true);


</script>

<template>
  <div class="menu">
    <p>Settings</p>
    <div class="settingContainer">
      <p>Force Units: </p>
      <Toggle v-model="forceMetric" 
      id="ForceToggle"
      class="toggleUnit"
      name="ForceToggle"
      @change="usr.toggleUnitsForce();"
      on-label="kN"
      off-label="lbf"/>
    </div>
    <div class="settingContainer">
      <p>Mass Units: </p>
      <Toggle v-model="massMetric" 
      class="toggleUnit"
      name="MassToggle"
      id="MassToggle"
      @change="usr.toggleUnitsWeight"
      on-label="kg"
      off-label="lb"/>
    </div>
    <div class="settingContainer">
      <p>Size Units: </p>
      <Toggle v-model="sizeMetric" 
      class="toggleUnit"
      name="SizeToggle"
      id="SizeToggle"
      @change="usr.toggleUnitsSize"
      on-label="m"
      off-label="f"/>
    </div>

    <div class="closeBtn" @click="emit('close')">
      <span class="material-symbols-outlined">
        close
      </span>
    </div>
  </div>
</template>

<style scoped>
.menu{
    z-index: 11;
    position:absolute;
    bottom:0;
    margin:20px;
    box-shadow: 0 0 25px black;
    background-color: var(--color-background);
    border-right: 2px solid orange;
    padding: 20px;
    color: var(--color-text);
    width: 300px;
    height: 250px;
    user-select: none;
    animation: open-anim 1s ease;
    overflow: hidden;
}

@keyframes open-anim {
  0%{width: 300px;height:0px; padding:0 20px;}
  100%{width: 300px; height: 250px; padding:20px;}
}

.settingContainer{
  display: flex;
  margin:10px;
}
.settingContainer p {
  margin-right:10px;
}

.toggleUnit{
  --toggle-bg-on: orange;
  --toggle-border-on: orange;
}

.closeBtn{
  cursor: pointer;
  position:absolute;
  top:10px;
  right:10px;
}
.closeBtn:hover{
  color:orange;
}

/* div p{
    text-align: center;
    width:160px;
    transform: translate(-140px, 50px);
} */
</style>