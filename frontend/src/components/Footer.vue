<script setup>
import { ref, onMounted } from 'vue'
import SettingsDialog from './SettingsDialog.vue';
let settings = ref(false);
</script>

<template>
  <div>
    <div class="triangle">
      <p class="settingsBtn" @click="()=>{settings = !settings}">
        <span class="material-symbols-outlined">
          settings
        </span>
      </p>
    </div>
    <SettingsDialog v-if="settings" @close="settings = !settings"/>
  </div>
</template>

<style scoped>
div{
    z-index: 10;
    position:absolute;
    bottom:0;
    right:0;
    color: var(--color-text);
    width: 150px;
    height:60px;
    user-select: none;
}
div p{
    text-align: center;
    width:160px;
    transform: translate(-98px, 30px);
}
.settingsBtn{
  cursor: pointer;
  transition:0.2s;
}
.settingsBtn:hover{
  color:orange;

}
.triangle {
   width: 0px;
   height: 0px;
   border-style: solid;
   border-width: 0 0 60px 60px;
   border-color: transparent transparent var(--color-background-mute) transparent;
   transform: rotate(0deg);
}
</style>