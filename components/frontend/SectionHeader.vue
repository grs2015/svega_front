<template>
  <v-container fluid>
    <v-row no-gutters class="pt-16">
      <v-col>
        <div
          class="text-center text-h4 font-weight-light pb-3 section-header"
          :class="sectionTitleColor">
          <slot name="title"></slot>
        </div>
        <div class="text-center text-body-1 font-weight-light grey--text text--darken-2 mt-3">
          <slot name="description"></slot>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  props: {
    data: {
      type: Boolean,
    }
  },
  computed: {
    sectionTitleColor() {
      return {
        'grey--text text--darken-2': !this.data,
        'white--text': this.data
      }
    }
  },
}
</script>

<style scoped>
  .section-header {
    position: relative;
  }
  .section-header::after {
    position: absolute;
    content: '';
    display: block;
    width: 150px;
    height: 1px;
    background-color: orange;
    left: 50%;
    transform: translateX(-50%);
    bottom: 0;
  }
</style>
