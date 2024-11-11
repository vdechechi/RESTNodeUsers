<template>
  
  <div>

    <h2 class="subtitle is-2">Registro de Usuario</h2>

    <hr>

    <div class="columns is-centered">
        
        <div class="column is-half">

            <label>Nome</label>
                <input type="text" placeholder="Digite o nome do usuário" class="input" v-model="name">

                <label>Email</label>
                <input type="email" placeholder="exemplo@exemplo.com" class="input" v-model="email">

                <label>Senha</label>
                <input type="password" placeholder="***********" class="input" v-model="password">
                <div v-if="error != undefined">
                    <p class="message is-danger mt-5">{{ error }}</p>
                </div>
               
                <button class="button is-primary mt-5" @click="register">Cadastrar</button>
    
        </div>
    </div>
       


  </div>
</template>

<script>
import axios from 'axios'

export default {

    data(){
        return{
            name: '',
            email: '',
            password: '',
            error: undefined,
        
        
        }
    },

    methods:{
        register(){

        axios.post("http://localhost:3000/user",{

            name: this.name,
            email:this.email,
            password: this.password

        }).then(res=>{
            console.log(res)
           this.$router.push({name: "home"})
        }).catch(err=>{
            const msgUsuario = err.response.data.err
            this.error = msgUsuario
        })




    }
}
}
</script>

<style>

</style>