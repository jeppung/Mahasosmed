import { IAPIUserDetailResponse } from "@/interfaces/api_interface";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: { data?: IAPIUserDetailResponse } = {};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUser: (
      state,
      action: PayloadAction<IAPIUserDetailResponse | undefined>
    ) => {
      state.data = action.payload;
    },
  },
});

export const { updateUser } = userSlice.actions;
export default userSlice.reducer;
