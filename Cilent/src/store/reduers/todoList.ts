import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { TodoList } from "../../interface";

const initialTodoList: TodoList[] = [];

export const getTodoList: any = createAsyncThunk(
  "todoList/getAllTodoList",
  async () => {
    const response = await axios.get("http://localhost:8080/todoList");
    return response.data;
  }
);

export const addTodo: any = createAsyncThunk(
  "todoList/addTodo",
  async (newTodo: { name: string; status: boolean }) => {
    const response = await axios.post(
      "http://localhost:8080/todoList",
      newTodo
    );
    return response.data;
  }
);

export const checkTodo: any = createAsyncThunk(
  "todoList/checkTodo",
  async (id: number) => {
    const response = await axios.get(`http://localhost:8080/todoList/${id}`);
    const updatedTodo = { ...response.data, status: !response.data.status };
    await axios.put(`http://localhost:8080/todoList/${id}`, updatedTodo);
    return updatedTodo;
  }
);

export const deleteTodo: any = createAsyncThunk(
  "todoList/deleteTodo",
  async (id: number) => {
    await axios.delete(`http://localhost:8080/todoList/${id}`);
    return id;
  }
);

export const updateTodo: any = createAsyncThunk(
    "todoList/updateTodo",
    async ({ id, newName }: { id: number, newName: string }) => {
      const response = await axios.get(`http://localhost:8080/todoList/${id}`);
      const updatedTodo = { ...response.data, name: newName };
      await axios.put(`http://localhost:8080/todoList/${id}`, updatedTodo);
      return updatedTodo;
    }
);

const todoListReducer = createSlice({
    name: "todoLists",
    initialState: {
      todoList: initialTodoList,
    },
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(getTodoList.fulfilled, (state, action) => {
          state.todoList = action.payload;
        })
        .addCase(addTodo.fulfilled, (state, action) => {
          state.todoList.push(action.payload);
        })
        .addCase(checkTodo.fulfilled, (state, action) => {
          const index = state.todoList.findIndex(
            (todo: TodoList) => todo.id === action.payload.id
          );
          if (index !== -1) {
            state.todoList[index] = action.payload;
          }
        })
        .addCase(deleteTodo.fulfilled, (state, action) => {
          state.todoList = state.todoList.filter(
            (todo: TodoList) => todo.id !== action.payload
          );
        })
        .addCase(updateTodo.fulfilled, (state, action) => {
          const index = state.todoList.findIndex(
            (todo: TodoList) => todo.id === action.payload.id
          );
          if (index !== -1) {
            state.todoList[index] = action.payload;
          }
        });
    },
  });
  
  export default todoListReducer.reducer;
  