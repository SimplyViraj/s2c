import { createSlice,PayloadAction } from "@reduxjs/toolkit";
import type { Profile } from "@/types/user";
import { clear } from "console";

type ProfileState = {
  user: Profile | null;
};

const initialState: ProfileState = {
  user: null,
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setProfile: (state: ProfileState, action: PayloadAction<Profile | null>) => {
      state.user = action.payload;
    },
    clearProfile: (state: ProfileState) => {
      state.user = null;
    },
  },
});

export const { setProfile, clearProfile } = profileSlice.actions;

export default profileSlice.reducer;
