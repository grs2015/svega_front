<template>
  <v-container fluid class="pt-16">
    <v-row justify="space-between" align="stretch">
      <v-col cols="4"
        v-for="(news, index) in data"
        :key="index"
      >
        <v-card
          outlined
          height="100%"
          class="d-flex flex-column"
        >
          <v-card-text class="text-right orange--text orange lighten-5">
            {{ news.blogDate }}
          </v-card-text>
          <v-divider></v-divider>
          <v-card-title>{{ news.blogTitle }}</v-card-title>
          <v-card-text class="flex-grow-1">{{ news.blogDescription }}</v-card-text>
          <v-divider></v-divider>
          <v-card-text>
            <span class="orange--text">Categories:</span>
            <v-avatar
              v-for="(element, index) in news.blogCategories"
              :key="index"
              :color="element.categoryColor"
              class="lighten-2 ma-2"
              text-color="white"
              rounded
              size="36"
            >
              <v-tooltip bottom>
                <template #activator="{ on,attrs }">
                  <v-icon
                    dark
                    v-on="on"
                    v-bind="attrs"
                    >
                      {{ element.categoryIcon }}
                  </v-icon>
                </template>
                {{ element.categoryTitle }}
              </v-tooltip>
            </v-avatar>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn text color="orange" @click="onClick(news)">Read more</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>


<script>
export default {
  props: {
    data: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      mainSlider: 0
    }
  },
  methods: {
    onClick(data) {
      this.$router.push(`/news/${ data.identifier }`)
    }
  }
}
</script>
