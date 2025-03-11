import { createSlice } from "@reduxjs/toolkit";
import { error } from "console";

const todoSlice = createSlice({
  name: "todoList",
  initialState: {
    items: [],
    loading: null,
    error: null,
  },
  reducers: {
    addTodo: (state: any, action: any) => {
      state.loading = true;
      state.items.push(action.payload);
      state.loading = false;
    },
    deleteTodo: (state: any, action: any) => {
      state.loading = true;
      state.items = state.items.filter(
        (item: any) => item.id !== action.payload
      );
      state.loading = false;
    },
    updateTodo: (state: any, action) => {
      state.loading = true;
      const updatedItemIndex = state.items.findIndex(
        (item: any) => item.id === action.payload.id
      );
      if (updatedItemIndex !== -1) {
        state.items[updatedItemIndex] = {
          ...state.items[updatedItemIndex],
          text: action.payload.text,
        };
      }
      state.loading = false;
    },
    taskCompleted: (state: any, action) => {
      state.loading = true;
      const completedItemIndex = state.items.findIndex(
        (item: any) => item.id === action.payload
      );
      if (completedItemIndex !== -1) {
        state.items[completedItemIndex].completed =
        !state.items[completedItemIndex].completed;
      }
      state.loading = false;
    },
  },
});

export const { addTodo, deleteTodo, updateTodo, taskCompleted } =
  todoSlice.actions;
export default todoSlice.reducer;
