<template>
  <q-page padding>
    <q-input class="full-width" v-model="email" float-label="Email" />
    <q-input class="full-width" v-model="password" float-label="Password" />
    <q-btn @click="authenticate({strategy, email, password})">login</q-btn>
  </q-page>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';
export default {
  data() {
    return {
      strategy: 'local',
      email: '',
      password: ''
    };
  },
  computed: {
    ...mapGetters('auth', ['accessToken'])
  },
  methods: {
    ...mapActions('auth', ['authenticate'])
  },
  watch: {
    accessToken() {
      if (this.token !== null) return this.$router.push('/');
    }
  }
};
</script>
