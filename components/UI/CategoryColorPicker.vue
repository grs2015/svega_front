<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="auto"
      >
       <v-color-picker
        hide-canvas
        hide-inputs
        hide-mode-switch
        hide-sliders
        @input="onInput"
        v-model="activeColor"
        dot-size="28"
        mode="rgba"
        show-swatches
        :swatches="swatches"

        ></v-color-picker>
      </v-col>

    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      activeColor: null,
      swatches: [
        ['#F44336', '#E91E63', '#9C27B0'],
        ['#673AB7', '#3F51B5', '#2196F3'],
        ['#03A9F4', '#00BCD4', '#009688'],
        ['#4CAF50', '#8BC34A', '#CDDC39'],
        ['#FFEB3B', '#FFC107', '#FF9800'],


      ],
    }
  },
  methods: {
    onInput(data) {
      this.$emit('activeColor', this.activeColor.hex)
    }
  }
}
</script>
