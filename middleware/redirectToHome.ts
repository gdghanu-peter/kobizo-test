export default defineNuxtRouteMiddleware((to) => {
    if (to.path === '/post') {
      return navigateTo('/')
    }
  })