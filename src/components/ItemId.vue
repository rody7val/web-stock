<template>
  <div v-if="$store.state.error">{{$store.state.error}}</div>
  <div v-else>
    <div v-if="$store.state.loading">Cargando...</div>
    <div v-else class="item">
      <h1>{{$store.state.item.name}}</h1>
      <h2>${{$store.state.item.price}}</h2>
      <code>{{$store.state.item.qty}} en stock</code>
      <p>{{$store.state.item.desc || "Sin descripción"}}</p>
      <form @submit.prevent="deleteItem">
        <input type="submit" value="Borrar"/>
      </form>
    </div>
  </div>
</template>

<script>
import { onMounted } from 'vue'
import { useStore } from 'vuex'
import { useRouter, useRoute } from 'vue-router'

export default {
  setup() {
    const store = useStore()
    const route = useRoute()
    const router = useRouter()
    // to API GET
    async function getItem() {
      try {
        await store.dispatch('fetchItem', {
          id: route.params.id,
          cb: (err) => {
            if(err) store.commit('SET_ERROR', err)
          }
        })
      } catch(err) { store.commit('SET_ERROR', err) }
    }
     // to API DELETE
    async function deleteItem() { 
      if(confirm("seguro?")){
        try {
          await store.dispatch('deleteItem', {
            id: route.params.id,
            cb: (err) => {
              if(err) store.commit('SET_ERROR', err)
              router.push({ path: '/' })
            }
          })
        } catch(err) { store.commit('SET_ERROR', err) }
      }
    }

    onMounted(() => {
      store.commit('SET_ERROR', "")
      getItem()
    })

    return{
      deleteItem
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.item{
  text-align: left;
  padding-left: 30px
}
h1{
  color: #42b983;
  font-size: 28px;
  margin-bottom: 10px
}
h2, code{
  font-family: monospace;
  font-size: 38px;
  margin: 0;
}
code{
  font-size: 18px;
}
</style>
