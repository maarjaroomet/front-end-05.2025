import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './counterSlice.ts'
import { useDispatch, useSelector } from 'react-redux'

export const store = configureStore({
  reducer: {
    counter: counterReducer
  }
})

// Infer the `RootState`,  `AppDispatch`, and `AppStore` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
export type AppStore = typeof store

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()