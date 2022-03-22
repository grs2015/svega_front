<template>
  <v-container fluid class="section-container">
    <v-card
      width="100%"
      flat
    >
      <v-card-title>{{ data.blogTitle }}</v-card-title>
      <v-card-text>
        <div
          class="list"
          v-for="(item, index) in sectionDescription"
          :key="index"
        >
          {{ item }}
        </div>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
  computed: {
    sectionDescription() {
      return this.data.blogDescriptionFull.split('\r\n')
    }
  },
}
</script>

<style scoped>
  .list + .list {
    padding-top: 20px;
  }
</style>
