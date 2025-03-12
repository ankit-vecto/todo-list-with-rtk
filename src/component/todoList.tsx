"use client";
import {
  deleteTodo,
  taskCompleted,
  TodoState,
  updateTodo,
} from "@/redux/slices";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

interface Task {
  id: string;
  text: string;
  completed: boolean;
}

const TodoList = () => {
  const dispatch = useDispatch();
  const { items } = useSelector((state: TodoState) => state);

  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
  const [editedTaskText, setEditedTaskText] = useState<string>("");

  const startEditingTask = (id: string, text: string): void => {
    setEditingTaskId(id);
    setEditedTaskText(text);
  };

  const updateTask = (id: string): void => {
    if (editedTaskText.trim() !== "") {
      dispatch(updateTodo({ id, text: editedTaskText }));
      setEditingTaskId(null);
      setEditedTaskText("");
    }
  };

  const toggleTaskCompletion = (id: string) => {
    dispatch(taskCompleted(id));
  };

  const deleteTask = (id: string) => {
    dispatch(deleteTodo(id));
  };

  return (
    <div className="flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900">
      {items.length !== 0 ? (
        <div className="w-full bg-white dark:bg-gray-800 shadow rounded-lg p-6">
          <div className="space-y-2">
            {items?.map((task: Task) => (
              <div
                key={task.id}
                className=" w-full flex items-center justify-between bg-gray-100 dark:bg-gray-700 rounded-md px-4 py-2"
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
                      onChange={(e) => setEditedTaskText(e.target.value)}
                      onKeyDown={(e) =>
                        e.key === "Enter" && updateTask(task.id)
                      }
                      className="flex-1 px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200"
                    />
                  ) : (
                    <span className="flex-1 text-gray-800 dark:text-gray-200">
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
                    onClick={() => deleteTask(task.id)}
                    className="bg-red-500 hover:bg-red-600 text-white font-medium py-1 px-2 rounded-md"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
          <div className="text-center text-gray-800 dark:text-gray-200">
            No tasks found. Add a new one by clicking on the Add button above.
          </div>
        </div>
      )}
    </div>
  );
};

export default TodoList;
