/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useRef, useState } from "react";
import {
  createTask,
  deleteTask,
  getTasks,
  updateTask,
} from "./services/taskApi";
import Taskform from "./components/Taskform";
import TaskCard from "./components/TaskCard";
import Sidebar from "./components/Sidebar";
import NavBar from "./components/NavBar";
import Header from "./components/Header";
import { toast } from "react-toastify";

function App() {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [deleteTaskId, setDeleteTaskId] = useState(null);
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark",
  );

  useEffect(() => {
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  const modalRef = useRef(null);

  const fetchTasks = async () => {
    try {
      const res = await getTasks();
      setTasks(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddTask = async (taskData) => {
    try {
      await createTask(taskData);

      toast.success("Task created successfully");
      fetchTasks();
    } catch (error) {
      toast.error("Falied to create task");
    }
  };

  // const handleDelete = async (id) => {
  //   if (deleteTaskId === null) {
  //     return;
  //   }
  //   toast.success("Task deleted");
  //   try {
  //     await deleteTask(id);
  //   } catch (error) {
  //     toast.error("Failed to delete task");
  //   }
  // };

  const confirmDelete = async () => {
    try {
      await deleteTask(deleteTaskId);
      toast.success("Task deleted");
      fetchTasks();
      setDeleteTaskId(null);
    } catch (error) {
      toast.error("Failed to delete task");
    }
  };

  const handleEdit = (task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        setIsModalOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    fetchTasks();
  });

  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(search.toLowerCase()),
  );

  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (sortBy === "newest") {
      return new Date(b.createdAt) - new Date(a.createdAt);
    }
    if (sortBy === "oldest") {
      return new Date(a.createdAt) - new Date(b.createdAt);
    }
    if (sortBy === "priority") {
      const order = { High: 3, Medium: 2, Low: 1 };
      return order[b.priority] - order[a.priority];
    }
    return 0;
  });

  return (
    <div
      className={`${darkMode ? "dark" : ""} min-h-screen bg-gray-100 dark:bg-slate-950`}
    >
      <div className="flex">
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main className="flex-1 lg:ml-0 p-4 md:p-8">
          <div className="sticky top-0 z-30 pb-6">
            <NavBar
              search={search}
              setSearch={setSearch}
              setSidebarOpen={setSidebarOpen}
              darkMode={darkMode}
              setDarkMode={setDarkMode}
            />
          </div>
          <Header
            sortBy={sortBy}
            setSortBy={setSortBy}
            setIsModalOpen={setIsModalOpen}
            setEditingTask={setEditingTask}
          />

          <div className="bg-white dark:bg-gray-900 rounded-3xl p-6 shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {sortedTasks.length === 0 && (
                <div className="text-center py-20">
                  <h3 className="text-xl font-semibold text-gray-700">
                    No Tasks Found
                  </h3>
                  <p className="text-gray-500 mt-2">
                    Create your first task to get started.
                  </p>
                </div>
              )}
              {sortedTasks.map((task) => (
                <TaskCard
                  key={task._id}
                  task={task}
                  onDelete={confirmDelete}
                  onEdit={handleEdit}
                  onStatusUpdate={fetchTasks}
                  setDeleteTaskId={setDeleteTaskId}
                />
              ))}
            </div>
          </div>
        </main>
      </div>

      {/* modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div
            ref={modalRef}
            className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-xl w-full max-w-xl"
          >
            <Taskform
              editingTask={editingTask}
              setEditingTask={setEditingTask}
              setIsModalOpen={setIsModalOpen}
              onAddTask={handleAddTask}
            />
          </div>
        </div>
      )}

      {/* delete modal */}
      {deleteTaskId && (
        <div
          className="
      fixed inset-0 z-50
      flex items-center justify-center
      bg-black/30
      backdrop-blur-md
    "
          onClick={() => setDeleteTaskId(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="
        w-full
        max-w-md
        mx-4
        bg-white
        dark:bg-slate-800
        rounded-3xl
        shadow-2xl
        overflow-hidden
      "
          >
            <div className="p-8 text-center">
              <div
                className="
            h-16 w-16
            mx-auto
            rounded-2xl
            bg-red-100
            flex items-center justify-center
          "
              >
                🗑️
              </div>

              <h2 className="mt-5 text-2xl font-bold text-gray-900 dark:text-white">
                Delete Task?
              </h2>

              <p className="mt-2 text-gray-500 dark:text-slate-400">
                This action cannot be undone.
              </p>
            </div>

            <div
              className="
          flex gap-3
          p-6
          bg-gray-50
          dark:bg-slate-800
        "
            >
              <button
                onClick={() => setDeleteTaskId(null)}
                className="
            flex-1
            h-12
            rounded-xl
            border
            border-gray-200
            dark:border-slate-700
            hover:bg-white
            dark:hover:bg-slate-700
            dark:text-slate-300
          "
              >
                Cancel
              </button>

              <button
                onClick={confirmDelete}
                className="
            flex-1
            h-12
            rounded-xl
            bg-red-500
            text-white
            hover:bg-red-600
          "
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
