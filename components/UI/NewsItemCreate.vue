<template>
  <v-form>
    <v-container>
      <v-row no-gutters align="center">
        <v-col cols="8" class="mr-2">
          <v-text-field
            label="News Title"
            clearable
            v-model="newsTitle"
            @input="onTitleInput"
          >
          </v-text-field>
        </v-col>
        <v-col>
          <v-dialog
            ref="dialog"
            v-model="modal"
            :return-value.sync="date"
            persistent
            width="290px"
          >
            <template #activator="{ on, attrs }">
              <v-text-field
                v-model="date"
                label="Pick the Date"
                prepend-icon="mdi-calendar"
                readonly
                v-bind="attrs"
                v-on="on"
              >
              </v-text-field>
            </template>
            <v-date-picker
              @change="onDateChange"
              v-model="date"
              scrollable
            >
              <v-spacer></v-spacer>
              <v-btn
                text
                @click="modal = false"
              >
                Cancel
              </v-btn>
              <v-btn
                text
                color="red darken-1"
                @click="$refs.dialog.save(date)"
              >
                OK
              </v-btn>
            </v-date-picker>

          </v-dialog>
        </v-col>
      </v-row>
      <v-row no-gutters>
        <v-textarea
            label="News Description"
            v-model="newsDescription"
            @input="onDescriptionInput"
          ></v-textarea>
      </v-row>
      <v-row no-gutters justify="center">
        <v-col cols="auto">
          <v-chip-group
            @change="onCategoriesChange"
            v-model="chipSelected"
            column
            multiple
            active-class="primary--text"

          >
            <v-chip
              v-for="category in getAllCategories" :key="category.identifier"
              :active-class="category.categoryColor"
              text-color="white"
              label
            >
              {{ category.categoryTitle }}
            </v-chip>
          </v-chip-group>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      newsTitle: '',
      newsDescription: '',
      modal: false,
      categories: [],
      chipSelected: [],
      transformIds: [],
    }
  },
  computed: {
    ...mapGetters('category', ['getAllCategories'])
  },
  created() {
    this.categories = this.getAllCategories
    this.transformIds = this.categories.map(category => {
      return category.identifier
    })
  },
  methods: {
    onTitleInput() {
      this.$emit('newEntryTitle', this.newsTitle)
    },
    onDescriptionInput() {
      this.$emit('newDescription', this.newsDescription)
    },
    onCategoriesChange() {
      const chipSelected = this.chipSelected.map(chip => {
        return this.transformIds[chip]
      })

      chipSelected.sort(( a, b ) => a - b)
      this.$emit('newCategory', chipSelected)
    },
    onDateChange() {
      this.$emit('newDate', this.date)
    }
  }
}
</script>
