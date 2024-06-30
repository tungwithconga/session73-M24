import { configureStore } from "@reduxjs/toolkit";
import todoList from "./reduers/todoList";



export const store = configureStore({
    reducer: {
        todoLists: todoList
    }
})