export const state = () => ({
  benefits: [],
  sorting: false,
  loading: false
})

export const actions = {
  updateBenefitEntry({ commit }, benefitEntryData) {
    let { id, data } = benefitEntryData
    return this.$axios.$put(`/api/benefits/${ id }`, data)
      .then(response => commit('updateBenefitEntry', response.data))
  },
  deleteBenefit({ commit }, benefitId) {
    return this.$axios.$delete(`/api/benefits/${ benefitId }`)
      .then(response => commit('deleteBenefit', response.data))
  },
  updateAllBenefits({ commit, state }) {
    const promiseArray = []
    state.benefits.forEach(item => {
      let data = {
        title: item.benefitTitle,
        description: item.benefitDescription,
        sortindex: item.benefitIndexSort
      }
      let promise = () => this.$axios.$put(`/api/benefits/${ item.identifier }`, data)
      promiseArray.push(promise())
    })
    return Promise.all(promiseArray)
      .then(response => {
        const benefits = []
        response.forEach(item => benefits.push(item.data))
        commit('setAllBenefits', benefits)
      })
  },
  addBenefit({ commit }, benefitTitle) {
    return this.$axios.$post('/api/mains/1/benefits', { title: benefitTitle })
      .then(response => commit('addBenefit', response.data))
  },
}

export const mutations = {
  setAllBenefits(state, benefits) {
    benefits.sort((a, b) => {
      let index1 = a.benefitIndexSort
      let index2 = b.benefitIndexSort
      return index1 - index2
    })
    state.benefits = benefits
  },
  setBenefits(state, benefits) {
    state.benefits = benefits
  },
  toggleSorting(state) {
    state.sorting = !state.sorting
  },
  updateBenefitEntry(state, benefitEntry) {
    const index = state.benefits.findIndex(benefit => benefit.identifier === benefitEntry.identifier)
    state.benefits[index] = benefitEntry
    state.benefits = [ ...state.benefits ]
  },
  deleteBenefit(state, benefitEntry) {
    state.benefits = state.benefits.filter(benefit => benefit.identifier !== benefitEntry.identifier)
  },
  updateSortIndexes(state) {
    state.benefits.forEach((item, index) => {
      item.benefitIndexSort = index
    })
  },
  addBenefit(state, benefitEntry) {
    state.benefits.push(benefitEntry)
  },
  toggleLoading(state) {
    state.loading = !state.loading
  }
}

export const getters = {
  getAllBenefits(state) {
    return state.benefits
  },
  getLoading(state) {
    return state.loading
  }}
