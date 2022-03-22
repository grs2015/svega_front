<template>
  <v-container fluid class="pt-16">
    <v-img
      :src="getBackEndURL(parallaxImages[0])"
      gradient="to top, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.8)"
      height="500px"
    >
      <section-header>
        <template #title>
          {{ data.section.sectionTitle }}
        </template>
        <template #description>
          {{ data.section.sectionDescription }}
        </template>
      </section-header>
      <offer-list :data="data.offers"></offer-list>
    </v-img>
  </v-container>
</template>

<script>
import SectionHeader from '@/components/frontend/SectionHeader.vue'
import OfferList from '@/components/frontend/OfferList.vue'

export default {
  components: { SectionHeader, OfferList },
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      backEndURL: process.env.BACKEND_APP_URL,
      parallaxImages: []
    }
  },
  created() {
    this.parallaxImages = this.data.main.mainParallaxImages.split(',')
  },
  methods: {
    getBackEndURL(imageLink) {
      return this.backEndURL + imageLink
    }
  }
}
</script>

<style scoped>
  .image-opacity {
    position: relative;
  }
  .image-opacity::before {
    position: absolute;
    display: block;
    left: 0;
    top: 0;
    width: 100%;
    height: 500px;
    content: '';
    background-color: rgba(255, 255, 255, 0.7);
    z-index: 1;
  }
</style>
