import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Theme = "light" | "dark";

const initialState: Theme = (localStorage.getItem("theme") as Theme) || "light";

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      const newTheme: Theme = state === "light" ? "dark" : "light";
      localStorage.setItem("theme", newTheme);
      return newTheme;
    },
    setTheme: (_state, action: PayloadAction<Theme>) => {
      const newTheme = action.payload;
      localStorage.setItem("theme", newTheme);
      return newTheme;
    },
  },
});

export const { toggleTheme, setTheme } = themeSlice.actions;

export default themeSlice.reducer;
