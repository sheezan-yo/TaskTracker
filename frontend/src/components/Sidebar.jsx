import { CheckSquare, LayoutDashboard, Settings } from "lucide-react";

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  return (
    <>
      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={`flex flex-col fixed lg:static top-0 left-0 h-screen w-72 bg-white dark:bg-slate-900 border-r border-gray-200 dark:border-slate-800 z-50 transition-transform duration-300 p-6 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
      >
        <div className="flex items-center gap-3 mb-10">
          <div className="h-10 w-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold">
            T
          </div>

          <h1 className="text-xl font-bold dark:text-white">Task Tracker</h1>
        </div>

        <nav className="space-y-3">
          <button className="flex items-center gap-3 w-full p-3 rounded-xl bg-indigo-600 text-white shadow-sm">
            <LayoutDashboard size={20} />
            Dashboard
          </button>

          <button className="flex items-center gap-3 w-full p-3 rounded-xl hover:bg-gray-100 dark:hover:bg-slate-800 dark:text-white">
            <CheckSquare size={20} />
            Tasks
          </button>

          <button className="flex items-center gap-3 w-full p-3 rounded-xl hover:bg-gray-100 dark:hover:bg-slate-800 dark:text-white">
            <Settings size={20} />
            Settings
          </button>
        </nav>
        {/* User Info */}
        <div className="mt-auto">
          <div className="border-t border-gray-200 pt-5">
            <div className="bg-gray-50 dark:bg-slate-800 rounded-2xl p-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-indigo-100 dark:bg-gray-400 flex items-center justify-center font-bold text-indigo-600">
                  SK
                </div>

                <div className="flex-1">
                  <p className="font-semibold text-gray-800 dark:text-slate-300">Sheezan Khan</p>

                  {/* <p className="text-sm text-gray-500">Developer</p> */}
                </div>
              </div>

              <button
                className="
          mt-3
          w-full
          rounded-xl
          border
          border-red-100
          py-2
          text-sm
          font-medium
          text-red-500
          hover:bg-red-50
          dark:hover:bg-slate-900
          transition
        "
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
