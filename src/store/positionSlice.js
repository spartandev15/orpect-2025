import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { BASE_URL } from '../api/baseUrl';
import { getFromLocalStorage } from '../helper';

export const fetchPosition = createAsyncThunk('data/fetchPosition', async (_, { getState }) => {
  const  token  = getFromLocalStorage('token');
  try {
    const response = await fetch(`${BASE_URL}/getPositions`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    // Check if the response is valid JSON
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      throw new Error('Invalid response format');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
    throw error;  
  }
});


// Define the initial state
const initialState = {
  data: null,
  isLoading: false,
  error: null
};

// Create a slice using createSlice
const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosition.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchPosition.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(fetchPosition.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  }
});
export default dataSlice.reducer;



// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import { BASE_URL } from '../api/baseUrl';
// import { getFromLocalStorage } from '../helper';

// // Async thunk to fetch data (read operation)
// export const fetchPosition = createAsyncThunk('data/fetchData', async (_, { getState }) => {
//   const token = getFromLocalStorage('token');
//   try {
//     const response = await fetch(`${BASE_URL}/getPositions`, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });

//     const data = await response.json();
//     return data;
//   } catch (error) {
//     console.error('Error:', error);
//     throw error;
//   }
// });

// // Async thunk to create data
// export const createData = createAsyncThunk('data/createData', async (dataToCreate, { getState }) => {
//   const token = getFromLocalStorage('token');
//   try {
//     const response = await fetch(`${BASE_URL}/addPositions`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: `Bearer ${token}`,
//       },
//       body: JSON.stringify(dataToCreate),
//     });

//     const createdData = await response.json();
//     return createdData;
//   } catch (error) {
//     console.error('Error:', error);
//     throw error;
//   }
// });

// // Async thunk to update data
// export const updateData = createAsyncThunk('data/updateData', async ({ id, updatedData }, { getState }) => {
//   const token = getFromLocalStorage('token');
//   try {
//     const response = await fetch(`${BASE_URL}/updatePosition/${id}`, {
//       method: 'PUT',
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: `Bearer ${token}`,
//       },
//       body: JSON.stringify(updatedData),
//     });

//     const updatedDataResponse = await response.json();
//     return updatedDataResponse;
//   } catch (error) {
//     console.error('Error:', error);
//     throw error;
//   }
// });

// // Async thunk to delete data
// export const deleteData = createAsyncThunk('data/deleteData', async (id, { getState }) => {
//   const token = getFromLocalStorage('token');
//   try {
//     const response = await fetch(`${BASE_URL}/removePosition/${id}`, {
//       method: 'DELETE',
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });

//     if (response.ok) {
//       return id; // Return the deleted data ID
//     } else {
//       throw new Error('Failed to delete data');
//     }
//   } catch (error) {
//     console.error('Error:', error);
//     throw error;
//   }
// });

// // Define the initial state
// const initialState = {
//   data: [],
//   isLoading: false,
//   error: null,
// };

// // Create a slice using createSlice
// const dataSlice = createSlice({
//   name: 'data',
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchData.pending, (state) => {
//         state.isLoading = true;
//         state.error = null;
//       })
//       .addCase(fetchData.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.data = action.payload;
//       })
//       .addCase(fetchData.rejected, (state, action) => {
//         state.isLoading = false;
//         state.error = action.error.message;
//       })
//       .addCase(createData.fulfilled, (state, action) => {
//         state.data.push(action.payload); // Append the payload to the data array
//       })
//       .addCase(updateData.fulfilled, (state, action) => {
//         const updatedDataIndex = state.data.findIndex((item) => item.id === action.payload.id);
//         if (updatedDataIndex !== -1) {
//           state.data[updatedDataIndex] = action.payload;
//         }
//       })
//       .addCase(deleteData.fulfilled, (state, action) => {
//         state.data = state.data.filter((item) => item.id !== action.payload);
//       });
//   },
// });

// export default dataSlice.reducer;
