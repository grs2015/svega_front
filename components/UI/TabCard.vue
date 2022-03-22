<template>
  <v-card flat>
    <v-card-text>
      <slot name="content"></slot>
    </v-card-text>
    <v-card-actions>
      <slot name="actions"></slot>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {

}
</script>
