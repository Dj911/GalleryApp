const dashboard = document.getElementById('dashboard')
const gallery = document.getElementById('gallery')
const favourites = document.getElementById('favourites')

const logout = document.getElementById('logout')


dashboard.href = `/dashboard/?userid=${localStorage.getItem('userid')}`
gallery.href = `/gallery/?userid=${localStorage.getItem('userid')}`
favourites.href = `/favourites/?userid=${localStorage.getItem('userid')}`
logout.href = `/`




