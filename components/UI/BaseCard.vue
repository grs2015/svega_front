<template>
  <v-container fluid>
    <v-row>
      <v-col>
        <v-card flat outlined>
          <v-card-title>
            <slot name="title"></slot>
          </v-card-title>
          <v-card-text>
            <slot name="content"></slot>
          </v-card-text>
          <v-card-actions>
            <slot name="actions"></slot>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {

}
</script>
