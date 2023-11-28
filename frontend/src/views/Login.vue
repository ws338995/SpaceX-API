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

function attempLogin(){
  axios.post(import.meta.env.VITE_BACKEND + '/login',
  {
    'username':username.value,
    'passwordHash':pass.value
  })
  .then((resp)=>{
    if(resp.status == 200){
      login();
    }
  }).catch((resp)=>{
    if(resp.status === 404){
      console.log("user not foudn")
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
        <Button text="Login" width="150px" @click="attempLogin"/>
      </div>
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
}

.form{
  width:100%;
  margin:auto;
  max-width: 400px;
}
</style>