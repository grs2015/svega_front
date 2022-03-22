<template>
  <v-row no-gutters align="center" class="mx-4">
    <v-col cols="12">
      <v-textarea
        :label="label"
        :value="value"
        @input="$emit('input', $event)"
        clearable
        auto-grow
        :rules="rules"
        counter="500"
      >
        <template #prepend>
          <v-icon color="orange">
            {{ icon }}
          </v-icon>
        </template>
      </v-textarea>
    </v-col>
  </v-row>
</template>

<script>
export default {
  props: ['value', 'label', 'icon', 'rules']
}
</script>
