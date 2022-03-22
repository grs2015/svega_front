<template>
  <div class="d-flex flex-column align-start">
    <activity-section-one :data="sectionOneData"></activity-section-one>
    <activity-section-two :data="sectionTwoData"></activity-section-two>
    <activity-pagination :data="activitiesLength"></activity-pagination>

  </div>
</template>

<script>
import ActivitySectionOne from '@/components/frontend/ActivitySectionOne.vue'
import ActivitySectionTwo from '@/components/frontend/ActivitySectionTwo.vue'
import ActivityPagination from '@/components/frontend/ActivityPagination.vue'
import { mapGetters } from 'vuex'

export default {
  components: { ActivitySectionOne, ActivitySectionTwo, ActivityPagination },
  data() {
    return  {
      activityData: {}
    }
  },
  created() {
    this.activityData = { ...this.getAllActivities.filter(item => item.identifier === +this.$route.params.id)}
    let index = this.getAllActivities.indexOf(this.activityData[0])
    this.$store.commit('activity/paginationIndex', index)
    this.$store.commit('currentRoute', this.$router.currentRoute.name)
  },
  computed: {
    ...mapGetters('activity', ['getAllActivities']),
    sectionOneData() {
      return this.activityData[0].sectionOneData
    },
    sectionTwoData() {
      return this.activityData[0].sectionTwoData
    },
    activitiesLength() {
      return this.getAllActivities.length
    }
  },
  // fetch() {
  //   return this.$store.dispatch('activity/fetchActivity', this.$route.params.id)
  //     .catch(e => this.$store.dispatch('showSnackBar', { message: e.response.data.message, status: 'error'}))
  // }
}
</script>
