<template>
  <div>
    <v-data-table
      :headers="newsHeader"
      :items="newsTableData"
      :options.sync="options"
      :server-items-length="getMetaData.total"
      class="elevation-1"
      :loading="loading"

    >
    <template #top>
      <v-toolbar flat>
        <v-toolbar-title>
          News
        </v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <news-search
          @restore-data="getBackendData"
          @search-data="getSearchData"
          :state="searchState"
        ></news-search>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialogAddItem" max-width="650px">
          <template #activator="{ on, attrs }">
            <v-btn
              color="primary"
              class="mb-2"
              v-bind="attrs"
              v-on="on"
              :disabled="$store.state.user.isRegularUser"
            >
              Add News
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h5">New Entry for News</span>
            </v-card-title>
            <v-card-text>

              <news-item-create
                @newEntryTitle="setNewTitle"
                @newDescription="setNewDescription"
                @newCategory="setNewCategory"
                @newDate="setNewDate"
              ></news-item-create>

            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
                <v-btn text @click="closeAddItemDialog">Cancel</v-btn>
                <v-btn text @click="saveAddItemDialog" color="red darken-1">Save</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

      </v-toolbar>
    </template>
    <template #item.news_category="{ item }">

      <v-avatar
        v-for="(element, index) in item.news_category"
        :key="index"
        :color="element.categoryColor"
        class="lighten-2 ma-2"
        text-color="white"
        rounded
        size="36"
      >
        <v-tooltip bottom>
          <template #activator="{ on,attrs }">
            <v-icon
              dark
              v-on="on"
              v-bind="attrs"
              >
                {{ element.categoryIcon }}
            </v-icon>
          </template>
          {{ element.categoryTitle }}
        </v-tooltip>
      </v-avatar>

    </template>
    <template #item.actions="{ item }">
      <v-tooltip bottom>
        <template #activator="{ on, attrs }">
          <v-icon
            class="mr-2"
            color="green"
            v-on="on"
            v-bind="attrs"
            @click="editItem(item)"
            :disabled="$store.state.user.isRegularUser"
          >
            mdi-pencil
          </v-icon>
        </template>
        <span>Edit the Entry</span>
      </v-tooltip>

      <v-tooltip bottom>
        <template #activator="{ on, attrs }">
          <v-icon
            color="red"
            v-on="on"
            v-bind="attrs"
            @click="deleteItem(item)"
            :disabled="$store.state.user.isRegularUser"
          >
            mdi-delete
          </v-icon>
        </template>
        <span>Delete Entry</span>
      </v-tooltip>

    </template>
    </v-data-table>

    <v-dialog v-model="dialogDeleteItem" max-width="500px">
      <v-card>
        <v-card-title class="text-h6"
          >Are you sure you want to delete this item?</v-card-title
        >
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            text
            @click="closeDeleteItemDialog"
          >
            Cancel
          </v-btn>
          <v-btn
            color="red darken-1"
            text
            @click="deleteItemConfirm"
          >
            OK
          </v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>

  </div>
</template>

<script>
import { format } from 'date-fns'
import NewsItemCreate from '@/components/UI/NewsItemCreate.vue'
import NewsSearch from '@/components/UI/NewsSearch.vue'
import { mapGetters } from 'vuex'

export default {
  components: { NewsItemCreate, NewsSearch },
  props: {
    news: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      value: null,
      newsTableData: [],
      newsHeader: [
        {
          text: 'News Title',
          value: 'news_title',
          width: '40%'
        },
        {
          text: 'Categories',
          value: 'news_category',
          width: 'auto',
          sortable: false

        },
        {
          text: 'Publish Date',
          value: 'news_date',
          width: '200'
        },
        {
          text: 'Actions',
          value: 'actions',
          sortable: false,
          width: '100'

        }
      ],
      dialogAddItem: false, // Visbility of AddItem Dialog
      dialogDeleteItem: false, // Visibility of DeleteItem Dialog
      loading: false,
      editedIndex: '',
      editedItem: {
        news_title: '',
        news_description: '',
        news_date: '',
        news_categories: []
      },
      defaultItem: {
        news_title: '',
        news_description: '',
        news_date: '',
        news_categories: []
      },
      newTitle: '',
      newDescription: '',
      newCategory: '',
      newDate: '',
      //NOTE - Control the table (pagination/sorting/search fields)
      options: {},
      searchState: true
    }
  },
  computed: {
    ...mapGetters('news', ['getMetaData'])
  },
  watch: {
    options: {
      handler() { this.getBackendData(this.options) },
      deep: true
    },
  },
  created() {
    this.initialize(this.news)
  },
  methods: {
    initialize(newsList) {
      for (let k of Object.keys(newsList)) {
        this.newsTableData[k] = {
          news_id: newsList[k].identifier,
          news_title: newsList[k].blogTitle,
          news_description: newsList[k].blogDescription,
          news_category: this.categoryFormat(newsList[k].blogCategories),
          news_date: this.dateFormat(newsList[k].blogEntryUpdatedAt)
        }
      }
    },
    categoryFormat(categoryList) {
      const categories = []
      categoryList.forEach(item => {
        categories.push({
          categoryTitle: item.categoryTitle,
          categoryColor: item.categoryColor,
          categoryIcon: item.categoryIcon
        })
      });
      return categories;
    },
    dateFormat(date) {
      return format(new Date(date), 'dd MMM y')
    },
    setNewTitle(data) {
      this.newTitle = data
    },
    setNewDescription(data) {
      this.newDescription = data
    },
    setNewCategory(data) {
      this.newCategory = data
    },
    setNewDate(data) {
      this.newDate = (new Date(data)).toISOString()
    },
    closeAddItemDialog() {
      this.dialogAddItem = false
      this.editedItem = {...this.defaultItem}
    },
    saveAddItemDialog() {
      const newsData = {
        title: this.newTitle,
        description: this.newDescription,
        date: this.newDate,
        category: this.newCategory
      }
      this.$store.dispatch('news/createNews', newsData)
        .then(() => this.$store.dispatch('showSnackBar', { message: 'The News Entry has been created!', status: 'success'}))
        .then(() => this.getBackendData())
        .catch(e => this.$store.dispatch('showSnackBar', { message: e.response.data.error, status: 'error'}))
        .then(() => this.closeAddItemDialog())


    },
    getBackendData(options = null) {
      this.loading = true;
      this.$store.dispatch('news/fetchAllNews', options)
        .then(response => {
          let { data, ...metaData } = response
          this.$store.dispatch('news/setMetaLinksNews', metaData)
          this.newsTableData = []
          this.initialize(data)
          this.loading = false
        })
        .catch(e => {
          this.$store.dispatch('showSnackBar', { message: e.response.data.message, status: 'error'})
          this.loading = false
        })
    },
    getSearchData(data) {
      this.searchState = false;
      this.loading = true;
      this.$store.dispatch('news/getSearchData', data)
        .then(response => {
          let { data, ...metaData } = response
          this.$store.dispatch('news/setMetaLinksNews', metaData)
          this.newsTableData = []
          this.initialize(data)
        })
        .catch(e => {
          this.$store.dispatch('showSnackBar', { message: 'No Search results', status: 'error'})
        })
        .then(() => {
          this.loading = false
          this.searchState = true
        })
    },
    deleteItem(item) {
      this.editedIndex = item.news_id
      this.dialogDeleteItem = true
    },
    closeDeleteItemDialog() {
      this.dialogDeleteItem = false;
      this.editedItem = {...this.defaultItem}
    },
    deleteItemConfirm() {
      this.$store.dispatch('news/deleteNews', this.editedIndex)
        .then(() => this.$store.dispatch('showSnackBar', { message: 'The News Entry has been deleted!', status: 'success'}))
        .then(() => this.getBackendData())
        .catch(e => {
          this.$store.dispatch('showSnackBar', { message: e.response.data.error, status: 'error'})
        })
        .then(() => this.closeDeleteItemDialog())
    },
    editItem(item) {
      this.editedIndex = item.news_id
      this.$router.push(`/admin/news/edit/${this.editedIndex}`)
    }
  }
}
</script>
