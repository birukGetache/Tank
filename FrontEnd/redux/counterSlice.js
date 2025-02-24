import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  users: [],  // Initialize an empty array to hold user objects
  selectedCard: null,
};

const counterSlice = createSlice({
  name: 'counter',
  initialState,
  
  reducers: {
    // Add a new user with username, fatherName, and fileUrl to the array
    addUser: (state, action) => {
      const { username, fatherName, fileUrl } = action.payload; // Destructure fileUrl from action.payload
      state.users.push({ username, fatherName, fileUrl }); // Include fileUrl in the user object
    },
    selectCard: (state, action) => {
      state.selectedCard = action.payload;
    },

    // Optionally, you can add more reducers for other actions like deleting or updating
  },
});

// Export the action creator for adding a user
export const { addUser , selectCard } = counterSlice.actions;

// Export the reducer to be used in the store configuration
export default counterSlice.reducer;