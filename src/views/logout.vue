<template>
  <div class="logout">
    Cerrando sesión...
  </div>
</template>

<script>
import { onMounted } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
export default {
  setup() {
    const router = useRouter()
  	const store = useStore()

    onMounted(() => {
      store.commit('SET_AUTH', false)
      localStorage.removeItem('token')
      router.push({ path: '/' })
    })
  }
}
</script>
