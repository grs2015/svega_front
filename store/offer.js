import _ from 'lodash'

export const state = () => ({
  offers: [],
  sorting: false,
  loading: false
})

export const actions = {
  fetchAllOffers({ commit }) {
    return this.$axios.$get('/api/offers')
      .then(response => commit('setAllOffers', response.data))
  },
  updateOfferEntry({ commit }, offerEntryData) {
    let { id, data } = offerEntryData
    return this.$axios.$put(`/api/offers/${ id }`, data)
      .then(response => {

        commit('updateOfferEntry', response.data)})
  },
  deleteOffer({ commit }, offerId) {
    return this.$axios.$delete(`/api/offers/${ offerId }`)
      .then(response => commit('deleteOffer', response.data))
  },
  addOffer({ commit }, offerTitle) {
    return this.$axios.$post('/api/mains/1/offers', { title: offerTitle })
      .then(response => commit('addOffer', response.data))
  },
  updateAllOffers({ commit, state }) {
    const promiseArray = []
    state.offers.forEach(item => {
      let data = {
        title: item.offerTitle,
        description: item.offerDescription,
        icon: item.offerIcon,
        indexicon: item.offerIndexIcon,
        sortindex: item.offerIndexSort
      }
      let promise = () => this.$axios.$put(`/api/offers/${ item.identifier }`, data)
      promiseArray.push(promise())
    })
    return Promise.all(promiseArray)
      .then(response => {
        const offers = []
        response.forEach(item => offers.push(item.data))
        commit('setAllOffers', offers)
      })
  }
}

export const mutations = {
  setAllOffers(state, offers) {
    offers.sort((a, b) => {
      let index1 = a.offerIndexSort
      let index2 = b.offerIndexSort
      return index1 - index2
    })
    state.offers = offers
  },
  updateOfferEntry(state, offerEntry) {
    const index = state.offers.findIndex(offer => offer.identifier === offerEntry.identifier)
    state.offers[index] = offerEntry
    state.offers = [ ...state.offers ]
  },
  deleteOffer(state, offerEntry) {
    state.offers = state.offers.filter(offer => offer.identifier !== offerEntry.identifier)
  },
  addOffer(state, offerEntry) {
    state.offers.push(offerEntry)
  },
  setOffers(state, offers) {
    state.offers = offers
  },
  toggleSorting(state) {
    state.sorting = !state.sorting
  },
  updateSortIndexes(state) {
    state.offers.forEach((item, index) => {
      item.offerIndexSort = index
    })
  },
  toggleLoading(state) {
    state.loading = !state.loading
  }
}

export const getters = {
  getAllOffers(state) {
    return state.offers
  },
  getLoading(state) {
    return state.loading
  }
}
