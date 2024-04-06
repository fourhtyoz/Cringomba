export const selectMode = state => state.mode
export const selectUser = state => state.user
export const selectIsLoggedIn = state => Boolean(state.user?.email)