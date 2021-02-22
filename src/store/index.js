import { createStore } from 'vuex'
import axios from 'axios'

export default createStore({
  state: {
    loading: false,
    items: [],
    item: false,
    auth: false,
    user: false,
    errors: [],
  },

  mutations: {
    SET_LOADING(state, status) { state.loading = status },
    SET_ITEMS(state, items) { state.items = items },
    SET_ITEM(state, item) { state.item = item },
    SET_AUTH(state, auth) { state.auth = auth },
    SET_USER(state, user) { state.user = user },
    RESET_ERRORS(state) { state.errors = [] },
    SET_ERRORS(state, data) {
      //console.log(data)
      state.errors = []
      if (data.errors) {
        Object.keys(data.errors).map((err, key) => {
          state.errors = state.errors.concat(`${data.errors[err].message}`)
        })
      } else if (data.message) {
        state.errors = state.errors.concat(data.message)
      }
    },
  },

  actions: {
    //items
      //GET /api/items
      fetchItems(context, cb) {
        context.commit('SET_LOADING', true)
        axios.get('http://localhost:3000/api/items')
          .then(response => {
            context.commit('SET_LOADING', false)
            if (!response.data.success) return cb(response.data.error)
            cb(null, response.data.items)
          })
          .catch(err => {
            context.commit('SET_LOADING', false)
            cb(new Error(err))
          })
      },
      //GET /api/items/:id
      fetchItem(context, { id, cb }) {
        context.commit('SET_LOADING', true)
        axios.get('http://localhost:3000/api/items/'+ id)
          .then(response => {
            context.commit('SET_LOADING', false)
            if (!response.data.success) return cb(response.data.error)
            context.commit('SET_ITEM', response.data.item)
            cb(null, response.data.item)
          })
          .catch(err => {
            context.commit('SET_LOADING', false)
            cb(new Error(err))
          })
      },
      //POST /api/items (need token header)
      addItem(context, { item, cb }) {
        context.commit('SET_LOADING', true)
        let options = {
          method: 'post',
          url: 'http://localhost:3000/api/items',
          data: item,
          headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
        }
        axios(options)
          .then(response => {
            context.commit('SET_LOADING', false)
            if (!response.data.success) return cb(response.data.error)
            context.commit('SET_ITEM', response.data.item)
            cb(null, response.data.item) //need item._id to redirect
          })
          .catch(err => {
            context.commit('SET_LOADING', false)
            cb(new Error(err))
          })
      },
      //DELETE /api/items/:id (need token header)
      deleteItem(context, { id, cb }) {
        context.commit('SET_LOADING', true)
        let options = {
          method: 'delete',
          url: 'http://localhost:3000/api/items/'+ id,
          headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
        }
        axios(options)
          .then(response => {
            context.commit('SET_LOADING', false)
            if (!response.data.success) return cb(response.data.error)
            cb(null)
          })
          .catch(err => {
            context.commit('SET_LOADING', false)
            cb(new Error(err))
          })
      },
    //users
    //GET /api/users/:id
    fetchUser(context, { id, cb }) {
      context.commit('SET_LOADING', true)
      axios.get('http://localhost:3000/api/users/'+ id)
        .then(response => {
          context.commit('SET_LOADING', false)
          if (!response.data.success) return cb(response.data.error)
          cb(null, response.data.user)
        })
        .catch(err => {
          context.commit('SET_LOADING', false)
          cb(new Error(err))
        })
    },
    //POST /api/signup
    signUp(context, { user, cb }) {
      context.commit('SET_LOADING', true)
      axios.post('http://localhost:3000/api/signup', user)
        .then(response => {
          context.commit('SET_LOADING', false)
          if (!response.data.success) return cb(response.data.error)
          //autenticar
          localStorage.setItem("token", response.data.token)
          context.commit('SET_AUTH', response.data.user)
          context.commit('RESET_ERRORS')
          cb(null, response.data) //necesario user._id para redireccionar
        })
        .catch(err => {
          context.commit('SET_LOADING', false)
          cb(new Error(err))
        })
    },
    //POST /api/login
    logIn(context, { user, cb }) {
      context.commit('SET_LOADING', true)
      axios.post('http://localhost:3000/api/login', user)
        .then(response => {
          context.commit('SET_LOADING', false)
          if (!response.data.success) return cb(response.data.error)
          //autenticar
          console.log(response.data)
          localStorage.setItem("token", response.data.token)
          context.commit('SET_AUTH', response.data.user)
          context.commit('RESET_ERRORS')
          cb(null, response.data) //necesario user._id para redireccionar
        })
        .catch(err => {
          context.commit('SET_LOADING', false)
          cb(new Error(err))
        })
    },

  },

  modules: {
  }
})
