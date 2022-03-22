<template>
  <v-container fluid class="section-container">
    <v-row class="pt-16">
      <v-col cols="12">
        <div class="text-center">
          <v-pagination
            v-model="page"
            :length="data"
            @input="onInput"
          ></v-pagination>
        </div>
      </v-col>
    </v-row>
  </v-container>

</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props: {
    data: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      page: ''
    }
  },
  computed: {
    ...mapGetters('activity', ['getAllActivities', 'getPaginationIndex'])
  },
  created() {
    this.page = this.getPaginationIndex
  },
  methods: {
    onInput(data) {
      const id = this.getAllActivities[data - 1].identifier
      this.$router.push(`/offers/${ id }`)
      this.$store.commit('activity/paginationIndex', this.page)
    }
  }
}
</script>
