import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const features = [
  {
    icon: (
      <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    label: "Task Tracking",
    description: "Create, update, and complete tasks with priority and deadline control.",
  },
  {
    icon: (
      <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
      </svg>
    ),
    label: "User Management",
    description: "Admin controls to oversee users, roles, and all system activity.",
  },
  {
    icon: (
      <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
      </svg>
    ),
    label: "Priority Levels",
    description: "Tag tasks as High, Medium, or Low to focus on what matters most.",
  },
  {
    icon: (
      <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
      </svg>
    ),
    label: "Deadlines",
    description: "Set due dates and never lose track of time-sensitive work.",
  },
];

const statuses = [
  { label: "Completed", color: "bg-green-50 text-green-600" },
  { label: "In Progress", color: "bg-orange-50 text-orange-600" },
  { label: "High Priority", color: "bg-red-50 text-red-600" },
  { label: "Low Priority", color: "bg-blue-50 text-blue-600" },
];

const LandingPage = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div className="max-w-6xl mx-auto px-4 pt-20 pb-16">
        <div className="mb-6 flex items-center gap-2">
          <span className="text-xs font-semibold text-gray-400 uppercase tracking-widest">
            Task Management
          </span>
          <span className="h-px flex-1 max-w-[40px] bg-gray-200" />
        </div>

        <h1 className="text-4xl font-bold text-gray-800 mb-4 max-w-xl leading-tight">
          Manage your tasks.<br />
          <span className="text-gray-400 font-normal">Simply and clearly.</span>
        </h1>

        <p className="text-sm text-gray-500 max-w-md mb-8 leading-relaxed">
          A no-frills task manager built for individuals and teams. Track work, manage users, and stay on top of every deadline — all in one place.
        </p>

        <div className="flex gap-3 flex-wrap">
          {user ? (
            <>
              <Link
                to="/tasks"
                className="text-sm px-5 py-2 rounded bg-gray-800 text-white hover:bg-gray-700 transition-colors font-medium"
              >
                Go to Tasks
              </Link>
              {user.role === "admin" && (
                <Link
                  to="/admin"
                  className="text-sm px-5 py-2 rounded border border-gray-300 text-gray-600 hover:bg-gray-100 transition-colors"
                >
                  Admin Dashboard
                </Link>
              )}
            </>
          ) : (
            <>
              <Link
                to="/register"
                className="text-sm px-5 py-2 rounded bg-gray-800 text-white hover:bg-gray-700 transition-colors font-medium"
              >
                Get Started
              </Link>
              <Link
                to="/login"
                className="text-sm px-5 py-2 rounded border border-gray-300 text-gray-600 hover:bg-gray-100 transition-colors"
              >
                Sign In
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Preview table */}
      <div className="max-w-6xl mx-auto px-4 mb-16">
        <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm">
          <div className="bg-gray-50 border-b border-gray-200 px-4 py-3 flex items-center justify-between">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
              Sample Tasks
            </span>
            <div className="flex gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-gray-200" />
              <span className="w-2.5 h-2.5 rounded-full bg-gray-200" />
              <span className="w-2.5 h-2.5 rounded-full bg-gray-200" />
            </div>
          </div>
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">
                <th className="px-4 py-3">Title</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Priority</th>
                <th className="px-4 py-3">Deadline</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 bg-white">
              {[
                { title: "Design new onboarding flow", status: "In Progress", priority: "High", deadline: "Apr 10, 2026" },
                { title: "Fix login redirect bug", status: "Completed", priority: "High", deadline: "Apr 3, 2026" },
                { title: "Write API documentation", status: "In Progress", priority: "Medium", deadline: "Apr 18, 2026" },
                { title: "Update user profile page", status: "Completed", priority: "Low", deadline: "Mar 30, 2026" },
              ].map((t) => (
                <tr key={t.title} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 font-medium text-gray-800">{t.title}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-block text-xs font-medium px-2 py-0.5 rounded-full ${
                      t.status === "Completed" ? "bg-green-50 text-green-600" : "bg-orange-50 text-orange-600"
                    }`}>
                      {t.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-block text-xs font-medium px-2 py-0.5 rounded-full ${
                      t.priority === "High" ? "bg-red-50 text-red-600"
                      : t.priority === "Medium" ? "bg-yellow-50 text-yellow-600"
                      : "bg-blue-50 text-blue-600"
                    }`}>
                      {t.priority}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-500 text-xs">{t.deadline}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Features */}
      <div className="max-w-6xl mx-auto px-4 mb-20">
        <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-6">
          What's included
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((f) => (
            <div
              key={f.label}
              className="border border-gray-200 rounded-lg p-5 bg-white hover:shadow-sm transition-shadow"
            >
              <div className="text-gray-400 mb-3">{f.icon}</div>
              <div className="text-sm font-semibold text-gray-700 mb-1">{f.label}</div>
              <p className="text-xs text-gray-400 leading-relaxed">{f.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Status legend */}
      <div className="max-w-6xl mx-auto px-4 mb-20">
        <div className="border border-gray-200 rounded-lg bg-white px-6 py-5 flex flex-wrap items-center gap-6">
          <span className="text-xs font-semibold text-gray-400 uppercase tracking-widest">
            Status labels
          </span>
          {statuses.map((s) => (
            <span
              key={s.label}
              className={`inline-block text-xs font-medium px-2 py-0.5 rounded-full ${s.color}`}
            >
              {s.label}
            </span>
          ))}
        </div>
      </div>

      {/* CTA */}
      {!user && (
        <div className="max-w-6xl mx-auto px-4 pb-20">
          <div className="border border-gray-200 rounded-lg bg-white px-8 py-10 text-center">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">
              Ready to start?
            </p>
            <h3 className="text-xl font-bold text-gray-800 mb-5">
              Create an account and begin managing tasks.
            </h3>
            <Link
              to="/register"
              className="inline-block text-sm px-6 py-2 rounded bg-gray-800 text-white hover:bg-gray-700 transition-colors font-medium"
            >
              Register for free
            </Link>
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="border-t border-gray-200 bg-white">
        <div className="max-w-6xl mx-auto px-4 py-5 flex items-center justify-between">
          <span className="text-xs font-semibold text-gray-700">Tasks CRUD App</span>
          <span className="text-xs text-gray-400">Built with React & Tailwind</span>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;