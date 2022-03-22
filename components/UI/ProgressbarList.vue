<template>
  <base-card>
    <template #title>
      <span>Progress Bars Edit</span>
    </template>
    <template #content>
      <v-list>
        <progress-item
          v-for="tag in getAllTags"
          :key="tag.indentifier"
          :tag="tag"
        >

        </progress-item>
      </v-list>
    </template>
    <template #actions>
      <v-row justify="end">
          <v-col cols="4" class="mr-2">
            <v-btn
              block
              outlined
              color="primary"
              :disabled="getLoading"
              :loading="getLoading"
              @click="onSave">
              <template v-slot:loader>
                <span class="custom-loader">
                  <v-icon light>mdi-cached</v-icon>
                </span>
              </template>
              Save
            </v-btn>
          </v-col>
        </v-row>
    </template>
  </base-card>
</template>

<script>
import BaseCard from '@/components/UI/BaseCard.vue'
import ProgressItem from '@/components/UI/ProgressItem.vue'
import { mapGetters } from 'vuex'

export default {
  components: { BaseCard, ProgressItem },
  computed: {
    ...mapGetters('tag', ['getAllTags', 'getLoading'])
  },
  methods: {
    onSave() {
      this.$store.commit('tag/toggleLoading')
      this.$store.dispatch('tag/updateAllTags')
        .then(() => this.$store.dispatch('showSnackBar', { message: 'The Progress bars has been updated!', status: 'success'}))
        .catch(e => this.$store.dispatch('showSnackBar', { message: e.response.data.message, status: 'error'}))
        .then(() => this.$store.commit('tag/toggleLoading'))
    }
  }
}
</script>
