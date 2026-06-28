import { Menu, Moon, Search, Sun } from "lucide-react";

const NavBar = ({
  search,
  setSearch,
  setSidebarOpen,
  darkMode,
  setDarkMode,
}) => {
  return (
    <nav className="bg-white dark:bg-slate-900 rounded-2xl px-6 py-4 shadow-sm flex items-center justify-between">
      <button
        onClick={() => setSidebarOpen(true)}
        className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700 dark:text-slate-400"
      >
        <Menu size={22} />
      </button>
      {/* Search Bar */}
      <div className="relative w-full max-w-md">
        <Search
          size={18}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
        />

        <input
          type="text"
          placeholder="Search tasks..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="
          dark:bg-slate-800
            w-full
            pl-10
            pr-4
            py-2.5
            rounded-xl
            border
            border-gray-200 dark:border-slate-700
            dark:placeholder:text-slate-400
            dark:text-white
            focus:outline-none
            focus:ring-2
            focus:ring-indigo-500
          "
        />
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-5 ml-6">
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="
    h-10 w-10
    rounded-xl
    hover:bg-gray-100
    dark:hover:bg-slate-700
    dark:text-slate-400
    flex items-center justify-center
  "
        >
          {darkMode ? <Sun size={18} /> : <Moon size={18} />}
        </button>
        {/* User Info */}
        <div className="flex items-center gap-3">
          <img
            src="https://ui-avatars.com/api/?name=Sheezan+Khan"
            alt="user"
            className="md:w-10 md:h-10 w-8 h-8 rounded-full"
          />
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
