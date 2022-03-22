<template>
  <v-container fluid class="section-container">
    <v-carousel height="300">
      <v-carousel-item
        v-for="(image, index) in sectionImages"
        :key="index"
        transition="fade-transition"
        :src="getBackEndURL(image)"
      >
      </v-carousel-item>
    </v-carousel>
    <!-- <v-card
      width="100%"
      flat
    >
      <v-card-title>{{ data.blogTitle }}</v-card-title>
      <v-card-text>
        <div
          class="list"
          v-for="(item, index) in sectionDescription"
          :key="index"
        >
          {{ item }}
        </div>
      </v-card-text>
    </v-card> -->
  </v-container>
</template>

<script>
export default {
  props: {
    data: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      backEndURL: process.env.BACKEND_APP_URL,
    }
  },
  computed: {
    sectionImages() {
      return this.data.split(',')
    }
  },
  methods: {
    getBackEndURL(image) {
      return this.backEndURL + image
    }
  }
}
</script>
