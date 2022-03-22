<template>
  <v-row align="center" no-gutters>
    <v-col cols="2">
      <v-subheader>
        <slot></slot>
      </v-subheader>
    </v-col>
    <v-col cols="10">
      <v-text-field
        :label="label"
        :value="value"
        @input="$emit('input', $event)"
        clearable
        filled
      >
      </v-text-field>
    </v-col>
  </v-row>
</template>

<script>
export default {
  props: ['value', 'label']
}
</script>
