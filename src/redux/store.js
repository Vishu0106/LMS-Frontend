import {configureStore} from '@reduxjs/toolkit'
import authReducer from './slices/authSlice.js'
import courseReducer from './slices/courseSlice.js'

const store = configureStore({
    reducer:{
        auth: authReducer,
        course:courseReducer
    },
    middleware: (getDefaultMiddleware) =>getDefaultMiddleware({serializableCheck:false}),
    devTools:true
});

export default store;