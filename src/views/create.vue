<template>
  <div class="create">
    <CreateItem/>
  </div>
</template>

<script>
// @ is an alias to /src
import CreateItem from '@/components/CreateItem.vue'

export default {
  components: {
    CreateItem
  }
}
</script>

<style type="text/css">
input{
	display: block;
	padding: 8px;
	margin-top: 8px;
	margin-bottom: 8px;
	width: 100%;
  font-size: 1.2rem
}
</style>
