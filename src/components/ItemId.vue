<template>
  <div v-if="$store.state.item">
    <h1>{{$store.state.item.name}}</h1>
    <h2>${{$store.state.item.price}}</h2>
    <code>{{$store.state.item.qty}} en stock</code>
    <p>{{$store.state.item.desc || "Sin descripción"}}</p>
    <img :src="$store.state.item.img">
    <form @submit.prevent="deleteItem">
      <input type="submit" value="Borrar"/>
    </form>
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
    const getItem = () => {
        store.dispatch('fetchItem', {
          id: route.params.id,
          cb: (err, item) => {
            console.log(item)
            if(err) return store.commit('SET_ERRORS', err)
            store.commit('SET_ITEM', item)
          }
        })
    }
    const deleteItem = () => { 
      if (confirm("seguro?")) {
        store.dispatch('deleteItem', {
          id: route.params.id,
          cb: err => {
            if(err) return store.commit('SET_ERRORS', err)
            router.push({ path: '/' })
          }
        })
      }
    }

    onMounted(getItem)
    onBeforeUnmount(() => {
      store.commit('RESET_ERRORS')
      store.commit('SET_ITEM', false)
    })

    return { deleteItem }
  }
}
</script>
