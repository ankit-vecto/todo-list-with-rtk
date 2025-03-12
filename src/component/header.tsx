"use client";
import { addTodo } from "@/redux/slices";
import React, { useState } from "react";
import { useDispatch } from "react-redux";

const Header = () => {
  const [newTaskText, setNewTaskText] = useState<string>("");
  const dispatch = useDispatch();

  const addTask = () => {
    if (newTaskText.trim() !== "") {
      dispatch(
        addTodo({
          id: Date.now().toString(),
          text: newTaskText,
          completed: false,
        })
      );
      setNewTaskText("");
    }
  };
  return (
    <div className="w-full bg-white dark:bg-gray-800 shadow rounded-lg p-6">
      <div className="w-full flex items-center justify-between bg-gray-50 dark:bg-gray-700 rounded-md px-4 py-2">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
          Todo List
        </h1>
        <div className="flex">
          <input
            type="text"
            placeholder="Add a new task"
            value={newTaskText}
            onChange={(e) => setNewTaskText(e.target.value)}
            className="flex-1 mr-2 px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200"
          />
          <button
            onClick={addTask}
            className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-md"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
