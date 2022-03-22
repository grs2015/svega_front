<template>
  <v-container fluid class="section-container">
    <v-row no-gutters>

      <v-card
          outlined
          class="d-flex align-center orange--text orange lighten-5"
          width="100%"
      >
        <v-col cols="9">
          <v-card-text >
            <span class="font-weight-medium">Categories:</span>
            <v-chip v-for="category in newsCategories"
              :key="category.identifier"
              :color="category.categoryColor"
              text-color="white"
              label
              class="mr-2"
            >
              {{ category.categoryTitle }}
            </v-chip>
          </v-card-text>
        </v-col>
        <v-col cols="3">
          <v-card-text class="text-right">
            <span class="font-weight-medium">News Date:</span> {{ data.blogDate }}
          </v-card-text>
        </v-col>
      </v-card>


    </v-row>
  </v-container>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      required: true
    },
  },
  data() {
    return {

    }
  },
  computed: {
    newsCategories() {
      return [ ...this.data.blogCategories ]
    },

  }
}
</script>
