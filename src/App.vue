<template>
  <div class="nav">
    <div class="nav-left">
      <router-link to="/">Productos</router-link> |
      <router-link to="/create">Agregar</router-link>
    </div>

    <div v-if="!$store.state.auth" class="nav-right">
      <router-link to="/signup">
        Registrarse
      </router-link> |
      <router-link to="/login">
        Entrar
      </router-link>
    </div>
    <div v-else class="nav-right">
      <router-link :to="'/user/'+$store.state.auth._id">
        {{$store.state.auth.username}}
      </router-link> |
      <router-link to="/logout">
        Salir
      </router-link>
    </div>
  </div>

  <div v-if="$store.state.loading">Cargando...</div>

  <ul v-if="$store.state.errors.length">
    <li v-for="err in $store.state.errors">
      {{err}}
    </li>
  </ul>

  <router-view/>
</template>

<script>
import '@/assets/index.css'
import '@/assets/form.css'
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
