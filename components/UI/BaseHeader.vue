<template>
  <v-row>
    <v-col :cols="cols">
      <div class="text-left text-h6 blue lighten-4 pa-1 mb-4 rounded-lg">
        <span class="blue--text text-darken-4 ml-2">
          <slot></slot>
        </span>
      </div>
    </v-col>
  </v-row>
</template>

<script>
export default {
  props: {
    cols: {
      type: String,
      default: "12"
    }
  }
}
</script>
