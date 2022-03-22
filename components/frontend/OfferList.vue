<template>
  <div class="section-container pt-12">
    <v-row justify="center" align="stretch">
      <v-col cols="3"
        v-for="(offer, index) in sortedData"
        :key="index"

      >
      <v-hover>
        <template #default="{ hover }">
        <v-card
          max-width="300"
          outlined
          max-height="350"
          :class="{ 'on-hover': hover }"
          height="100%"
        >
          <v-card-subtitle
            class="text-center text-body-1 font-weight-light v-card-subtitle"
            :class="{ 'on-hover': hover }"
          >
            <v-icon
            size="50"
            class="mr-4"
            :class="{ 'on-hover': hover }"
            >
              {{ offer.offerIcon }}
            </v-icon>
            {{ offer.offerTitle }}
          </v-card-subtitle>
          <v-card-text
            class="text-body-1 font-weight-light v-card-text"
            :class="{ 'on-hover': hover }"
          >
            {{ offer.offerDescription }}
          </v-card-text>
        </v-card>
        </template>
      </v-hover>
      </v-col>
          <!-- {{ offer.offerTitle }} -->
    </v-row>
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
      show: false,
      sortedData: []
    }
  },
  created() {
    this.sortedData = [ ...this.data ]
    this.sortedData.sort((a, b) => {
      let index1 = a.offerIndexSort
      let index2 = b.offerIndexSort
      return index1 - index2
    })
  }
}
</script>

<style lang="sass" scoped>

.v-card
  background-color: transparent
  transition: background-color 0.2s linear
  &.on-hover
    background-color: orange

.v-icon
  color: grey
  transition: color 0.2s linear
  &.on-hover
    color: white

.v-card-text
  color: grey !important
  transition: color 0.2s linear
  &.on-hover
    color: white !important

.v-card-subtitle
  color: grey !important
  transition: color 0.2s linear
  &.on-hover
    color: white !important

</style>
