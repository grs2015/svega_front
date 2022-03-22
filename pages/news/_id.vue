<template>
  <div class="d-flex flex-column align-start">
    <news-section-one></news-section-one>
    <news-section-two :data="sectionTwoData" v-if="!$fetchState.pending"></news-section-two>
    <news-section-three :data="sectionThreeData" v-if="!$fetchState.pending"></news-section-three>
    <news-section-four :data="sectionFourData" v-if="!$fetchState.pending"></news-section-four>
    <news-pagination :data="newsLength"></news-pagination>


  </div>
</template>

<script>
import NewsSectionOne from '@/components/frontend/NewsSectionOne.vue'
import NewsSectionTwo from '@/components/frontend/NewsSectionTwo.vue'
import NewsSectionThree from '@/components/frontend/NewsSectionThree.vue'
import NewsSectionFour from '@/components/frontend/NewsSectionFour.vue'
import NewsPagination from '@/components/frontend/NewsPagination.vue'
import { mapGetters } from 'vuex'

export default {
  components: { NewsSectionOne, NewsSectionTwo, NewsSectionThree, NewsSectionFour, NewsPagination },
  data() {
    return {
      id: this.$route.params.id,
      newsData: {},
    }
  },
  fetch() {
    return this.$store.dispatch('news/fetchNewsEntry', this.id)
  },
  created() {
      this.$store.commit('currentRoute', this.$router.currentRoute.name)
  },
  computed: {
    ...mapGetters('news', ['getNewsEntry']),
    sectionTwoData() {
      let { blogCategories, blogDate } = this.getNewsEntry
      return { blogCategories, blogDate }
    },
    sectionThreeData() {
      return this.getNewsEntry
    },
    sectionFourData() {
      let { blogImages } = this.getNewsEntry
      return blogImages
    },
    newsLength() {
      return this.$store.state.main.main.mainBlogCount
    }

  },


}
</script>
