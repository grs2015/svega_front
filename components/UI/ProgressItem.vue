<template>
  <v-list-item>
    <v-row no-gutters align="center">
      <v-col cols="4">
        {{ progress.tagTitle }}
      </v-col>
      <v-col>
        <v-slider
          hide-details
          v-model="progress.tagProgress"
          thumb-label
          @change="onChange"
          track-color="orange lighten-4"
        >
        </v-slider>
      </v-col>
    </v-row>


  </v-list-item>
</template>

<script>
export default {
  props: {
    tag: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      progress: null
    }
  },
  created() {
    this.progress = { ...this.tag }
  },
  methods: {
    onChange() {
      this.$store.commit('tag/updateProgressTag', this.progress )
    }
  }
}
</script>
