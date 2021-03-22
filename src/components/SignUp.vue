<template>
  <div class="my-4 row">
    <div class="col-md-6 col-sm-8 col-xs-12 img-center">
      <div class="card">
        <h5 class="card-header">Registrarse</h5>
        <div class="card-body">
          <form @submit.prevent="signup" class="was-validated">
            <!--username-->
            <div class="mb-2">
              <label class="mb-1" for="username">Nombre de usuario</label>
              <input
                id="username"
                name="username"
                type="text"
                autocomplete="username"
                class="form-control is-valid"
                v-model="user.username"
                placeholder="Ej: jperez"
                required
              />
            </div>
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
              value="Registrarme"
              type="submit"
            />
          </form>
        </div>
      </div>
    </div>
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