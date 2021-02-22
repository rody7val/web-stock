<template>
  <ul class="items">
    <div v-if="!$store.state.items.length">No hay productos</div>
    <li v-for="item in $store.state.items" >
      <router-link
        class="item-link"
        :to="`/item/${item._id}`">
        <b>{{item.name}}</b> - <i>${{item.price}}</i>
      </router-link>
    </li>
  </ul>
</template>

<script>
import { onMounted, onBeforeUnmount } from 'vue'
import { useStore } from 'vuex'

export default {
  setup() {
    const store = useStore()
    const getItems = () => {
      store.dispatch('fetchItems', (err, items) => {
        if(err) return store.commit('SET_ERRORS', err)
        store.commit('SET_ITEMS', items)
      })
    }

    onMounted(getItems)

    onBeforeUnmount(() => {
      store.commit('RESET_ERRORS')
      store.commit('SET_ITEMS', [])
    })

  }
}
</script>
