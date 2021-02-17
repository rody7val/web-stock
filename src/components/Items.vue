<template>
  <div v-if="$store.state.error">{{$store.state.error}}</div>
  <div v-else>
    <div v-if="$store.state.loading">Cargando...</div>
    <div v-else>
      <h3 v-if="!$store.state.items.length">
        No hay productos
      </h3>
      <ul v-else class="items">
        <li v-for="item in $store.state.items" >
          <router-link
            class="item-link"
            :to="`/item/${item._id}`">
            <b>{{item.name}}</b> - <i>${{item.price}}</i>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useStore } from 'vuex'

export default {
  setup() {
    const store = useStore()
    async function getItems() {
      try {
        store.dispatch('fetchItems', (err) => {
          if(err) store.commit('SET_ERROR', err)
        })
      } catch(err) { store.commit('SET_ERROR', err) }
    }
    onMounted(() => {
      store.commit('SET_ERROR', "")
      getItems()
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.items{
  text-align: left;
}
li{
  margin-top: 15px;
  margin-bottom: 15px;
}
.item-link{
  text-decoration: none;
}
</style>
