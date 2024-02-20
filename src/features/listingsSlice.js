import { createSlice } from '@reduxjs/toolkit';
import { fetchListingsApi } from '../apis/api';

export const listingsSlice = createSlice({
  name: 'listings',
  initialState: {
    listings: [],
  },
  reducers: {
    setListings: (state, action) => {
      state.listings = action.payload;
    },
  },
});

export const { setListings } = listingsSlice.actions;

export const fetchListingsAsync = (token) => async (dispatch) => {
  try {
    const listings = await fetchListingsApi(token);
    dispatch(setListings(listings));
  } catch (error) {
    console.error('Error during fetching listings:', error);
  }
};

export const selectListings = (state) => state.listings.listings;

export default listingsSlice.reducer;
