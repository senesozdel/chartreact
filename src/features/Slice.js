import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'


const initialState = {
    source:"GetDataBySp",
    serverName: "",
    formData:"",
    loginName:"",
    password:"",
    fetchedData: [],
    loading : "",
    error: "",
    dataSetx_axis : [],
    dataSety_axis : []
}

export const fetchData = createAsyncThunk("fetchData",async ({formData,source})=>{

  const response = await axios.post(`https://localhost:7219/api/Data/${source}`,formData);
  console.log(response.data)
  return response.data;
})
export const Slice = createSlice({
  name: 'appStates',
  initialState,
  reducers: {
    setServerName:(state,action)=>{state.serverName = action.payload},
    setFormData:(state,action)=>{state.formData = action.payload},
    setLoginName:(state,action)=>{state.loginName = action.payload},
    setPassword:(state,action)=>{state.password = action.payload},
    setDataSetx_axis:(state,action)=>{state.dataSetx_axis = action.payload},
    setDataSety_axis:(state,action)=>{state.dataSety_axis = action.payload},
    setSource:(state,action) => {state.source = action.payload}
  },
  extraReducers:(builder)=>{
    builder.addCase(fetchData.pending,(state,action)=>{
      state.loading = true;
      state.error = ""
    });
    builder.addCase(fetchData.fulfilled,(state,action)=>{
      state.loading = false;
      state.fetchedData = action.payload
    });
    builder.addCase(fetchData.rejected,(state,action)=>{
      state.loading = false;
      state.error = "Error FETCHİNG"
    })
  }
})

// Action creators are generated for each case reducer function
export const {setFormData,setPassword,setServerName,setLoginName ,setDataSetx_axis,setDataSety_axis,setSource} = Slice.actions

export default Slice.reducer