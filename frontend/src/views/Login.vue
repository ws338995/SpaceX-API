<script setup>
import axios from 'axios';

import { ref } from 'vue';

import TextInput from '../components/TextInput.vue';
import Button from '../components/Button.vue';

import { userStore } from '../stores/user';
import router from '../router/index';


const usr = userStore();

const username = ref('');
const pass = ref('');

const error = ref(null);

function showError(msg){
  error.value = msg;
}
function closeError(){
  error.value = null;
}

function attempLogin(){
  axios.post(import.meta.env.VITE_BACKEND + '/login',
  {
    'username':username.value,
    'password':pass.value
  })
  .then((resp)=>{
    console.log(resp)
    if(resp.status == 200){
      login();
    }
  }).catch((resp)=>{
    if(resp.response.status === 404){
      showError("No user with this username found!")
    }
    else if(resp.response.status === 401){
      showError("Incorrect Password")
    }else{
      showError(resp.response.status + " - " + resp.response.data)
    }
  })
}

function login(){
  usr.login();
  router.push({ path: '/map' })
}
</script>

<template>
  <main>

    <div class="loginBox">
      This is a private club!
      <div class="form">
        <TextInput @change="(v)=>{username = v}" type="text" placeholder="Username" icon="person"/>
        <TextInput @change="(v)=>{pass = v}" type="password" placeholder="Password" icon="key"/>
        <div style="display:flex;justify-content: center;align-items: center;">
          <Button text="Login" width="150px" @click="attempLogin"/>
          <p>or</p>
          <Button text="Register" width="150px" @click="router.push({ path: '/register' })"/>
        </div>
      </div>
    </div>

    <div v-if="error" class="errorBox">
      <p>{{ error }}</p>
      <span @click="closeError" class="material-symbols-outlined" style="color:darkred">
        close
      </span>
    </div>
  </main>
</template>

<style scoped>
.loginBox{
  position: absolute;
  width: 90vw;
  max-width: 700px;
  height:500px;
  margin:auto;
  padding: 10px;
  border-top:2px solid orange;
  border-bottom:2px solid orange;
  background-color: rgba(12,12,12,0.7);
  left:0;right:0;top:0;bottom: 0;
  text-align: center;
  overflow: hidden;
  animation: open 2s ease;
}

@keyframes open{
  0%{max-width: 0;padding:0;height: 0;}
  40%{max-width: 700px;padding:0;height: 0;}
  100%{max-width: 700px;padding:10px;height: 500px;}
  
}

.form{
  width:100%;
  margin:auto;
  max-width: 400px;
}

.errorBox{
  position: absolute;
  bottom:10px;
  left:0;right:0;
  margin: auto;
  padding:10px;
  width: fit-content;
  background-color: red;
  color:white;
  border-radius: 6px;
}
.errorBox *{
  display: inline-block;
  vertical-align: top;
}
.errorBox span:hover{
  transition: 0.2s;
  cursor: pointer;
  color:white !important;
}
</style>