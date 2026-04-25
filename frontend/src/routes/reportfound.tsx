import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/reportfound")({
  component: ReportFoundPage,
});

function ReportFoundPage() {
  const [formData, setFormData] = useState({
    itemName: "",
    description: "",
    date: "",
    time: "",
    location: "",
  });

  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const validateForm = () => {
    return Object.values(formData).every((v) => v.trim() !== "");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      setError("All fields are required");
      return;
    }

    setError("");

    // 📦 TODO: send to backend API
    console.log("Found Item Submitted:", formData);

    setFormData({
      itemName: "",
      description: "",
      date: "",
      time: "",
      location: "",
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 p-4">
      <div className="w-full max-w-xl rounded-2xl border border-border bg-card p-6 shadow-md">

        {/* Header */}
        <h1 className="text-2xl font-bold">Report Found Item</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Help return lost items by reporting them securely.
        </p>

        {/* Error */}
        {error && (
          <div className="mt-4 text-sm text-red-500 bg-red-100 p-2 rounded">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 mt-5">

          <input
            type="text"
            name="itemName"
            placeholder="Item Name"
            value={formData.itemName}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg outline-none focus:ring-2 focus:ring-primary"
          />

          <textarea
            name="description"
            placeholder="Describe the item..."
            value={formData.description}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg outline-none focus:ring-2 focus:ring-primary"
          />

          <div className="flex gap-3">
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-1/2 p-3 border rounded-lg outline-none focus:ring-2 focus:ring-primary"
            />

            <input
              type="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              className="w-1/2 p-3 border rounded-lg outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <input
            type="text"
            name="location"
            placeholder="Location (e.g. Library, Block A)"
            value={formData.location}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg outline-none focus:ring-2 focus:ring-primary"
          />

          <button
            type="submit"
          className="w-full bg-muted text-foreground p-3 rounded-lg font-medium hover:bg-muted/80 transition"
          >
            Submit Report
          </button>
        </form>
      </div>
    </div>
  );
}