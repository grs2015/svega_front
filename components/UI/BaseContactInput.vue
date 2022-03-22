<template>
  <v-row no-gutters align="center" class="mx-4">
    <v-col cols="12">
      <v-text-field
        :label="label"
        :value="value"
        @input="$emit('input', $event)"

        :rules="rules"
        counter="60"
      >
        <template #prepend>
          <v-icon color="orange">
            {{ icon }}
          </v-icon>
        </template>
        <template v-if="tooltip" #append>
          <v-tooltip bottom>
            <template #activator="{ on, attrs }">
              <v-icon
                v-bind="attrs"
                v-on="on"
              >
                mdi-help-circle-outline
              </v-icon>
            </template>
            <span>{{ tooltip }}</span>
          </v-tooltip>


        </template>
      </v-text-field>
    </v-col>
  </v-row>
</template>

<script>
export default {
  props: ['value', 'label', 'icon', 'rules', 'tooltip']
}
</script>
