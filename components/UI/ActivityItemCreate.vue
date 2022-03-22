<template>
  <v-form ref="activityForm" v-model="validActivityForm">
    <v-container>
      <v-row no-gutters align="center">
        <v-col cols="12" class="mr-2">
          <v-text-field
            label="Activity Title"
            v-model="activityTitle"
            clearable
            @input="onTitleInput"
            :rules="activityTitleRules"
          >
          </v-text-field>
        </v-col>
      </v-row>
      <v-row no-gutters>
        <v-text-field
          label="Activity Subtitle"
          v-model="activitySubtitle"
          clearable
          @input="onSubtitleInput"
          :rules="activitySubtitleRules"
        >
        </v-text-field>
      </v-row>
      <v-row no-gutters justify="center" class="mt-4">
        <v-col cols="auto" class="mx-4">
          <v-chip-group
            @change="onTagsChange"
            v-model="chipSelected"
            column
            multiple
            active-class="primary--text"
            mandatory
          >
            <v-chip
              v-for="tag in getAllTags" :key="tag.identifier"
              label
            >
              {{ tag.tagTitle }}
            </v-chip>
          </v-chip-group>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
import { mapGetters } from 'vuex'
import { activityTitleRules, activitySubtitleRules } from '@/utils/shared/validationRules.js'

export default {
  data() {
    return {
      activityTitle: '',
      activitySubtitle: '',
      tags: [],
      chipSelected: [],
      transformIds: [],
      activityTitleRules,
      activitySubtitleRules,
      validActivityForm: false
    }
  },
  computed: {
    ...mapGetters('tag', ['getAllTags'])
  },
  watch: {
    validActivityForm(val) {
      this.$emit('valid', val)
    }
  },
  created() {
    this.tags = [ ...this.getAllTags ]
    this.transformIds = this.tags.map(tag => {
      return tag.identifier
    })
  },
  methods: {
    onTitleInput() {
      this.$emit('newEntryTitle', this.activityTitle)
    },
    onSubtitleInput() {
      this.$emit('newEntrySubtitle', this.activitySubtitle)
    },
    onTagsChange() {
      const chipSelected = this.chipSelected.map(chip => {
        return this.transformIds[chip]
      })

      chipSelected.sort(( a, b ) => a - b)
      this.$emit('newTag', chipSelected)
    },
  }
}
</script>
