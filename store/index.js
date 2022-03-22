export const state = () => ({
  snackbar: {
    show: false,
    text: '',
    status: '',
  },
  currentRoute: ''
})

export const getters = {
  snackbarState(state) {
    return state.snackbar.show
  },
  snackbarText(state) {
    return state.snackbar.text
  },
  snackbarStatus(state) {
    return state.snackbar.status
  }
}

export const mutations = {
  showSnackBar(state, snackbarObj) {
    state.snackbar.show = true
    state.snackbar.text = snackbarObj.message
    state.snackbar.status = snackbarObj.status
  },
  hideSnackBar(state) {
    state.snackbar.show = false
    state.snackbar.text = ''
    state.snackbar.status = ''
  },
  currentRoute(state, currentRoute) {
    state.currentRoute = currentRoute
  }
}

export const actions = {
  // fetchBasicData({ commit }) {
  //   // const getCategories = () => this.$axios.$get('/api/categories')
  //   // const getTags = () => this.$axios.$get('/api/tags')
  //   // // const getSections = () => this.$axios.$get('/api/sections')
  //   // const getMainData = () => this.$axios.$get('/api/mains/1')
  //   // const getBenefits = () => this.$axios.$get('/api/benefits')

  //   // return Promise.all([getTags(), getMainData(), getBenefits()])
  //   //   .then(response => {
  //   //     // commit('category/setAllCategories', response[0].data)
  //   //     commit('tag/setAllTags', response[0].data)
  //   //     // commit('section/setAllSections', response[2].data)
  //   //     commit('main/setMain', response[1].data)
  //   //     commit('benefit/setAllBenefits', response[2].data)
  //   //   })
  // },
  nuxtServerInit({ commit }, { app }) {
    const getMainData = () => app.$axios.$get('/api/mains/1')
    const getSectionData = () => app.$axios.$get('/api/mains/1/sections')
    const getCategories = () => app.$axios.$get('/api/mains/1/categories')
    const getTags = () => app.$axios.$get('/api/mains/1/tags')
    const getBenefits = () => app.$axios.$get('/api/mains/1/benefits')
    const getOffers = () => app.$axios.$get('/api/mains/1/offers')
    const getActivities = () => app.$axios.$get('/api/mains/1/activities')
    const getNews = () => app.$axios.$get('/api/mains/1/blogs?per_page=10&page=1&date=desc')

    return Promise.all([
        getMainData(),
        getSectionData(),
        getCategories(),
        getTags(),
        getBenefits(),
        getOffers(),
        getActivities(),
        getNews()
      ])
      .then(response => {
        commit('main/setMain', response[0].data)
        commit('section/setAllSections', response[1].data)
        commit('category/setAllCategories', response[2].data)
        commit('tag/setAllTags', response[3].data)
        commit('benefit/setAllBenefits', response[4].data)
        commit('offer/setAllOffers', response[5].data)
        commit('activity/setAllActivities', response[6].data)
        commit('news/setMainPageNews', response[7].data)
      })
    // return app.$axios.$get('/api/mains/1')
    //   .then(response => commit('main/setMain', response.data))
    },
    showSnackBar({ commit }, snackbarObj) {
      commit('showSnackBar', snackbarObj)

    },
    hideSnackBar({ commit }) {
      commit('hideSnackBar')
    }

    // return app.$axios.$get('/api/categories')
    //   .then(response => commit('category/setAllCategories', response.data))
  }
