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

  const [questions, setQuestions] = useState<string[]>([""]);
  const [error, setError] = useState("");

  // 📝 Handle form input
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // 🧠 Question handlers
  const updateQuestion = (index: number, value: string) => {
    const updated = [...questions];
    updated[index] = value;
    setQuestions(updated);
  };

  const addQuestion = () => {
    setQuestions([...questions, ""]);
  };

  // ✅ Validation
  const validateForm = () => {
    return Object.values(formData).every((v) => v.trim() !== "");
  };

  // 🚀 MAIN SUBMIT LOGIC (STEP 2)
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      setError("All fields are required");
      return;
    }

    setError("");

    // 🔥 Create item object
    const newItem = {
      id: Date.now().toString(),
      name: formData.itemName,
      description: formData.description,
      location: formData.location,
      date: formData.date,
      time: formData.time,
      questions: questions.filter((q) => q.trim() !== ""),
      reportedAgo: "Just now",
      verified: false,
    };

    // 🔥 Save to localStorage
    const existing =
      JSON.parse(localStorage.getItem("foundItems") || "[]");

    localStorage.setItem(
      "foundItems",
      JSON.stringify([newItem, ...existing])
    );

    console.log("Saved Item:", newItem);

    alert("Item reported successfully!");

    // 🔄 Reset form
    setFormData({
      itemName: "",
      description: "",
      date: "",
      time: "",
      location: "",
    });

    setQuestions([""]);
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

          {/* Item Name */}
          <input
            type="text"
            name="itemName"
            placeholder="Item Name"
            value={formData.itemName}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
          />

          {/* Description */}
          <textarea
            name="description"
            placeholder="Describe the item..."
            value={formData.description}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
          />

          {/* Date & Time */}
          <div className="flex gap-3">
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-1/2 p-3 border rounded-lg"
            />

            <input
              type="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              className="w-1/2 p-3 border rounded-lg"
            />
          </div>

          {/* Location */}
          <input
            type="text"
            name="location"
            placeholder="Location"
            value={formData.location}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
          />

          {/* 🔥 Questions Section */}
          <div>
            <label className="text-sm font-medium">
              Verification Questions
            </label>

            {questions.map((q, i) => (
              <input
                key={i}
                type="text"
                placeholder={`Question ${i + 1}`}
                value={q}
                onChange={(e) =>
                  updateQuestion(i, e.target.value)
                }
                className="w-full p-2 border rounded mt-2"
              />
            ))}

            <button
              type="button"
              onClick={addQuestion}
              className="text-sm text-primary mt-2"
            >
              + Add Question
            </button>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-primary text-primary-foreground p-3 rounded-lg font-medium hover:opacity-90 transition"
          >
            Submit Report
          </button>
        </form>
      </div>
    </div>
  );
}