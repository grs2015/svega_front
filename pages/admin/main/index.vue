<template>
  <div>
    <v-breadcrumbs :items="items">
      <template v-slot:divider>
        <v-icon>mdi-chevron-right</v-icon>
      </template>
      <template v-slot:item="{ item }">
        <v-breadcrumbs-item
          nuxt exact
          :to="item.to"
        >
          {{ item.text }}
        </v-breadcrumbs-item>
      </template>

    </v-breadcrumbs>


    <v-row no-gutters>
      <v-col cols="12" md="6">
        <section-list></section-list>
        <progressbar-list></progressbar-list>
        <contact-list></contact-list>
      </v-col>
      <v-col cols="12" md="6">
        <offer-list></offer-list>
        <benefit-list></benefit-list>
        <slogan-list></slogan-list>
      </v-col>
    </v-row>

    <v-row no-gutters align="stretch">
      <v-col cols="12" md="6">
        <main-image-list></main-image-list>
      </v-col>
      <v-col cols="12" md="6">
        <main-image></main-image>
      </v-col>
    </v-row>

    <v-row no-gutters>
      <v-col cols="12">
        <parallax-image-list></parallax-image-list>
      </v-col>
    </v-row>

  </div>
</template>

<script>
import { mainBreadCrumbs } from '@/utils/shared/breadcrumbs.js'
import SectionList from '@/components/UI/SectionList.vue'
import OfferList from '@/components/UI/OfferList.vue'
import ProgressbarList from '@/components/UI/ProgressbarList.vue'
import BenefitList from '@/components/UI/BenefitList.vue'
import ContactList from '@/components/UI/ContactList.vue'
import SloganList from '@/components/UI/SloganList.vue'
import MainImageList from '@/components/UI/MainImageList.vue'
import MainImage from '@/components/UI/MainImage.vue'
import ParallaxImageList from '@/components/UI/ParallaxImageList.vue'

export default {
  components: {
    mainBreadCrumbs,
    SectionList,
    OfferList,
    ProgressbarList,
    BenefitList,
    ContactList,
    SloganList,
    MainImageList,
    MainImage,
    ParallaxImageList },
  middleware: ['auth', 'verified', 'editor'],
  layout: 'admin',
  data() {
    return {
      items: mainBreadCrumbs
    }
  }
}
</script>
