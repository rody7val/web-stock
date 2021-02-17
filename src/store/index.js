import { createStore } from 'vuex'
import axios from 'axios'

export default createStore({
  state: {
    loading: false,
    items: [],
    item: {},
    err: "",
  },
  mutations: {
    SET_ERROR(state, error) {
      state.error = error
    },
    SET_LOADING(state, status) {
      state.loading = status
    },
    SET_ITEMS(state, items) {
      state.items = items
    },
    SET_ITEM(state, item) {
      state.item = item
    },
    SET_LOADING(state, status) {
      state.loading = status
    },
  },
  actions: {
    fetchItems(context, cb) {
      context.commit('SET_LOADING', true)
      axios.get('http://localhost:3000/api/items')
        .then(response => {
          console.log(response.data)
          if (response.data.success) {
            context.commit('SET_ITEMS', response.data.items)
            cb(null)
          }
          context.commit('SET_LOADING', false)
        })
        .catch(err => { return cb(new Error("Error de conexión")) })
    },

    addItem(context, { item, cb }) {
      context.commit('SET_LOADING', true)
      axios.post('http://localhost:3000/api/items', item)
        .then(response => {
          //console.log(response)
          if (response.data.success) {
            context.commit('SET_ITEM', response.data.item)
            cb(null, response.data.item) //need item._id to redirect
          }
          context.commit('SET_LOADING', false)
        })
        .catch(err => { return cb(new Error("Error de conexión")) })
    },

    fetchItem(context, { id, cb }) {
      context.commit('SET_LOADING', true)
      axios.get('http://localhost:3000/api/items/'+ id)
        .then(response => {
          //console.log(response.data)
          if (response.data.success) {
            context.commit('SET_ITEM', response.data.item)
            cb(null)
          }
          context.commit('SET_LOADING', false)
        })
        .catch(err => { return cb(new Error("Error de conexión")) })
    },
  },
  modules: {
  }
})
