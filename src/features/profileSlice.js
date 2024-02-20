import { createSlice } from '@reduxjs/toolkit';

export const profileSlice = createSlice({
  name: 'profile',
  initialState: {
    isEditMode: false,
    editedProfile: {
      username: '',
      email: '',
      mobile_no: '',
      whatsapp_no: '',
    },
    showDeleteConfirmation: false,
    passwordForDelete: '',
  },
  reducers: {
    setEditMode: (state, action) => {
      state.isEditMode = action.payload;
    },
    setEditedProfile: (state, action) => {
      state.editedProfile = action.payload;
    },
    setShowDeleteConfirmation: (state, action) => {
      state.showDeleteConfirmation = action.payload;
    },
    setPasswordForDelete: (state, action) => {
      state.passwordForDelete = action.payload;
    },
  },
});

export const {
  setEditMode,
  setEditedProfile,
  setShowDeleteConfirmation,
  setPasswordForDelete,
} = profileSlice.actions;

export const selectProfile = (state) => state.profile;

export default profileSlice.reducer;
