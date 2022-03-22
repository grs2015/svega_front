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
    ...mapGetters('news', ['getAllNews', 'getPaginationIndex'])
  },
  created() {
    this.getAllNews.forEach((item, index) => {
      if (item.identifier === +this.$route.params.id) {
        this.page = index + 1
      }
    })
  },
  methods: {
    onInput(data) {
      const id = this.getAllNews[data - 1].identifier
      this.$router.push(`/news/${ id }`)
      this.$store.commit('news/paginationIndex', this.page)
    }
  }
}
</script>
