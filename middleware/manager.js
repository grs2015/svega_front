export default function ({ app, redirect }) {
  if (!(app.$auth.user.userRole === 'manager' || app.$auth.user.userRole === 'admin')) {
    redirect('/admin')
  }
}
