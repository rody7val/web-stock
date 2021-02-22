<template>
  <form
    @submit.prevent="signup"
    class="form-center">
    <input
      v-model="user.username"
      name="username"
      type="text"
      autocomplete="username"
      placeholder="Nombre"
      required
    />
    <input
      autocomplete="email"
      v-model="user.email"
      name="email"
      type="email"
      placeholder="Email"
      required
    />
    <input
      v-model="user.password"
      name="password"
      type="password"
      placeholder="Contraseña"
      autocomplete="new-password"
      required
    />
    <input
      value="Registrarse"
      type="submit"
    />
  </form>
</template>

<script>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useStore } from 'vuex'

export default {
  setup() {
    const store = useStore()
    const router = useRouter()
    const user = ref({
      username: '',
      email: '',
      password: ''
    })
    const signup = () => {
      store.dispatch('signUp', {
        user: user.value,
        cb: (err, data) => {
          if(err) return store.commit('SET_ERRORS', err)
          router.push({ path: `/user/${data.user._id}` })
        }
      })
    }

    onBeforeUnmount(() => { store.commit('RESET_ERRORS') })

    return { user, signup }
  }
}
</script>