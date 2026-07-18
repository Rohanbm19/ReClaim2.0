import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { addFoundItem } from "../services/itemService";

import { ProtectedRoute } from "@/components/auth/ProtectedRoute";

export const Route = createFileRoute("/reportfound")({
  component: () => (
    <ProtectedRoute>
      <ReportFoundPage />
    </ProtectedRoute>
  ),
});

function ReportFoundPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    itemName: "",
    description: "",
    date: "",
    time: "",
    location: "",
  });

  const [questions, setQuestions] = useState<{question: string, answer: string}[]>([{question: "", answer: ""}]);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

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
  const updateQuestion = (index: number, field: "question" | "answer", value: string) => {
    const updated = [...questions];
    updated[index][field] = value;
    setQuestions(updated);
  };

  const addQuestion = () => {
    setQuestions([...questions, {question: "", answer: ""}]);
  };

  // ✅ Validation
  const validateForm = () => {
    return Object.values(formData).every((v) => v.trim() !== "");
  };

  // 🚀 MAIN SUBMIT LOGIC (STEP 2)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      setError("All fields are required");
      return;
    }

    setIsSubmitting(true);
    setError("");

    // 🔥 Create item object
    const newItem = {
      itemName: formData.itemName,
      description: formData.description,
      location: formData.location,
      date: formData.date,
      time: formData.time,
      questions: questions.filter((q) => q.question.trim() !== "" && q.answer.trim() !== ""),
      verified: false,
    };

    try {
      await addFoundItem(newItem);
      alert("Item reported successfully!");

      // 🔄 Reset form
      setFormData({
        itemName: "",
        description: "",
        date: "",
        time: "",
        location: "",
      });
      setQuestions([{question: "", answer: ""}]);
      
      // Redirect to browse page
      navigate({ to: "/browse" });
    } catch (err: any) {
      console.error("Error submitting item:", err);
      setError(err.response?.data?.message || "Failed to submit item. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
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
              <div key={i} className="flex flex-col gap-2 mt-2">
                <input
                  type="text"
                  placeholder={`Question ${i + 1}`}
                  value={q.question}
                  onChange={(e) => updateQuestion(i, "question", e.target.value)}
                  className="w-full p-2 border rounded"
                />
                <input
                  type="text"
                  placeholder={`Answer ${i + 1}`}
                  value={q.answer}
                  onChange={(e) => updateQuestion(i, "answer", e.target.value)}
                  className="w-full p-2 border rounded"
                />
              </div>
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
            disabled={isSubmitting}
            className="w-full bg-primary text-primary-foreground p-3 rounded-lg font-medium hover:opacity-90 transition disabled:opacity-50"
          >
            {isSubmitting ? "Submitting..." : "Submit Report"}
          </button>
        </form>
      </div>
    </div>
  );
}