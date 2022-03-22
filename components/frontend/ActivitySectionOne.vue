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
          <div class="text-center mr-4 mt-16 text-h5 font-weight-normal white--text">
            {{ data.activityTitle }}
          </div>
          <div class="text-center mr-4 text-h6 font-weight-light white--text">
            {{ data.activitySubtitle }}
          </div>

        </v-img>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      backEndURL: process.env.BACKEND_APP_URL,
    }
  },
  computed:{
    getBackEndURL() {
      return this.backEndURL + this.data.activityImage
    },
  }
}
</script>



