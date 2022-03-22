export const state = () => ({
  links: {},
  meta: {},
  newsEntry: {},
  redirectOnSave: true,
  mainPageNews: [],
  paginationIndex: 1
})

export const actions = {
  createNews({ commit }, newNewsEntry) {
    return this.$axios.$post('/api/mains/1/blogs', newNewsEntry)
  },
  fetchAllNews(_, QueryParams = null) {
    if (QueryParams) {
      const { page, itemsPerPage, sortBy, sortDesc } = QueryParams
      let sortColumn = (sortBy[0] === 'news_title') ? 'title'
        : (sortBy[0] === 'news_date') ? 'date' : ''
      let sortDirect = (sortDesc[0]) ? 'desc' : 'asc'
      let sortQuery = sortColumn ? (sortColumn + '=' + sortDirect) : ''
      return this.$axios.$get(`/api/blogs?per_page=${itemsPerPage}&page=${page}&${sortQuery}`)
    } else {
      return this.$axios.$get('/api/blogs')
    }
  },
  setMetaLinksNews({ commit }, metaData) {
    commit('setMetaLinksNews', metaData)
  },
  getSearchData(_, searchData) {
    return this.$axios.$get(`/api/blogs?search=${searchData}`)
  },
  deleteNews(_, newsId) {
    return this.$axios.$delete(`/api/blogs/${newsId}`)
  },
  fetchNewsEntry({ commit }, routeId) {
    return this.$axios.$get(`/api/mains/1/blogs/${routeId}`)
      .then(response => commit('setCurrentNews', response.data))
  },
  updateNewsEntry(_, newsEntryRouteData) {
    let { route, data } = newsEntryRouteData
    return this.$axios.$post(`/api/blogs/${route}`, data)
  }

}

export const mutations = {
  setMetaLinksNews(state, metaData) {
    state.links = metaData.links
    state.meta = metaData.meta
  },
  setCurrentNews(state, newsData) {
    state.newsEntry.blogDate = newsData.blogDate
    state.newsEntry.blogTitle = newsData.blogTitle
    state.newsEntry.blogDescription = newsData.blogDescription
    state.newsEntry.blogDescriptionFull = newsData.blogDescriptionFull
    state.newsEntry.identifier = newsData.identifier
    state.newsEntry.blogImages = newsData.blogImages
    state.newsEntry.blogCategories = [ ...newsData.blogCategories ]
  },
  toggleRedirectOnSave(state) {
    state.redirectOnSave = !state.redirectOnSave
  },
  setMainPageNews(state, newsData) {
    state.mainPageNews = [ ...newsData ]
  },
  paginationIndex(state, index) {
    state.paginationIndex = index
  }
}

export const getters = {
  getMetaData(state) {
    return state.meta
  },
  getLinksData(state) {
    return state.links
  },
  getNewsEntry(state) {
    return state.newsEntry
  },
  getRedirectOnSave(state) {
    return state.redirectOnSave
  },
  getAllNews(state) {
    return state.mainPageNews
  },
  getPaginationIndex(state) {
    return state.paginationIndex
  }
}
