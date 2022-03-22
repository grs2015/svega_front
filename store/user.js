export const state = () => ({
  currentUserRole: '',
  isRegularUser: false
})

export const actions = {
  createUser(_, formData) {
    return this.$axios.$post('/api/users', formData)
  },
  getUsers(_, formData) {
    return this.$axios.$get('/api/users')
  },
  deleteUser(_, userIndex) {
    return this.$axios.$delete(`/api/users/${ userIndex }`)
  },
  updateUser(_, formData) {
    let { data, id } = formData
    return this.$axios.$put(`/api/users/${ id }`, data)
  },

}

export const mutations = {
  setCurrentUserRole(state, userRole) {
    state.currentUserRole = userRole
    state.isRegularUser = userRole === 'regular' ? true : false
  }
}

export const getters = {

}
