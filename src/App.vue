<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  name: 'App',
  created() {
    const token = this.$q.localStorage.get.item('feathers-jwt');
    if (token === null || token === undefined) return;
    this.$store.dispatch('auth/authenticate', token);
  }
};
</script>

<style>
</style>
