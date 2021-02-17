<template>
  <div v-if="$store.state.error">{{$store.state.error}}</div>
  <form v-else
    @submit.prevent="add"
    class="form-center">
    <input
      v-model="item.name"
      name="name"
      type="text"
      placeholder="Nombre"
      required
    />
    <input
      v-model="item.price"
      name="price"
      type="number"
      placeholder="Precio"
      required
    />
    <input
      v-model="item.qty"
      name="qty"
      type="number"
      placeholder="Cantidad"
      required
    />
    <input
      v-model="item.desc"
      name="desc"
      type="text"
      placeholder="Descripcion"
    />
    <div v-if="$store.state.loading">Cargando...</div>
    <input v-else
      value="Agregar"
      type="submit"
    />
  </form>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useRouter, useRoute } from 'vue-router'

export default {
  setup() {
    const store = useStore()
    const router = useRouter()
    const item = ref({
      name: '',
      price: '',
      qty: '',
      desc: ''
    })
    async function add() {
      try {
        await store.dispatch('addItem', {
          item: item.value,
          cb: (err, item) => {
            if(err) store.commit('SET_ERROR', err)
            router.push({ path: `/item/${item._id}` })
          }
        })
      } catch(err) { store.commit('SET_ERROR', err) }
    }

    onMounted(() => {
      store.commit('SET_ERROR', "")
      store.commit('SET_ITEM', {})
    })

    return { item, add }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.form-center{
  width: 100%;
  max-width: 350px;
  margin: 0 auto;
  display: inline-block;
}
form{
  padding: 10px;
}
input{
  display: block;
  padding: 8px;
  margin-top: 8px;
  margin-bottom: 8px;
  width: 100%;
  font-size: 1.2rem
}
</style>
