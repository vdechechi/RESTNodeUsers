<template>
  
  <div>

    <h2 class="subtitle is-2">Login</h2>

    <hr>

    <div class="columns is-centered">
        
        <div class="column is-half">


                <label>Email</label>
                <input type="email" placeholder="exemplo@exemplo.com" class="input" v-model="email">

                <label>Senha</label>
                <input type="password" placeholder="***********" class="input" v-model="password">
                <div v-if="error != undefined">
                    <p class="message is-danger mt-5">{{ error }}</p>
                </div>
               
                <button class="button is-primary mt-5" @click="login">Entrar</button>
    
        </div>
    </div>
       


  </div>
</template>

<script>
import axios from 'axios'

export default {

    data(){
        return{
            email: '',
            password: '',
            error: undefined,
        }
    },

    methods:{
        login(){

        axios.post("http://localhost:3000/login",{

            email:this.email,
            password: this.password

        }).then(res=>{
            const token = res.data.token
            localStorage.setItem("token", token)
            this.$router.push({name: 'home'})
        }).catch(err=>{
            const msgErro = err.response.data.err
            this.error = msgErro
        })




    }
}
}
</script>

<style>

</style>