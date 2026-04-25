import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";

export default function LoginForm() {
  const navigate = useNavigate();

  const [mode, setMode] = useState<"student" | "admin">("student");

  const [student, setStudent] = useState({
    username: "",
    password: "",
  });

  const [admin, setAdmin] = useState({
    adminName: "",
    securityKey: "",
  });

  const [loading, setLoading] = useState(false);

  const handleStudentLogin = (e: any) => {
    e.preventDefault();

    setLoading(true);

    setTimeout(() => {
      localStorage.setItem("role", "student");
      localStorage.setItem("user", student.username);

      navigate({ to: "/dashboard" });
      setLoading(false);
    }, 500);
  };

  const handleAdminLogin = (e: any) => {
    e.preventDefault();

    setLoading(true);

    setTimeout(() => {
      localStorage.setItem("role", "admin");
      localStorage.setItem("admin", admin.adminName);

      navigate({ to: "/admin/report-item" });
      setLoading(false);
    }, 500);
  };

  return (
    <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
      <h2 className="text-3xl font-bold text-slate-900 mb-2">
        Welcome Back
      </h2>

      <p className="text-gray-500 mb-6">
        Campus Lost & Found Login
      </p>

      {/* Toggle */}
      <div className="grid grid-cols-2 gap-2 mb-6">
        <button
          onClick={() => setMode("student")}
          className={`py-2 rounded-xl font-semibold ${
            mode === "student"
              ? "bg-violet-600 text-white"
              : "bg-gray-100"
          }`}
        >
          Student
        </button>

        <button
          onClick={() => setMode("admin")}
          className={`py-2 rounded-xl font-semibold ${
            mode === "admin"
              ? "bg-violet-600 text-white"
              : "bg-gray-100"
          }`}
        >
          Admin
        </button>
      </div>

      {/* STUDENT */}
      {mode === "student" && (
        <form onSubmit={handleStudentLogin} className="space-y-4">
          <input
            type="text"
            placeholder="Username"
            className="w-full border px-4 py-3 rounded-xl"
            onChange={(e) =>
              setStudent({
                ...student,
                username: e.target.value,
              })
            }
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full border px-4 py-3 rounded-xl"
            onChange={(e) =>
              setStudent({
                ...student,
                password: e.target.value,
              })
            }
          />

           <button
  type="button"
  onClick={() => navigate({ to: "/dashboard" })}
  className="w-full bg-violet-600 text-white py-3 rounded-xl"
>
  Go to Dashboard
</button>
        </form>
      )}

      {/* ADMIN */}
      {mode === "admin" && (
        <form onSubmit={handleAdminLogin} className="space-y-4">
          <input
            type="text"
            placeholder="Admin Name"
            className="w-full border px-4 py-3 rounded-xl"
            onChange={(e) =>
              setAdmin({
                ...admin,
                adminName: e.target.value,
              })
            }
          />

          <input
            type="password"
            placeholder="Security Key"
            className="w-full border px-4 py-3 rounded-xl"
            onChange={(e) =>
              setAdmin({
                ...admin,
                securityKey: e.target.value,
              })
            }
          />

        <button
  type="button"
  onClick={() => navigate({ to: "/dashboard" })}
  className="w-full bg-violet-600 text-white py-3 rounded-xl"
>
  Go to Dashboard
</button>
        </form>
      )}
    </div>
  );
}