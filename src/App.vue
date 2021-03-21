<template>
  <nav class="navbar navbar-expand navbar-light bg-light">
    <!-- menu left public-->
    <ul class="navbar-nav mr-auto">
      <li class="nav-item">
        <router-link class="nav-link" to="/">Productos</router-link>
      </li>
      <li class="nav-item">
        <router-link class="nav-link" to="/create">Agregar</router-link>
      </li>
    </ul>
    <!-- menu right public -->
    <ul v-if="!$store.state.auth" class="navbar-nav">
      <li class="nav-item">
        <router-link class="nav-link" to="/signup">Registrarse</router-link>
      </li>
      <li class="nav-item">
        <router-link class="nav-link" to="/login">Entrar</router-link>
      </li>
    </ul>
    <!-- menu right auth -->
    <ul v-else class="navbar-nav">
      <li class="nav-item active">
        <router-link class="nav-link" :to="'/user/'+$store.state.auth._id">
          {{$store.state.auth.username}}
        </router-link>
      </li>
      <li class="nav-item">
        <router-link class="nav-link" to="/logout">Salir</router-link>
      </li>
    </ul>
  </nav>
  <!-- load -->
  <div v-if="$store.state.loading" class="load-container bg-light">
    <div class="vertical-center">
      <div
        style="width: 4rem; height: 4rem;"
        class="spinner-border text-success horizontal-center"
        role="status"
      >
        <span class="sr-only">Cargando...</span>
      </div>
    </div>
  </div>
  <!-- errors -->
  <ul v-if="$store.state.errors.length">
    <li v-for="err in $store.state.errors">
      {{err}}
    </li>
  </ul>
  <!-- views -->
  <div class="container">
    <router-view/>
  </div>
</template>

<script>
import '@/assets/index.css'
//import '@/assets/form.css'
import { onMounted } from 'vue'
import { useStore } from 'vuex'
import { VueEasyJwt } from "vue-easy-jwt";
const jwt = new VueEasyJwt();

export default {
  setup() {
    const store = useStore()
    const auth = id => {
      store.dispatch('fetchUser', {
        id: id,
        cb: (err, user) => {
          if(err) return store.commit('SET_ERRORS', err)
          store.commit('SET_AUTH', user)
        }
      })
    }
    const getToken = () => {
      let token = localStorage.getItem('token')
      if (!store.state.auth && token) {
        let payload = jwt.decodeToken(token)
        let isExpired = jwt.isExpired(token)
        if (payload && !isExpired) {
          auth(payload.sub)
        }
      }
    }

    onMounted(getToken)
  }
}
</script>
