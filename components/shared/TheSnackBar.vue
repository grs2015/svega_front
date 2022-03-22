<template>
  <v-snackbar
    v-model="state"
    :color="snackbarStatus"
    transition="slide-y-reverse-transition"
    :timeout="timeout"
  >
    {{ snackbarText }}
    <template v-slot:action="{ attrs }">
      <v-btn
        text
        v-bind="attrs"
        @click="hideSnackBar()"
      >
        Close
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
import { mapGetters, mapActions, mapState } from 'vuex'

export default {
  data() {
    return {
      timeout: 1000
    }
  },
  computed: {
    ...mapGetters(['snackbarText', 'snackbarStatus']),
    state: {
      get() {
        return this.$store.state.snackbar.show
      },
      set(value) {
        this.$store.commit('hideSnackBar')
      }
    }
  },
  methods: {
    ...mapActions(['hideSnackBar'])
  }
}
</script>
