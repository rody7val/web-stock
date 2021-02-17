<template>
  <div id="nav">
    <router-link to="/">Productos</router-link> |
    <router-link to="/create">Agregar</router-link>
  </div>
  <router-view/>
</template>

<style>
*{box-sizing: border-box;}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}
#nav a {
  font-size: 18px;
  font-weight: bold;
  text-decoration: none;
  color: #2c3e50;
}
#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
