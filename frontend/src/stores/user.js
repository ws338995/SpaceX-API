import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const userStore = defineStore(
  'user',
  () => {
  
    const loggedIn = ref(false);
    const accessToken = ref(null);
    const refreshToken = ref(null);

    const unitsWeight = ref('kg')
    const unitsSize = ref('meters')
    const unitsForce = ref('kN')

    const getLoggedIn = computed(()=>loggedIn.value);

    const getUnitsWeight = computed(()=>unitsWeight.value);
    const getUnitsForce = computed(()=>unitsForce.value);
    const getUnitsSize = computed(()=>unitsSize.value);

    function login() {
      // for now, just set the logged in to true
      loggedIn.value = true;
    }
    function logout(){
      loggedIn.value = false;
    }
    function toggleUnitsWeight(){
      if(unitsWeight.value == 'kg'){
        unitsWeight.value = 'lb';
      }else{
        unitsWeight.value = 'kg';
      }
    }
    function toggleUnitsSize(){
      if(unitsSize.value == 'meters'){
        unitsSize.value = 'feet';
      }else{
        unitsSize.value = 'meters';
      }
    }
    function toggleUnitsForce(){
      if(unitsForce.value == 'kN'){
        unitsForce.value = 'lbf';
      }else{
        unitsForce.value = 'kN';
      }
    }

    return { 
      getLoggedIn, 
      login, 
      logout, 
      toggleUnitsWeight, getUnitsWeight,
      toggleUnitsForce, getUnitsForce,
      toggleUnitsSize, getUnitsSize,
    }
  },
  {
    persist: true,
  }
)
