<template>
  <form
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
    <input
      value="Agregar"
      type="submit"
    />
  </form>
</template>

<script>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useStore } from 'vuex'

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
    const add = () => {
      store.dispatch('addItem', {
        item: item.value,
        cb: (err, item) => {
          if(err) return store.commit('SET_ERRORS', err)
          router.push({ path: `/item/${item._id}` })
        }
      })
    }

    onBeforeUnmount(() => { store.commit('RESET_ERRORS') })

    return { item, add }
  }
}
</script>
