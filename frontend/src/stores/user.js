import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const userStore = defineStore(
  'user',
  () => {
  
    const loggedIn = ref(false);
    const accessToken = ref(null);
    const refreshToken = ref(null);

    const getLoggedIn = computed(()=>loggedIn.value);

    function login() {
      // for now, just set the logged in to true
      loggedIn.value = true;
    }
    function logout(){
      loggedIn.value = false;
    }

    return { getLoggedIn, login, logout }
  },
  {
    persist: true,
  }
)
