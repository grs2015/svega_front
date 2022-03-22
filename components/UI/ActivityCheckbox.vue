<template>
  <v-row no-gutters justify="end">
    <v-col cols="10">
      <v-checkbox
        :value="value"
        @change="$emit('input', $event)"
        true-value="1"
        false-value="0"
        dense
      >
        <template #label>
          <div>
            {{ label }}
          </div>
        </template>
      </v-checkbox>
    </v-col>
  </v-row>
</template>

<script>
export default {
  props: ['value', 'label']
}
</script>
