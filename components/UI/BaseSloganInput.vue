<template>
  <v-row no-gutters align="center" class="mx-4">
    <v-col cols="12">
      <v-text-field
        :label="label"
        :value="value"
        @input="$emit('input', $event)"
        clearable
        :rules="rules"
        counter="40"
      >
        <template #prepend>
          <v-icon color="orange">
            {{ icon }}
          </v-icon>
        </template>
      </v-text-field>
    </v-col>
  </v-row>
</template>

<script>
export default {
  props: ['value', 'label', 'icon', 'rules']
}
</script>
