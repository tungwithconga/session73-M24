import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addTodo,
  deleteTodo,
  getTodoList,
  checkTodo,
  updateTodo, // Import updateTodo action
} from "../store/reduers/todoList";
import { TodoList } from "../interface";
import ModalWarning from "./Modal/ModalWarning";
import ModelDelete from "./Modal/ModelDelete";

export default function Index() {
  const [inputValue, setInputValue] = useState<string>("");
  const [error, setError] = useState<boolean>(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [editTodo, setEditTodo] = useState<TodoList | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>("all");

  const getData: TodoList[] = useSelector(
    (state: any) => state.todoLists.todoList
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTodoList());
  }, [dispatch]);

  const handleClickAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim() === "") {
      setError(true);
      return;
    }
    if (editTodo) {
      // Update Todo name
      dispatch(updateTodo({ id: editTodo.id, newName: inputValue }));
      setEditTodo(null);
    } else {
      // Add new Todo
      if (getData.some((todo) => todo.name === inputValue.trim())) {
        setError(true);
        return;
      }
      const newTodo = {
        name: inputValue,
        status: false,
      };
      dispatch(addTodo(newTodo));
    }
    setInputValue("");
    setError(false);
  };

  const closeModalWarning = () => {
    setError(false);
  };

  const handleToggleStatus = (id: number) => {
    dispatch(checkTodo(id));
  };

  const handleDelete = (id: number) => {
    setDeleteId(id);
  };

  const confirmDelete = () => {
    if (deleteId !== null) {
      dispatch(deleteTodo(deleteId))
        .then(() => {
          setDeleteId(null);
        })
        .catch((error: any) => {
          console.error(error);
        });
    }
  };

  const closeModalDelete = () => {
    setDeleteId(null);
  };

  const handleUpdate = (todo: TodoList) => {
    setEditTodo(todo);
    setInputValue(todo.name);
  };

  const filteredTodoList = () => {
    if (filterStatus === "completed") {
      return getData.filter((todo) => todo.status);
    } else if (filterStatus === "incomplete") {
      return getData.filter((todo) => !todo.status);
    } else {
      return getData;
    }
  };

  return (
    <>
      <section className="vh-100 gradient-custom">
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col col-xl-10">
              <div className="card">
                <div className="card-body p-5">
                  <form
                    onSubmit={handleClickAdd}
                    className="d-flex justify-content-center align-items-center mb-4"
                  >
                    <div className="form-outline flex-fill">
                      <input
                        onChange={(e) => setInputValue(e.target.value)}
                        value={inputValue}
                        type="text"
                        id="form2"
                        className="form-control"
                      />
                      <label className="form-label" htmlFor="form2">
                        Nhập tên công việc
                      </label>
                    </div>
                    <button type="submit" className="btn btn-info ms-2">
                      Thêm
                    </button>
                  </form>
                  {/* Tabs navs */}
                  <ul className="nav nav-tabs mb-4 pb-2">
                    <li className="nav-item cursor-pointer" role="presentation">
                      <a
                        className={`nav-link ${
                          filterStatus === "all" ? "active" : ""
                        }`}
                        onClick={() => setFilterStatus("all")}
                      >
                        Tất cả
                      </a>
                    </li>
                    <li className="nav-item cursor-pointer" role="presentation">
                      <a
                        className={`nav-link ${
                          filterStatus === "completed" ? "active" : ""
                        }`}
                        onClick={() => setFilterStatus("completed")}
                      >
                        Đã hoàn thành
                      </a>
                    </li>
                    <li className="nav-item cursor-pointer" role="presentation">
                      <a
                        className={`nav-link ${
                          filterStatus === "incomplete" ? "active" : ""
                        }`}
                        onClick={() => setFilterStatus("incomplete")}
                      >
                        Chưa hoàn thành
                      </a>
                    </li>
                  </ul>
                  {/* Tabs content */}
                  <div className="tab-content" id="ex1-content">
                    <div className="tab-pane fade show active">
                      <ul className="list-group mb-0">
                        {filteredTodoList().map((todoList: TodoList) => (
                          <li
                            key={todoList.id}
                            className="list-group-item d-flex align-items-center justify-content-between border-0 mb-2 rounded"
                            style={{ backgroundColor: "#f4f6f7" }}
                          >
                            <div>
                              <input
                                onChange={() => handleToggleStatus(todoList.id)}
                                className="form-check-input me-2"
                                type="checkbox"
                                checked={todoList.status}
                              />
                              {todoList.status ? (
                                <s>{todoList.name}</s>
                              ) : (
                                <span>{todoList.name}</span>
                              )}
                            </div>
                            <div className="d-flex gap-3">
                              <i
                                onClick={() => handleUpdate(todoList)}
                                className="fas fa-pen-to-square text-warning"
                              />
                              <i
                                onClick={() => handleDelete(todoList.id)}
                                className="far fa-trash-can text-danger"
                              />
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  {/* Tabs content */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {error && <ModalWarning closeModalWarning={closeModalWarning} />}
      {deleteId !== null && (
        <ModelDelete
          ConfirmDelete={confirmDelete}
          closeModalDelete={closeModalDelete}
        />
      )}
    </>
  );
}
