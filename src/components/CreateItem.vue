<template>
  <div class="my-4 row">
    <div class="col-md-6 col-6">
      <form class="was-validated" @submit.prevent="add">
        <!--img-->
        <label class="mb-1" for="img">Imagen</label>
        <div class="custom-file mb-1">
          <input
            id="img"
            name="img"
            type="file"
            class="custom-file-input"
            @change="show"
            required
          />
          <label class="custom-file-label" for="img">Elegir imagen...</label>
        </div>
        <!--name-->
        <div class="mb-1">
          <label class="mb-1" for="name">Nombre</label>
          <input
            id="name"
            name="name"
            type="text"
            class="form-control is-valid"
            v-model="item.name"
            placeholder="Escribir..."
            required
          />
        </div>
        <!--price-->
        <div class="mb-1">
          <label class="mb-1" for="price">Precio</label>
          <input
            id="price"
            name="price"
            type="number"
            class="form-control is-valid"
            v-model="item.price"
            placeholder="Escribir..."
            required
          />
        </div>
        <!--qty-->
        <div class="mb-1">
          <label class="mb-1" for="qty">Cantidad</label>
          <input
            id="qty"
            name="qty"
            type="number"
            class="form-control is-valid"
            v-model="item.qty"
            placeholder="Escribir..."
            required
          />
        </div>
        <!--desc-->
        <div class="mb-1">
          <label class="mb-1" for="desc">Descripción</label>
          <input
            id="desc"
            name="desc"
            type="text"
            class="form-control is-valid"
            v-model="item.desc"
            placeholder="Escribir..."
          />
        </div>
        <!--submit-->
        <input
          class="mt-2 btn btn-primary"
          value="Agregar"
          type="submit"
        />
      </form>
    </div>
    <div class="col-md-6 col-6">
      <img class="img-center img-fluid" :src="item.img"/>
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
    const item = ref({
      name: '',
      price: '',
      qty: '',
      desc: '',
      img: ''
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
    const show = (e) => {
      var file = e.target.files[0]
      var reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => {
        item.value.img = reader.result
      }
    }

    onBeforeUnmount(() => { store.commit('RESET_ERRORS') })

    return { item, add , show }
  }
}
</script>
