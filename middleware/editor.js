export default function ({ app, redirect }) {
  if (!(app.$auth.user.userRole === 'editor' || app.$auth.user.userRole === 'admin')) {
    redirect('/admin')
  }
}
