<template>
  <div class="my-4 row">
    <div class="col-md-6 col-sm-8 col-xs-12 img-center">
      <div class="list-group list-group-flush">
        <div v-if="!$store.state.items.length">No hay productos</div>
        <router-link
          v-for="item in $store.state.items"
          class="list-group-item d-flex justify-content-between align-items-center list-group-item-action"
          :to="`/item/${item._id}`"
        >
          {{item.name}}
          <span class="badge badge-primary badge-pill">$ {{item.price}}</span>
        </router-link>
      </div>
    </div>
    <div class="col-xs-12"></div>
  </div>
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
