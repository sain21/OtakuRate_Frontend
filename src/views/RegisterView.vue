<script setup lang="ts">
import { ref } from 'vue'
import {getAuth, createUserWithEmailAndPassword,
  GoogleAuthProvider,signInWithPopup} from 'firebase/auth'
import {useRouter} from 'vue-router'

const email = ref('')
const password = ref('')
const router = useRouter()

const register = () => {
  const auth = getAuth();
  createUserWithEmailAndPassword(getAuth(), email.value, password.value)
    .then((data) =>{
      console.log("Successfully registered")
      router.push({path: '/feed'})
    })
    .catch((error) => {
      console.log(error.code);
      alert(error.message);
    })
};
const signInWithGoogle = () => {
  const provider = new GoogleAuthProvider();
  signInWithPopup(getAuth(), provider)
    .then((result) => {
      console.log(result.user);
      router.push({path: '/feed'});
    })
    .catch((error) => {
      console.log(error.code);
      alert(error.message);
    });
};
</script>

<template>
<h1>Create an Account</h1>
  <p><input type="text" placeholder="Email" v-model= "email"/></p>
  <p><input type="password" placeholder="Password" v-model= "password"/></p>
  <p><button @click="register">Submit</button></p>
  <p><button @click="signInWithGoogle">Sign in With Google</button></p>
</template>

<style scoped>

</style>