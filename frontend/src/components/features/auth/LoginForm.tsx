import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { studentLogin, adminLogin } from "@/services/authService";

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
  const [error, setError] = useState("");

  const handleStudentLogin = async (e: any) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      const data = await studentLogin(student);

      localStorage.setItem("token", data.token);
      localStorage.setItem("role", "student");

      navigate({ to: "/" });
    } catch {
      setError("Invalid student credentials");
    } finally {
      setLoading(false);
    }
  };

  const handleAdminLogin = async (e: any) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      const data = await adminLogin(admin);

      localStorage.setItem("token", data.token);
      localStorage.setItem("role", "admin");

      navigate({ to: "/admin/report-item" });
    } catch {
      setError("Invalid admin credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
      <h2 className="text-3xl font-bold text-slate-900 mb-2">
        Welcome Back
      </h2>

      <p className="text-gray-500 mb-6">
        Campus Lost & Found Login
      </p>

      {/* Toggle Buttons */}
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

      {error && (
        <div className="bg-red-100 text-red-600 p-3 rounded-lg mb-4">
          {error}
        </div>
      )}

      {/* STUDENT LOGIN */}
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

          <button className="w-full bg-violet-600 text-white py-3 rounded-xl">
            {loading ? "Please wait..." : "Login as Student"}
          </button>
        </form>
      )}

      {/* ADMIN LOGIN */}
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

          <button className="w-full bg-violet-600 text-white py-3 rounded-xl">
            {loading ? "Please wait..." : "Login as Admin"}
          </button>
        </form>
      )}
    </div>
  );
}