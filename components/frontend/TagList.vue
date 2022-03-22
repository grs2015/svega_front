<template>
  <div class="section-container">
    <v-row justify="center" class="pt-16">
      <v-col cols="auto">
        <v-btn-toggle
          v-model="tag"
          tile
          color="orange"
          group
          @change="onChange"
          mandatory
        >
          <v-btn
            v-for="(tag, index) in data"
            :key="index"
            :value="tag.identifier"
          >
            {{ tag.tagTitle }}
          </v-btn>

        </v-btn-toggle>
      </v-col>
    </v-row>
    <v-item-group class="pt-8" @change="toggle_1">
      <v-row justify="center">
        <v-col
          v-for="(activity, index) in activities"
          :key="index"
          cols="auto"
        >
        <NuxtLink :to="`/offers/${ activity.identifier }`">
          <v-item #default="{ toggle }">
            <v-hover>
              <template #default="{ hover }">
                <v-card
                  @click="toggle"
                  height="200px"
                  width="250px"
                  dark
                >
                  <v-img
                    height="200px"
                    cover
                    :src="getBackEndURL(activity.activityImage)"
                  >
                  </v-img>
                  <v-fade-transition>
                    <v-overlay
                      v-if="hover"
                      absolute
                      color="blue-grey darken-4"
                    >
                      <v-card-title>
                        {{ activity.activityTitle }}
                      </v-card-title>
                      <v-card-subtitle>
                        {{ activity.activitySubtitle }}
                      </v-card-subtitle>


                    </v-overlay>
                  </v-fade-transition>
                </v-card>
              </template>
            </v-hover>
          </v-item>
        </NuxtLink>
        </v-col>
      </v-row>
    </v-item-group>
  </div>
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
      tag: this.data[0].identifier,
      backEndURL: process.env.BACKEND_APP_URL,
      activities: []
    }
  },
  computed: {
    tagActivities() {
      return this.$store.state.frontend.tagActivities
    },
  },
  fetch() {
    return this.$store.dispatch('frontend/fetchActivities', this.tag)
      .then(response => this.activities = [ ...response.data ])

  },
  methods: {
    onChange(data) {
      if (!this.tagActivities[data]) {
        this.$store.dispatch('frontend/fetchActivities', data)
          .then(response => this.activities = [ ...response.data ])
      } else {
        this.activities = this.tagActivities[data]
      }

    },
    getBackEndURL(imageLink) {
      return this.backEndURL + imageLink
    },
    toggle_1(data) {

    }
  }
}
</script>

<style scoped>
  .tags {
    border: 1px solid transparent;
    transition-property: border;
    transition-duration: .5s;
  }
  .tags.on-hover {
    border: 1px solid orange;
  }
</style>
