<template>
  <v-container fluid class="pt-16">
    <v-img
      :src="getBackEndURL(parallaxImages[1])"
      gradient="to top, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)"
      height="600px"
    >
      <section-header :data="dark">
        <template #title>
          {{ data.section.sectionTitle }}
        </template>
      </section-header>
      <contact-list :data="data.main"></contact-list>
    </v-img>
  </v-container>
</template>

<script>
import SectionHeader from '@/components/frontend/SectionHeader.vue'
import ContactList from '@/components/frontend/ContactList.vue'

export default {
  components: { SectionHeader, ContactList },
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      backEndURL: process.env.BACKEND_APP_URL,
      parallaxImages: [],
      dark: true
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
