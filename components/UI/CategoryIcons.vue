<template>
  <v-item-group
    mandatory
    v-model="activeIconIndex"
    @change="onChange"
  >
    <v-container>
      <v-row no-gutters>
        <v-col cols="auto"
          v-for="(icon, index) in icons"
          :key="index"
        >
          <v-item #default="{ active, toggle }">
            <v-card
            outlined
            tile
            :color="active ? 'primary' : ''"
            @click="toggle"
          >
            <v-icon
              large
              :color="active ? 'white' : 'primary'"
            >
              {{ icon }}
            </v-icon>
          </v-card>
          </v-item>

        </v-col>
      </v-row>

    </v-container>
  </v-item-group>
</template>

<script>
import iconSet from '@/utils/shared/iconSet.js'
export default {
  data() {
    return {
      icons: iconSet,
      activeIconIndex: null
    }
  },
  methods: {
    onChange() {
      this.$emit('activeIcon', this.icons[this.activeIconIndex])
    }
  }
}
</script>
