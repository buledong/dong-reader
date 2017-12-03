<template>
  <div id="app">
    <d-header></d-header>
    <tab></tab>
    <router-view/>
  </div>
</template>
<script>
  import DHeader from 'components/d-header/d-header';
  import Tab from 'components/tab/tab';
  export default {
    name: 'app',
    components: {
      DHeader,
      Tab
    }
  };
</script>
<style>
</style>
