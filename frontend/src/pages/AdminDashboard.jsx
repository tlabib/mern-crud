import { useEffect, useState } from "react";
import axiosInstance from "../axiosConfig";
import { useAuth } from "../context/AuthContext";

const AdminDashboard = () => {
  const { user } = useAuth();
  const [users, setUsers] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);

  const [editingUser, setEditingUser] = useState(null);
  const [editForm, setEditForm] = useState({
    name: "",
    email: "",
    role: "user",
  });
  useEffect(() => {
    if (user) fetchData();
  }, [user]);

  const fetchData = async () => {
    const userRes = await axiosInstance.get("/api/admin/users", {
      headers: { Authorization: `Bearer ${user.token}` },
    });
    const taskRes = await axiosInstance.get("/api/admin/tasks", {
      headers: { Authorization: `Bearer ${user.token}` },
    });
    setUsers(userRes.data);
    setTasks(taskRes.data);
  };
  const updateUser = async () => {
    await axiosInstance.put(
      `/api/admin/user/${editingUser._id}`,

      editForm,

      {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      },
    );

    setUsers(
      users.map((u) => (u._id === editingUser._id ? { ...u, ...editForm } : u)),
    );

    setEditingUser(null);
  };

  const deleteTask = async (id) => {
    await axiosInstance.delete(`/api/admin/task/${id}`, {
      headers: { Authorization: `Bearer ${user.token}` },
    });
    setTasks(tasks.filter((t) => t._id !== id));
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-8">Admin Dashboard</h1>

      {/* USERS */}
      <div className="mb-8">
        <h2 className="text-base font-semibold text-gray-600 uppercase tracking-wide mb-3">
          Users
        </h2>
        <div className="border border-gray-200 rounded-lg overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Role</th>
                <th className="px-4 py-3">Tasks</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 bg-white">
              {users.map((u) => (
                <tr key={u._id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 font-medium text-gray-800">
                    {u.name}
                  </td>
                  <td className="px-4 py-3 text-gray-500">{u.email}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-block text-xs font-medium px-2 py-0.5 rounded-full ${
                        u.role === "admin"
                          ? "bg-red-50 text-red-600"
                          : "bg-blue-50 text-blue-600"
                      }`}
                    >
                      {u.role}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-600">{u.taskCount}</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <button
                        onClick={() => setSelectedUser(u)}
                        className="text-xs px-3 py-1 rounded border border-gray-300 text-gray-600 hover:bg-gray-100 transition-colors"
                      >
                        View
                      </button>
                      <button
                        onClick={() => {
                          setEditingUser(u);

                          setEditForm({
                            name: u.name,
                            email: u.email,
                            role: u.role,
                          });
                        }}
                        className="text-xs px-3 py-1 rounded border border-gray-300 text-gray-600 hover:bg-gray-100"
                      >
                        Edit
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* TASKS */}
      <div>
        <h2 className="text-base font-semibold text-gray-600 uppercase tracking-wide mb-3">
          Tasks
        </h2>
        <div className="border border-gray-200 rounded-lg overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">
                <th className="px-4 py-3">Title</th>
                <th className="px-4 py-3">Owner</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Priority</th>
                <th className="px-4 py-3">Deadline</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 bg-white">
              {tasks.map((t) => (
                <tr key={t._id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 font-medium text-gray-800">
                    {t.title}
                  </td>
                  <td className="px-4 py-3 text-gray-500">{t.user?.name}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-block text-xs font-medium px-2 py-0.5 rounded-full ${
                        t.status === "Completed"
                          ? "bg-green-50 text-green-600"
                          : "bg-orange-50 text-orange-600"
                      }`}
                    >
                      {t.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-block text-xs font-medium px-2 py-0.5 rounded-full ${
                        t.priority === "High"
                          ? "bg-red-50 text-red-600"
                          : t.priority === "Medium"
                            ? "bg-yellow-50 text-yellow-600"
                            : "bg-blue-50 text-blue-600"
                      }`}
                    >
                      {t.priority}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-500">
                    {t.deadline
                      ? new Date(t.deadline).toLocaleDateString()
                      : "No deadline"}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <button
                        onClick={() => setSelectedTask(t)}
                        className="text-xs px-3 py-1 rounded border border-gray-300 text-gray-600 hover:bg-gray-100 transition-colors"
                      >
                        View
                      </button>
                      <button
                        onClick={() => deleteTask(t._id)}
                        className="text-xs px-3 py-1 rounded border border-red-200 text-red-500 hover:bg-red-50 transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* USER MODAL */}
      {selectedUser && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50"
          onClick={() => setSelectedUser(null)}
        >
          <div
            className="bg-white rounded-lg shadow-lg w-80 p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-base font-semibold text-gray-800 mb-4">
              User Details
            </h2>
            <div className="space-y-3 text-sm">
              {[
                ["Name", selectedUser.name],
                ["Email", selectedUser.email],
                ["Role", selectedUser.role],
                ["Tasks", selectedUser.taskCount],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between">
                  <span className="text-gray-400">{k}</span>
                  <span className="font-medium text-gray-700">{v}</span>
                </div>
              ))}
            </div>
            <button
              onClick={() => setSelectedUser(null)}
              className="mt-5 w-full text-sm py-1.5 rounded border border-gray-300 text-gray-600 hover:bg-gray-100 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
      {editingUser && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div
            className="bg-white rounded-lg shadow-lg w-80 p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-base font-semibold mb-4">Edit User</h2>

            <input
              value={editForm.name}
              onChange={(e) =>
                setEditForm({
                  ...editForm,
                  name: e.target.value,
                })
              }
              className="w-full border p-2 mb-3 rounded"
              placeholder="Name"
            />

            <input
              value={editForm.email}
              onChange={(e) =>
                setEditForm({
                  ...editForm,
                  email: e.target.value,
                })
              }
              className="w-full border p-2 mb-3 rounded"
              placeholder="Email"
            />

            <select
              value={editForm.role}
              onChange={(e) =>
                setEditForm({
                  ...editForm,
                  role: e.target.value,
                })
              }
              className="w-full border p-2 mb-3 rounded"
            >
              <option value="user">User</option>

              <option value="admin">Admin</option>
            </select>

            <div className="flex gap-2">
              <button
                onClick={updateUser}
                className="bg-blue-500 text-white px-3 py-1 rounded w-full"
              >
                Update
              </button>

              <button
                onClick={() => setEditingUser(null)}
                className="bg-gray-500 text-white px-3 py-1 rounded w-full"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TASK MODAL */}
      {selectedTask && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50"
          onClick={() => setSelectedTask(null)}
        >
          <div
            className="bg-white rounded-lg shadow-lg w-80 p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-base font-semibold text-gray-800 mb-4">
              Task Details
            </h2>
            <div className="space-y-3 text-sm">
              {[
                ["Title", selectedTask.title],
                ["Description", selectedTask.description || "—"],
                ["Status", selectedTask.status],
                ["Priority", selectedTask.priority],
                [
                  "Deadline",
                  selectedTask.deadline
                    ? new Date(selectedTask.deadline).toLocaleDateString()
                    : "None",
                ],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between">
                  <span className="text-gray-400">{k}</span>
                  <span className="font-medium text-gray-700 text-right max-w-[60%]">
                    {v}
                  </span>
                </div>
              ))}
            </div>
            <button
              onClick={() => setSelectedTask(null)}
              className="mt-5 w-full text-sm py-1.5 rounded border border-gray-300 text-gray-600 hover:bg-gray-100 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
