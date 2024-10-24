import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IInitialState {
  isSidebarCollapsed: boolean;
  isDarkMode: boolean;
}

const initialState: IInitialState = {
  isSidebarCollapsed: false,
  isDarkMode: false,
};

export const globalSlice = createSlice({
  initialState,
  name: 'global',
  reducers: {
    setIsSidebarCollapsed: (state, action: PayloadAction<boolean>) => {
      state.isSidebarCollapsed = action.payload;
    },
    setIsDarkMode: (state, action: PayloadAction<boolean>) => {
      state.isDarkMode = action.payload;
    },
  },
});

export const { setIsDarkMode, setIsSidebarCollapsed } = globalSlice.actions;
export default globalSlice.reducer;
