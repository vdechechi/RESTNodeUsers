<template>
    <div>
      <h2 class="subtitle is-2">Edição de Usuario</h2>
      <hr>
      <div class="columns is-centered">
        <div class="column is-half">
          <label>Nome</label>
          <input type="text" placeholder="Digite o nome do usuário" class="input" v-model="name" />
  
          <label>Email</label>
          <input type="email" placeholder="exemplo@exemplo.com" class="input" v-model="email" />
  
          <label>Função</label>
          <div class="select is-fullwidth">
            <select v-model="role">
              <option :value="0">Usuario</option>
              <option :value="1">Admin</option>
            </select>
          </div>
  
          <div v-if="error != undefined">
            <p class="message is-danger mt-5">{{ error }}</p>
          </div>
  
          <button class="button is-primary mt-5" @click="update">Editar</button>
        </div>
      </div>
    </div>
  </template>

<script>
import axios from 'axios'

export default {

    created(){
        
        const req = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem('token')
      }
    };

        axios.get("http://localhost:3000/user/" + this.$route.params.id, req).then(res=>{

            this.name = res.data.name
            this.email = res.data.email
            this.id = res.data.id
            this.role = res.data.role

            console.log(res)
        }).catch(err=>{
            console.log(err.response)
            this.$router.push({name: "users"})
        })
    },

    data(){
        return{
            name: '',
            email: '',
            id: -1,
            role: 0,
            error: undefined,
        
        
        }
    },

    methods:{
        update(){

            const req = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem('token')
      }
    };

        axios.put("http://localhost:3000/user",{

            name: this.name,
            email:this.email,
            id: this.id,
            role: this.role

        }, req).then(res=>{
            console.log(res)
           this.$router.push({name: "users"})
        }).catch(err=>{
            const msgUsuario = err.response.data.err
            this.error = msgUsuario
        })




    }
}
}
</script>

<style>
/* Ajuste a largura do select box para alinhar com os outros elementos do formulário */
.select.is-fullwidth select {
  width: 100%;
}
</style>