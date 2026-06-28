/* eslint-disable no-unused-vars */
import {
  Calendar,
  CheckCircle2,
  Circle,
  Clock3,
  Flag,
  MoreVertical,
  Pencil,
  Trash2,
} from "lucide-react";
import { updateTask } from "../services/taskApi";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

const TaskCard = ({ task, onEdit, onStatusUpdate, setDeleteTaskId }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const priorityStyles = {
    High: "bg-red-100 text-red-600",
    Medium: "bg-yellow-100 text-yellow-600",
    Low: "bg-green-100 text-green-600",
  };
  const statusStyles = {
    Pending: "bg-gray-100 text-gray-600",
    "In Progress": "bg-blue-100 text-blue-600",
    Completed: "bg-green-100 text-green-600",
  };
  const handleStatusChange = async (status) => {
    try {
      await updateTask(task._id, {
        ...task,
        status,
      });

      toast.success(`Status changed to ${status}`);

      setMenuOpen(false);
      onStatusUpdate();
    } catch (error) {
      toast.error("Failed to update status");
    }
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });

  return (
    <>
      <div
        className="
        bg-white dark:bg-slate-800
        rounded-2xl
        p-5
        border border-gray-100 dark:border-slate-700
        shadow-sm
        hover:shadow-lg
        hover:-translate-y-1
        transition-all duration-300
      "
      >
        {/* Top */}
        <div className="flex items-start justify-between">
          <h3 className="font-semibold text-2xl text-gray-800 dark:text-white line-clamp-1 uppercase">
            {task.title}
          </h3>

          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 rounded-lg text-gray-500 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-600"
            >
              <MoreVertical size={18} />
            </button>
            {/* menu */}
            {menuOpen && (
              <>
                <div
                  className="
    absolute
    right-0
    top-12
    w-72
    bg-white
    dark:bg-slate-800
    rounded-3xl
    shadow-xl
    border border-gray-100 dark:border-gray-600
    overflow-hidden
  "
                >
                  {/* Current Status */}
                  <div className="p-4 border-b border-gray-100">
                    <p className="text-xs uppercase tracking-wider text-gray-400">
                      Current Status
                    </p>

                    <div className="flex items-center gap-3 mt-2">
                      <div className="h-10 w-10 rounded-xl bg-indigo-50 dark:bg-slate-700 flex items-center justify-center">
                        <Clock3 className="text-indigo-600" size={18} />
                      </div>

                      <span className="font-medium text-indigo-600 dark:text-gray-300">
                        {task.status}
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="p-2">
                    <button
                      onClick={() => {
                        setMenuOpen(false);
                        onEdit(task);
                      }}
                      className="
        flex items-center gap-3
        w-full
        p-3
        rounded-2xl
        hover:bg-gray-50
        dark:hover:bg-gray-700
        transition
        dark:text-gray-200
      "
                    >
                      <Pencil size={18} />
                      Edit Task
                    </button>
                  </div>

                  {/* Status */}
                  <div className="border-t border-gray-100 p-2 dark:text-gray-200">
                    <button
                      onClick={() => handleStatusChange("Pending")}
                      className="
        flex items-center gap-3
        w-full
        p-3
        rounded-2xl
        hover:bg-gray-50
        dark:hover:bg-gray-700
      "
                    >
                      <Circle size={18} />
                      Pending
                    </button>

                    <button
                      onClick={() => handleStatusChange("In Progress")}
                      className="
        flex items-center gap-3
        w-full
        p-3
        rounded-2xl
        hover:bg-indigo-50
        dark:hover:bg-gray-700
      "
                    >
                      <Clock3 size={18} className="text-indigo-600" />
                      In Progress
                    </button>

                    <button
                      onClick={() => handleStatusChange("Completed")}
                      className="
        flex items-center gap-3
        w-full
        p-3
        rounded-2xl
        hover:bg-green-50
        dark:hover:bg-gray-700
      "
                    >
                      <CheckCircle2 size={18} className="text-green-600" />
                      Completed
                    </button>
                  </div>

                  {/* Delete */}
                  <div className="border-t border-gray-100 p-2">
                    <button
                      onClick={() => {
                        setMenuOpen(false);
                        setDeleteTaskId(task._id);
                      }}
                      className="
        flex items-center gap-3
        w-full
        p-3
        rounded-2xl
        text-red-500
        hover:bg-red-50
        dark:hover:bg-gray-700
      "
                    >
                      <Trash2 size={18} />
                      Delete Task
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-500 dark:text-slate-400 text-sm mt-2 line-clamp-2 min-h-[40px]">
          {task.description || "No description provided"}
        </p>

        {/* Badges */}
        <div className="flex gap-2 mt-4 flex-wrap">
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium ${priorityStyles[task.priority]}`}
          >
            <Flag size={12} className="inline mr-1" />
            {task.priority}
          </span>

          <span
            className={`px-3 py-1 rounded-full text-xs font-medium ${statusStyles[task.status]}`}
          >
            {task.status}
          </span>
        </div>

        {/* Due Date */}
        {task.dueDate && (
          <div className="mt-4 text-gray-500 dark:text-gray-300 text-sm">
            <span>Deadline:</span>
            <div className="flex items-center gap-2 text-sm mt-1 font-semibold">
              <Calendar size={15} />
              {new Date(task.dueDate).toLocaleDateString()}
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-100 dark:border-gray-700">
          <button
            onClick={() => onEdit(task)}
            className="
            flex items-center gap-2
            text-indigo-600
            hover:text-indigo-700
            dark:hover:bg-slate-700
            hover:bg-indigo-200
            font-medium
            px-6 py-2
            rounded-xl
            transition-colors
            duration-200
          "
          >
            <Pencil size={16} />
            Edit
          </button>

          <button
            onClick={() => setDeleteTaskId(task._id)}
            className="
            flex items-center gap-2
            text-red-500
            hover:text-red-600
            dark:hover:bg-slate-700
            font-medium
            hover:bg-red-200
            px-6 py-2
            rounded-xl
            transition-colors
            duration-200
          "
          >
            <Trash2 size={16} />
            Delete
          </button>
        </div>
      </div>
    </>
  );
};

export default TaskCard;
