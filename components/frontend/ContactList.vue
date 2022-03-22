<template>
  <div class="section-container pt-12">
    <v-row align="start">
      <v-col cols="6">
        <contact-data :data="data"></contact-data>
      </v-col>
      <v-col cols="6">
        <contact-form></contact-form>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import ContactData from '@/components/frontend/ContactData.vue'
import ContactForm from '@/components/frontend/ContactForm.vue'

export default {
  components: { ContactData, ContactForm },
  props: {
    data: {
      type: Object,
      required: true
    }
  },
}
</script>
