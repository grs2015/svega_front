<template>
  <div class="section-container pt-16">
    <section-header>
      <template #title>
        {{ data.section.sectionTitle }}
      </template>
      <template #description>
        {{ data.section.sectionDescription }}
      </template>
    </section-header>
    <v-row class="pt-16 pb-8">
      <v-col v-for="(benefit, index) in data.benefits"
        :key="index"
        cols="4"
      >
        <div class="text-left text-h5 font-weight-light grey--text text--darken-2">
          {{ benefit.benefitTitle }}
        </div>
        <div class="text-left text-body-2 font-weight-light grey--text text--darken-2 mt-3">
          {{ benefit.benefitDescription }}
        </div>

      </v-col>
    </v-row>
    <v-divider></v-divider>
    <v-row class="pt-8">
      <v-col cols="7">
        <div class="text-left text-h5 font-weight-light grey--text text--darken-2">
          {{ data.main.mainSloganTitle }}
        </div>
        <div class="text-left text-body-2 font-weight-light grey--text text--darken-2 mt-3">
          {{ data.main.mainSloganDescription }}
        </div>
      </v-col>
      <v-col cols="5">
        <section-bars :data="data.tags"></section-bars>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import SectionHeader from '@/components/frontend/SectionHeader.vue'
import BaseCard from '@/components/UI/BaseCard.vue'
import SectionBars from '@/components/frontend/SectionBars.vue'

export default {
  components: { SectionHeader, BaseCard, SectionBars },
  props: {
    data: {
      type: Object,
      required: true
    }
  },

}
</script>


