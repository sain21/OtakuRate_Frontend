<script setup lang="ts">
import { ref } from 'vue'
import {getAuth, signInWithEmailAndPassword} from 'firebase/auth'
import {useRouter} from 'vue-router'

const email = ref('')
const password = ref('')
const errorMsg = ref('')
const router = useRouter()

const register = () => {
  const auth = getAuth();
  signInWithEmailAndPassword(getAuth(), email.value, password.value)
    .then((data) =>{
      console.log("Successfully signed in")
      router.push({path: '/feed'})
    })
    .catch((error) => {
      console.log(error.code);
      switch(error.code){
        case 'auth/invalid-email':
          errorMsg.value = 'Invalid Email'
          break;
        case 'auth/user-not-found':
          errorMsg.value = 'User not found'
          break;
        case 'auth/wrong-password':
          errorMsg.value = 'Wrong Password'
          break;
        default:
          errorMsg.value = 'Email or Password is incorrect';
          break
      }

    })
};
const signInWithGoogle = () => {
};
</script>

<template>Sign In
  <p><input type="text" placeholder="Email" v-model= "email"/></p>
  <p><input type="password" placeholder="Password" v-model= "password"/></p>
  <p>v-if="errorMsg">{{errorMsg}} </p>
  <p><button @click="register">Submit</button></p>
  <p><button @click="signInWithGoogle">Sign in With Google</button></p>
</template>

<style scoped>

</style>