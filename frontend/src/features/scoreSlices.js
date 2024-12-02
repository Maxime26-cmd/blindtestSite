import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  maxScore: 0, // Score maximum atteint
};

const scoreSlice = createSlice({
  name: 'score',
  initialState,
  reducers: {
    setMaxScore(state, action) {
      state.maxScore = Math.max(state.maxScore, action.payload);
    },
  },
});

export const { setMaxScore } = scoreSlice.actions;
export default scoreSlice.reducer;
