import { reactive } from 'vue'

const navState = reactive({
  sideNav: false
})

function toggleNav () {
  navState.sideNav = !navState.sideNav
}

export function useNav () {
  return {
    navState,
    toggleNav
  }
}
