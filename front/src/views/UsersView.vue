<template>

  
  <div class="columns is-centered">

    <div v-if="error != undefined">
                    <p class="message is-danger mt-5">{{ error }}</p>
                </div>
    <div>
      <h2 class="subtitle is-2">Painel adm</h2>
      <table class="table">
        <thead>
          <tr>
            <th class="has-text-centered">Nome</th>
            <th class="has-text-centered" >Email</th>
            <th class="has-text-centered">Cargo</th>
            <th class="has-text-centered">Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.id">
            <td>{{ user.name }}</td>
            <td>{{ user.email }}</td>
            <td>{{ user.role | processRole }}</td>
            <td>

              <router-link :to="{name: 'userEdit', params:{id: user.id}}"> <button class="button is-success">Editar</button></router-link>
             
              <button class="button is-warning " @click="showModalUser(user.id)">Excluir</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div :class="{modal:true, 'is-active': showModal}">
  <div class="modal-background"></div>
  <div class="modal-content">
   
    <div class="card">
  <div class="card-content">
    <div class="content">
      Confirmar deleção de usuário ?
      <br />
    </div>
  </div>
  <footer class="card-footer">
    <a href="#" class="card-footer-item" @click='deleteUser' >Confirmar</a>
    <a href="#" class="card-footer-item" @click="hideModal">Cancelar</a>
  </footer>
</div>
    
  </div>
  <button class="modal-close is-large" aria-label="close" @click="hideModal"></button>
</div>
    
  </div>
  

</template>


<script>


import axios from 'axios';

export default {
  data() {
    return {
      users: [],
      showModal: false,
      deleteUserId: -1,
      msgUsuario: '',
      error: undefined
    };
  },
  filters: {
    processRole(value) {
      if (value === 0) {
        return "Usuario";
      } else if (value === 1) {
        return "Admin";
      }
    }
  },
  created() {
    const req = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem('token')
      }
    };

    axios.get("http://localhost:3000/user", req)
      .then(res => {
        this.users = res.data;
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
    console.log("OLA");
  },
  methods:{
    hideModal(){
      this.showModal = false
    },
    showModalUser(id){
      this.deleteUserId = id
      this.showModal = true

    },
    deleteUser(){

      const req = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem('token')
      }
    }

      axios.delete('http://localhost:3000/user/'+this.deleteUserId, req).then(res=>{
        console.log(res)
        this.showModal = false
        axios.get("http://localhost:3000/user", req)
      .then(res => {
        this.users = res.data;
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
        

      }).catch(err=>{
        const msgUsuario = err.response.data.err
        this.error = msgUsuario
        this.showModal = false

      })
    }
  }

};
</script>

<style>
.columns {
  justify-content: center;
  padding: 20px;
}

.table {
  width: 100%;
  margin-top: 20px;
}

.button {
  margin-right: 5px;
}

.table {
  width: 100%;
}
</style>
