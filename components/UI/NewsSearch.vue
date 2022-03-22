<template>
  <v-text-field
    hide-details
    dense
    placeholder="Search"
    clearable
    prepend-inner-icon="mdi-magnify"
    v-model="newsSearch"
    @change="$emit('search-data',$event)"
    @click:clear="$emit('restore-data')"
    :readonly="!state"
  >
  </v-text-field>

</template>

<script>
export default {
  props: {
    state: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      newsSearch: ''
    }
  },
}
</script>
