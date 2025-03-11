"use client";
import { addTodo, deleteTodo, taskCompleted, updateTodo } from "@/redux/slices";
import React, { useState, useEffect, ChangeEvent, KeyboardEvent } from "react";
import { useDispatch, useSelector } from "react-redux";

const TodoList = () => {
  const dispatch = useDispatch<any>();
  const { items } = useSelector((state: any) => state);
  const [editingTaskId, setEditingTaskId] = useState<number | null>(null);
  const [editedTaskText, setEditedTaskText] = useState<string>("");
  const [newTask, setNewTask] = useState<any>({
    id: Date.now(),
    text: "",
    completed: false,
  });
  const addTask = () => {
    if (newTask.text.trim() !== "") {
      dispatch(addTodo(newTask));
      setNewTask({ id: Date.now(), text: "", completed: false });
    } else {
      alert("Cannot add an empty task");
    }
  };
  const startEditingTask = (id: number, text: string): void => {
    setEditingTaskId(id);
    setEditedTaskText(text);
  };
  const updateTask = (id: number): void => {
    if (editedTaskText.trim() !== "") {
      dispatch(updateTodo({ id: id, text: editedTaskText, completed: false }));
      setEditingTaskId(null);
      setEditedTaskText("");
    }
  };
  const toggleTaskCompletion = (id: number) => {
    dispatch(taskCompleted(id));
  };
  const deleteTask = (id: number) => {
    dispatch(deleteTodo(id));
  };
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 dark:bg-gray-900">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-200">
          Todo List
        </h1>
        <div className="flex items-center mb-4">
          <input
            type="text"
            placeholder="Add a new task"
            value={newTask.text}
            onChange={(e) => setNewTask({ ...newTask, text: e.target.value })}
            className="flex-1 mr-2 px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200"
          />

          <button
            onClick={addTask}
            className="bg-black hover:bg-slate-800 text-white font-medium py-2 px-4 rounded-md"
          >
            Add
          </button>
        </div>
        <div className="space-y-2">
          {items?.map((task: any) => {
            return (
              <div
                key={task.id}
                className="flex items-center justify-between bg-gray-100 dark:bg-gray-700 rounded-md px-4 py-2"
              >
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleTaskCompletion(task.id)}
                    className="mr-2"
                  />
                  {editingTaskId === task.id ? (
                    <input
                      type="text"
                      value={editedTaskText}
                      onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        setEditedTaskText(e.target.value)
                      }
                      onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => {
                        if (e.key === "Enter") {
                          updateTask(task?.id);
                        }
                      }}
                      className="flex-1 px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200"
                    />
                  ) : (
                    <span
                      className={`flex-1 text-gray-800 dark:text-gray-200 `}
                    >
                      {task.text}
                    </span>
                  )}
                </div>
                <div className="flex items-center">
                  {editingTaskId === task.id ? (
                    <button
                      onClick={() => updateTask(task.id)}
                      className="bg-black hover:bg-slate-800 text-white font-medium py-1 px-2 rounded-md mr-2"
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      onClick={() => startEditingTask(task.id, task.text)}
                      className="bg-gray-300 hover:bg-gray-400 text-gray-800 dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-gray-200 font-medium py-1 px-2 rounded-md mr-2"
                    >
                      Edit
                    </button>
                  )}
                  <button
                    onClick={() => deleteTask(task?.id)}
                    className="bg-red-500 hover:bg-red-600 text-white font-medium py-1 px-2 rounded-md"
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TodoList;
