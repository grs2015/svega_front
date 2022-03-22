export const state = () => ({
  sections: [],
  sectionEntry: {},
  loading: false
})

export const actions = {
  fetchAllSections({ commit }) {
    return this.$axios.$get('/api/sections')
      .then(response => commit('setAllSections', response.data))
  },
  updateAllSections({ commit }, sectionsData) {
    const promiseArray = []
    sectionsData.forEach(item => {
      let data = { title: item.sectionTitle, description: item.sectionDescription }
      let promise = () => this.$axios.$put(`/api/sections/${item.identifier}`, data)
      promiseArray.push(promise())
    })
    return Promise.all(promiseArray)
      .then(response => response.forEach(item => commit('updateAllSections', item.data)))

  }
}

export const mutations = {
  setAllSections(state, sections) {
    state.sections = sections
  },
  updateAllSections(state, sectionItem) {
    state.sections.forEach(section => {
      if (section.identifier === sectionItem.identifier) {
        section.sectionTitle = sectionItem.sectionTitle
        section.sectionDescription = sectionItem.sectionDescription
      }
    })
  },
  toggleLoading(state) {
    state.loading = !state.loading
  },
  setSections(state, sections) {
    state.sections = sections
  },
}

export const getters = {
  getAllSections(state) {
    return state.sections
  },
  getLoading(state) {
    return state.loading
  }
}
