import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isOpen: false,
  weekFormOpen: false,
  pageType: '',
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    toggle(state, action) {
      const { toggle } = action.payload;

      toggle === 'open' ? (state.isOpen = true) : (state.isOpen = false);
    },
    toggleWeekFrom(state, action) {
      const { toggle } = action.payload;

      toggle === 'open'
        ? (state.weekFormOpen = true)
        : (state.weekFormOpen = false);
    },
    setPageType(state, action) {
      state.pageType = action.payload;
    },
  },
});

export default modalSlice.reducer;

export const selectIsOpen = (state) => state.modal.isOpen;
export const selectWeekFormOpen = (state) => state.modal.weekFormOpen;
export const selectPageType = (state) => state.modal.pageType;

export const { toggle, toggleWeekFrom, setPageType } = modalSlice.actions;
