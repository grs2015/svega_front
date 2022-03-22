<template>

  <v-container fluid class="section-container">

    <v-row>
      <v-col cols="4">
        <div class="text-left text-body-1 font-weight-regular grey--text text--darken-2">
          {{ data.activitySectionTitle1 }}
        </div>
        <div class="text-left text-body-2 font-weight-light grey--text text--darken-2 mt-3">
          <div v-for="(item, index) in sectionDescription1" :key="index" class="list">{{ item }}</div>
        </div>
      </v-col>
      <v-col cols="8">
        <div class="text-left text-body-1 font-weight-regular grey--text text--darken-2">
          {{ data.activitySectionTitle2 }}
        </div>
        <ul v-for="(item, index) in sectionDescription" :key="index">
          <li class="text-left text-body-2 font-weight-light grey--text text--darken-2 mt-3">
            {{ item }}
          </li>
        </ul>
      </v-col>
    </v-row>

  </v-container>

</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  data() {
    return {

    }
  },
  computed: {
    sectionDescription() {
      return this.data.activitySectionDescription2.split('\r\n')
    },
    sectionDescription1() {
      return this.data.activitySectionDescription1.split('\r\n')
    },
  },
}
</script>


<style>
  .section-container {
    max-width: 1200px;
    margin: auto;
  }
  .list + .list {
    padding-top: 20px;
  }
</style>
