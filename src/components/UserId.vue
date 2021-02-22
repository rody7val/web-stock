<template>
  <div v-if="$store.state.user">
    <h2>${{$store.state.user.email}}</h2>
    <code>{{$store.state.user.created}}</code>
    <h3>{{$store.state.user.username}}</h3>
  </div>
</template>

<script>
import { onMounted, onBeforeUnmount } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useStore } from 'vuex'

export default {
  setup() {
    const store = useStore()
    const route = useRoute()
    const router = useRouter()
    const getUser = () => {
      store.dispatch('fetchUser', {
        id: route.params.id,
        cb: (err, user) => {
          if(err) return store.commit('SET_ERRORS', err)
          store.commit('SET_USER', user)
        }
      })
    }

    onMounted(getUser)

    onBeforeUnmount(() => {
      store.commit('RESET_ERRORS')
      store.commit('SET_USER', false)
    })
  }
}
</script>
