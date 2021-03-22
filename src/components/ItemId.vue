<template>
  <div class="my-4 row">
    <div class="col-12">
      <!--card item-->
      <div
        v-if="$store.state.item"
        class="card mb-3"
        style=""
      >
        <div class="row no-gutters">
          <div class="col-md-6 col-sm-6">
            <img
              class="img-fluid img-center"
              :src="$store.state.item.img"
              :alt="$store.state.item.name"
            />
          </div>
          <div class="col-md-6 col-sm-6">
            <div class="card-body">
              <!--name-->
              <h2 class="card-title">{{$store.state.item.name}}</h2>
              <!--price-->
              <h3 class="card-title">
                <code>$ {{$store.state.item.price}}</code>
              </h3>
              <!--created-->
              <p class="card-text mb-0" v-if="$store.state.auth">
                <small class="text-muted">
                  {{getDate($store.state.item.created)}}
                </small>
              </p>
              <!--desc-->
              <p class="card-text">{{$store.state.item.desc || ""}}</p>
              <!--actions-->
              <form @submit.prevent="deleteItem" v-if="$store.state.auth">
                <input
                  class="btn btn-sm btn-danger"
                  type="submit"
                  value="Borrar"/>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
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
    const getDate = (unixDate) => {
      return new Date(unixDate).toLocaleString("es-AR")
    }

    onMounted(getItem)
    onBeforeUnmount(() => {
      store.commit('RESET_ERRORS')
      store.commit('SET_ITEM', false)
    })

    return { deleteItem, getDate }
  }
}
</script>
