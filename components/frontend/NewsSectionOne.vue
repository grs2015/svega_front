<template>
  <v-container fluid>
    <v-row no-gutters>
      <v-col cols="12">
        <v-img
          :src="getBackEndURL"
          max-height="200"
          cover
          gradient="to top, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)"
        >
          <div class="text-center mr-4 mt-16 text-h2 font-weight-bold white--text">
            Co Nowego?
          </div>
        </v-img>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      mainData: null,
      backEndURL: process.env.BACKEND_APP_URL,
    }
  },
  computed: {
    ...mapGetters('main', ['getMain']),
    getBackEndURL() {
      return this.backEndURL + this.mainData.mainImage
    },
  },
  created() {
    this.mainData = { ...this.getMain }
  }

}
</script>
