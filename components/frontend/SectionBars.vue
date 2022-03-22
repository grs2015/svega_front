<template>
  <div>
    <div v-for="(tag, index) in data"
      :key="index"
    >
      <div class="text-left text-body-2 font-weight-regular grey--text text--darken-2 mt-2">
        {{ tag.tagTitle }}
      </div>
      <v-progress-linear
        v-model="tag.tagProgress"
        height="16"
        color="orange"
        rounded
      >
        <template #default="{ value }">
          <strong>{{ Math.ceil(value) }}%</strong>
        </template>
      </v-progress-linear>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Array,
      required: true
    }
  },
}
</script>
