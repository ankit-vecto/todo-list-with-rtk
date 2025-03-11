import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

export interface TodoState {
  items: Todo[];
  loading: boolean;
  error: string | null;
}

const initialState: TodoState = {
  items: [],
  loading: false,
  error: null,
};

const todoSlice = createSlice({
  name: "todoList",
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<Todo>) => {
      state.items.push(action.payload);
    },
    deleteTodo: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    updateTodo: (
      state,
      action: PayloadAction<{ id: string; text: string }>
    ) => {
      const updatedItem = state.items.find(
        (item) => item.id === action.payload.id
      );
      if (updatedItem) {
        updatedItem.text = action.payload.text;
      }
    },
    taskCompleted: (state, action: PayloadAction<string>) => {
      const completedItem = state.items.find(
        (item) => item.id === action.payload
      );
      if (completedItem) {
        completedItem.completed = !completedItem.completed;
      }
    },
  },
});

export const { addTodo, deleteTodo, updateTodo, taskCompleted } =
  todoSlice.actions;
export default todoSlice.reducer;
