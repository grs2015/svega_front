<template>
  <v-dialog
    persistent
    :value="true"
    max-width="500"
  >
    <v-card>
      <v-card-title class="text-h5">
        Tag Title
      </v-card-title>
      <v-card-text>
        Edit the Title of Tag
        <v-text-field
          v-model="tagTitle"
          @keyup.enter="saveTitle"
        >
        </v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          text
          @click="$emit('close')"
        >
          Cancel
        </v-btn>
        <v-btn
          text
          :disabled="tagTitleIsInvalid"
          color="red darken-1"
          @click="saveTitle"
        >
          Save
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    tag: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      tagTitle: null
    }
  },
  methods: {
    saveTitle() {
      if (!this.tagTitleIsInvalid) {
        const tagData = {
          title: this.tagTitle,
          id: this.tag.identifier,
          _method: 'PUT'
        }
        this.$store.dispatch('tag/updateTitleTag', tagData)
          .then(() => this.$store.dispatch('showSnackBar', { message: 'The Tag Title has been updated!', status: 'success'}))
          .catch(e => this.$store.dispatch('showSnackBar', { message: e.response.data.error, status: 'error'}))
          .then(() => this.$emit('close'))
      }
    }
  },
  computed: {
    tagTitleIsInvalid() {
      return !this.tagTitle || this.tagTitle === this.tag.tagTitle
    }
  },
  mounted() {
    this.tagTitle = this.tag.tagTitle
  }
}
</script>
