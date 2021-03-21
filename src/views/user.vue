<template>
  <div class="user">
    <UserId/>
  </div>
</template>

<script>
// @ is an alias to /src
import UserId from '@/components/UserId.vue'

export default {
  components: {
    UserId
  }
}
</script>

<style>
/*.user{
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
}*/
</style>
