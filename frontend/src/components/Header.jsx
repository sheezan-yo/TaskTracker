import { Plus } from "lucide-react";

const Header = ({ sortBy, setSortBy, setIsModalOpen, setEditingTask }) => {
  return (
    <div className="mb-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold text-gray-800 dark:text-slate-300">
            My Tasks
          </h1>

          <p className="text-gray-500 mt-1 dark:text-gray-300">
            Manage your daily tasks efficiently
          </p>
        </div>

        <div className="flex gap-3">
          <div className="flex bg-white dark:bg-slate-800 rounded-xl p-1 shadow-sm">
            {["newest", "oldest", "priority"].map((item) => (
              <button
                key={item}
                onClick={() => setSortBy(item)}
                className={`
        px-4 py-2 rounded-lg capitalize transition
        ${
          sortBy === item
            ? "bg-indigo-600 text-white"
            : "text-gray-600 dark:text-slate-300 hover:bg-gray-100"
        }
      `}
              >
                {item}
              </button>
            ))}
          </div>

          <button
            onClick={() => {
              setEditingTask(null);
              setIsModalOpen(true);
            }}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-3 rounded-xl transition"
          >
            <Plus size={18} />
            Add Task
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
