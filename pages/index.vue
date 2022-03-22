<template>
  <div class="d-flex flex-column align-start">
    <section-one :data="mainData" id="section-1"></section-one>
    <section-two
      :data="{
        section: sectionData[0],
        benefits: benefitsData,
        main: mainData,
        tags: tagsData
      }"
      id="section-2"
    >
    </section-two>
    <section-three
      :data="{
        section: sectionData[1],
        tags: tagsData
      }"
      id="section-3"
    ></section-three>
    <section-four
      :data="{
        section: sectionData[2],
        main: mainData,
        offers: offersData
      }"
      id="section-4"
    >
    </section-four>
    <section-six
      :data="{
        section: sectionData[3],
        news: newsData
      }"
      id="section-5"
    >

    </section-six>
    <section-five
      :data="{
        section: sectionData[4],
        main: mainData
      }"
      id="section-6"
    >
    </section-five>
  </div>


</template>

<script>
import SectionOne from '@/components/frontend/SectionOne.vue'
import SectionTwo from '@/components/frontend/SectionTwo.vue'
import SectionThree from '@/components/frontend/SectionThree.vue'
import SectionFour from '@/components/frontend/SectionFour.vue'
import SectionFive from '@/components/frontend/SectionFive.vue'
import SectionSix from '@/components/frontend/SectionSix.vue'

export default {
  components: { SectionOne, SectionTwo, SectionThree, SectionFour, SectionFive, SectionSix },
  mounted () {
    console.log(this.$vuetify.breakpoint.width)
  },
  computed: {
    mainData() {
      return this.$store.state.main.main
    },
    tagsData() {
      return this.$store.state.tag.tags
    },
    benefitsData() {
      return this.$store.state.benefit.benefits
    },
    sectionData() {
      return this.$store.state.section.sections
    },
    offersData() {
      return this.$store.state.offer.offers
    },
    newsData() {
      return this.$store.state.news.mainPageNews.slice(0, 3)
    }
  },
  created() {
    this.$store.commit('currentRoute', this.$router.currentRoute.name)
  }
  // fetch() {
  //   return this.$store.dispatch('front/fetchBaseData')
  //     .catch(e => this.$store.dispatch('showSnackBar', { message: e.response.data.message, status: 'error'}))
  // },
  // asyncData({ app, error }) {
  //   const getMain = () => app.$axios.$get('/api/mains/1')
  //   const getSections = () => app.$axios.$get('/api/mains/1/sections')
  //   const getBenefits = () => app.$axios.$get('/api/mains/1/benefits')
  //   const getTags = () => app.$axios.$get('/api/mains/1/tags')
  //   const getOffers = () => app.$axios.$get('/api/mains/1/offers')
  //   return Promise.all([getMain(), getSections(), getBenefits(), getTags(), getOffers()])
  //     .then(response => {
  //       return {
  //         data: {
  //           mainData: response[0].data,
  //           sectionData: response[1].data,
  //           benefitsData: response[2].data,
  //           tagsData: response[3].data,
  //           offersData: response[4].data
  //         }
  //       }
  //     })
  //     .catch(e => { return error({ message: e.message, statusCode: e.response.status }) })
  // }
}
</script>
