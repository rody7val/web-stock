<template>
  <div class="my-4 row">
    <div class="col-md-6 col-6">
      <form @submit.prevent="login" class="form-center">
        <!--email-->
        <div class="mb-2">
          <label class="mb-1" for="email">Correo</label>
          <input
            id="email"
            name="email"
            type="email"
            autocomplete="email"
            class="form-control is-valid"
            v-model="user.email"
            placeholder="Ej: jose@perez.com"
            required
          />
        </div>
        <!--password-->
        <div class="mb-2">
          <label class="mb-1" for="password">Contraseña</label>
          <input
            id="password"
            name="password"
            type="password"
            autocomplete="new-password"
            class="form-control is-valid"
            v-model="user.password"
            placeholder="Ej: j0s3p3r3z"
            required
          />
        </div>
        <!--submit-->
        <input
          class="mt-2 btn btn-primary"
          value="Entrar"
          type="submit"
        />
      </form>
    </div>
    <div class="col-md-6 col-6"></div>
  </div>
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
      email: '',
      password: ''
    })
    const login = () => {
      store.dispatch('logIn', {
        user: user.value,
        cb: (err, data) => {
          if(err) return store.commit('SET_ERRORS', err)
          router.push({ path: `/user/${data.user._id}` })
        }
      })
    }

    onBeforeUnmount(() => {
      store.commit('RESET_ERRORS')
    })

    return { user, login }
  }
}
</script>
