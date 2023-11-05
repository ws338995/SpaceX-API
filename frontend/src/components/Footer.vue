<script setup>
import { ref, onMounted } from 'vue'
</script>

<template>
  <div class="triangle">
    <p>WS338995<br/>V0.1</p>
  </div>
</template>

<style scoped>
div{
    z-index: 10;
    position:absolute;
    bottom:0;
    right:0;
    color: var(--color-text);
    width: 300px;
    height:60px;
    user-select: none;
}
div p{
    text-align: center;
    width:160px;
    transform: translate(-140px, 50px);
}
.triangle {
   width: 0px;
   height: 0px;
   border-style: solid;
   border-width: 0 0 100px 300px;
   border-color: transparent transparent var(--color-background-mute) transparent;
   transform: rotate(0deg);
}
</style>