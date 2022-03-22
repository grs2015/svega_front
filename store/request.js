export const state = () => ({

})

export const actions = {
  createRequest(_, formData) {
    return this.$axios.$post('/api/mains/1/contacts', formData)
  },
  updateContact(_, contactData) {
    let { id, data } = contactData
    return this.$axios.$put(`/api/contacts/${ id }`, data)
  },
  fetchRequests() {
    return this.$axios.$get('/api/contacts')
  },
  deleteContact(_, contactId) {
    return this.$axios.$delete(`/api/contacts/${ contactId }`)
  }
}

export const mutations = {

}

export const getters = {

}
