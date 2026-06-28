/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from "react";
import { updateTask } from "../services/taskApi";
import {
  Calendar,
  CheckCircle2,
  Circle,
  Clock3,
  FileText,
  Flag,
} from "lucide-react";
import { toast } from "react-toastify";

const Taskform = ({ editingTask, setEditingTask, setIsModalOpen, onAddTask }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "Pending",
    priority: "Medium",
    dueDate: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    if (errors[e.target.name]) {
      setErrors((prev) => ({
        ...prev,
        [e.target.name]: "",
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()){
        toast.error("Please fix the form errors");
        return;
    }

    try {
      if (editingTask) {
        await updateTask(editingTask._id, formData);
        toast.success("Task updated successfully");

        setEditingTask(null);
      } else {
        await onAddTask(formData);
      }
      setFormData({
        title: "",
        description: "",
        status: "Pending",
        priority: "Medium",
        dueDate: "",
      });
      window.location.reload();
    } catch (error) {
      toast.error("Failed to update task");
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    }
    if (formData.title && formData.title.length < 3) {
      newErrors.title = "Title must be atleast 3 characters";
    }
    if (
      formData.dueDate &&
      new Date(formData.dueDate) < new Date().setHours(0, 0, 0, 0)
    ) {
      newErrors.dueDate = "Due date cannot be in the past";
    }
    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  useEffect(() => {
    if (editingTask) {
      setFormData({
        title: editingTask.title || "",
        description: editingTask.description || "",
        status: editingTask.status || "Pending",
        priority: editingTask.priority || "Medium",
        dueDate: editingTask.dueDate ? editingTask.dueDate.slice(0, 10) : "",
      });
    }
  }, [editingTask]);

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Title */}
      <div>
        <label className="block mb-2 text-sm font-semibold text-slate-700 dark:text-gray-200">
          Task Title
        </label>

        <div className="relative">
          <FileText
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="text"
            name="title"
            placeholder="Enter task title"
            value={formData.title}
            onChange={handleChange}
            className="
              w-full
              h-14
              pl-12
              pr-4
              rounded-2xl
              border
              border-slate-200
              dark:border-slate-600
              focus:ring-2
              focus:ring-indigo-500
              focus:border-transparent
              outline-none
              dark:placeholder:text-gray-400
              dark:text-white
            "
          />
          {errors.title && (
            <p className="mt-1 text-sm text-red-500">{errors.title}</p>
          )}
        </div>
      </div>

      {/* Description */}
      <div>
        <label className="block mb-2 text-sm font-semibold text-slate-700 dark:text-gray-200">
          Description
        </label>

        <textarea
          name="description"
          placeholder="Describe your task..."
          value={formData.description}
          onChange={handleChange}
          rows={3}
          className="
            w-full
            rounded-2xl
            border
            border-slate-200
            dark:border-slate-600
            p-4
            resize-none
            focus:ring-2
            focus:ring-indigo-500
            focus:border-transparent
            outline-none
            dark:placeholder:text-gray-400
            dark:text-white
          "
        />
      </div>

      {/* Status */}
      <div>
        <label className="block mb-3 text-sm font-semibold text-slate-700 dark:text-gray-200">
          Status
        </label>

        <div className="grid grid-cols-3 gap-3">
          {[
            {
              value: "Pending",
              icon: Circle,
            },
            {
              value: "In Progress",
              icon: Clock3,
            },
            {
              value: "Completed",
              icon: CheckCircle2,
            },
          ].map((status) => {
            const Icon = status.icon;

            return (
              <button
                key={status.value}
                type="button"
                onClick={() =>
                  setFormData({
                    ...formData,
                    status: status.value,
                  })
                }
                className={`
                  p-3
                  rounded-2xl
                  border
                  transition
                  flex
                  flex-col
                  items-center
                  gap-2
                  dark:text-gray-400
                  ${
                    formData.status === status.value
                      ? "border-indigo-500 dark:bg-slate-300 bg-indigo-50 text-indigo-600 dark:text-gray-800"
                      : "border-slate-200 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-300 dark:hover:text-gray-800"
                  }
                `}
              >
                <Icon size={18} />
                <span className="text-sm font-medium">{status.value}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Priority */}
      <div>
        <label className="block mb-3 text-sm font-semibold text-slate-700 dark:text-gray-200">
          Priority
        </label>

        <div className="flex gap-3">
          {["Low", "Medium", "High"].map((priority) => (
            <button
              key={priority}
              type="button"
              onClick={() =>
                setFormData({
                  ...formData,
                  priority,
                })
              }
              className={`
                  flex-1
                  p-3
                  rounded-2xl
                  border
                  transition
                  dark:text-gray-400
                  ${
                    formData.priority === priority
                      ? "border-indigo-500 bg-indigo-50 dark:text-gray-800 dark:bg-slate-300"
                      : "border-slate-200 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-300 dark:hover:text-gray-800"
                  }
                `}
            >
              <div className="flex items-center justify-center gap-2">
                <Flag size={16} />

                <span className="font-medium">{priority}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Due Date */}
      <div>
        <label className="block mb-2 text-sm font-semibold text-slate-700 dark:text-gray-200">
          Due Date
        </label>

        <div className="relative">
          <Calendar
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-gray-400"
          />

          <input
            type="date"
            name="dueDate"
            value={formData.dueDate}
            onChange={handleChange}
            className="
              w-full
              h-14
              pl-12
              pr-4
              rounded-2xl
              border
              border-slate-200
              dark:border-slate-600
              focus:ring-2
              focus:ring-indigo-500
              focus:border-transparent
              outline-none
              dark:text-gray-400
            "
          />
          {errors.dueDate && (
            <p className="mt-1 text-sm text-red-500">{errors.dueDate}</p>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3 pt-2">
        <button
          type="button"
          onClick={() => {
            setIsModalOpen(false);
            setEditingTask(null);

            setFormData({
              title: "",
              description: "",
              status: "Pending",
              priority: "Medium",
              dueDate: "",
            });
          }}
          className="
            flex-1
            h-12
            rounded-xl
            border
            border-slate-200
            dark:border-slate-600
            hover:bg-slate-50
            dark:text-gray-400
            hover:dark:bg-slate-600
            hover:dark:text-white
          "
        >
          Cancel
        </button>

        <button
          type="submit"
          className="
            flex-1
            h-12
            rounded-xl
            bg-indigo-600
            text-white
            font-medium
            hover:bg-indigo-700
          "
        >
          {editingTask ? "Update Task" : "Create Task"}
        </button>
      </div>
    </form>
  );
};

export default Taskform;
