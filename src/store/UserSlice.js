import { createAsyncThunk , createSlice} from "@reduxjs/toolkit";
import LoginRoute from '../routes/LoginRoute';

export const loginUser= createAsyncThunk(
    'user/loginUser',
    async() =>{

    }
);

const userSlice = createSlice({
    name: 'user',
    initialState:{
        loading:false,
        user: null,
        error: null
    }
});

export default userSlice.reducer ;