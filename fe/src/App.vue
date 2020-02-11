<template>
  <div id="app">
    <ResponseDetail v-model="currentReponse"></ResponseDetail>
  </div>
</template>

<script>
import ResponseDetail from './components/ResponseDetail'

export default {
  name: 'App',
  components: {
    ResponseDetail
  },
  computed: {
    currentReponse () {
      return this.$store.state.currentResponseId
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  /* text-align: center; */
  color: #2c3e50;
  margin-top: 60px;
}
</style>
