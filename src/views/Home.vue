<template>
  <div class="home">
    <Items/>
  </div>
</template>

<script>
// @ is an alias to /src
import Items from '@/components/Items.vue'

export default {
  components: {
    Items
  }
}
</script>

<style>
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
