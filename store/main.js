export const state = () => ({
  main: {},
  loading: false,
  loadingSlogan: false,
  loadingMainImage: false,
  loadingParallaxImages: false
})

export const actions = {
  updateSlogan({ commit }, sloganData) {
    return this.$axios.$put('/api/mains/1', sloganData)
      .then(response => commit('setMain', response.data))
  },
  updateContact({ commit }, contactData) {
    return this.$axios.$put('/api/mains/1', contactData)
      .then(response => commit('setMain', response.data))
  },
  updateMainImage({ commit }, mainSloganImageData) {
    return this.$axios.$post('/api/mains/1', mainSloganImageData)
      .then(response => commit('setMain', response.data))
  },
  updateParallaxImages({ commit }, parallaxImagesData) {
    return this.$axios.$post('/api/mains/1', parallaxImagesData)
      .then(response => commit('setMain', response.data))
  },
}

export const mutations = {
  setMain(state, main) {
    state.main = { ...main }
  },
  toggleLoading(state) {
    state.loading = !state.loading
  },
  toggleLoadingSlogan(state) {
    state.loadingSlogan = !state.loadingSlogan
  },
  toggleLoadingMainImage(state) {
    state.loadingMainImage = !state.loadingMainImage
  },
  toggleLoadingParallaxImages(state) {
    state.loadingParallaxImages = !state.loadingParallaxImages
  }

}

export const getters = {
  getMain(state) {
    return state.main
  },
  getLoading(state) {
    return state.loading
  },
  getLoadingSlogan(state) {
    return state.loadingSlogan
  },
  getLoadingMainImage(state) {
    return state.loadingMainImage
  },
  getLoadingParallaxImages(state) {
    return state.loadingParallaxImages
  }

}
