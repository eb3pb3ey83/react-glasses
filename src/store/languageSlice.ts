import { createSlice } from '@reduxjs/toolkit'

// { contacts: [...] }

export const contactSlice = createSlice({
  name: 'contacts',
  initialState: {
    language: window.localStorage.getItem('language'),
  },
  reducers: {
    setLanguage: (state, { payload }) => {
      state.language = payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setLanguage } = contactSlice.actions

export default contactSlice.reducer
