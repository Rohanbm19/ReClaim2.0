import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/admin/report-item")({
  component: ReportItemPage,
});

function ReportItemPage() {
  const [image, setImage] = useState<File | null>(null);

  const [form, setForm] = useState({
    name: "",
    location: "",
    date: "",
    description: "",
  });

  const [questions, setQuestions] = useState([
    { question: "", answer: "" },
  ]);

  // 🔥 Handle form input
  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.placeholder.toLowerCase().replace(" ", "")]: e.target.value });
  };

  const addQuestion = () => {
    setQuestions([...questions, { question: "", answer: "" }]);
  };

  const updateQuestion = (
    index: number,
    field: "question" | "answer",
    value: string
  ) => {
    const updated = [...questions];
    updated[index][field] = value;
    setQuestions(updated);
  };

  // 🔥 Convert image to base64
  const convertToBase64 = (file: File) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => resolve(reader.result);
    });
  };

  // 🚀 SUBMIT LOGIC
  const handleSubmit = async () => {
    if (!form.name || !form.location || !form.description) {
      alert("Fill all required fields");
      return;
    }

    if (questions.some((q) => !q.question || !q.answer)) {
      alert("All questions & answers required");
      return;
    }

    let imageData = "";
    if (image) {
      imageData = (await convertToBase64(image)) as string;
    }

    const newItem = {
      id: Date.now().toString(),
      name: form.name,
      location: form.location,
      date: form.date,
      description: form.description,
      image: imageData,

      // 🔥 IMPORTANT STRUCTURE
      questions: questions.map((q) => q.question),
      correctAnswers: questions.map((q) => q.answer),

      createdBy: "admin",
      verified: false,
    };

    const existing =
      JSON.parse(localStorage.getItem("foundItems") || "[]");

    localStorage.setItem(
      "foundItems",
      JSON.stringify([newItem, ...existing])
    );

    alert("Item Created Successfully ✅");

    // Reset
    setForm({
      name: "",
      location: "",
      date: "",
      description: "",
    });

    setQuestions([{ question: "", answer: "" }]);
    setImage(null);
  };

  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-xl p-8">

        <h1 className="text-4xl font-bold text-violet-700 mb-2">
          Admin Dashboard
        </h1>

        <p className="text-gray-500 mb-8">
          Register Found Item
        </p>

        <div className="grid md:grid-cols-2 gap-6">

          {/* Upload */}
          <div className="border-2 border-dashed border-violet-300 rounded-2xl p-8 text-center bg-violet-50">
            <input
              type="file"
              onChange={(e) =>
                setImage(e.target.files?.[0] || null)
              }
            />

            <p className="mt-4 text-gray-500">
              Drag & Drop or Upload Image
            </p>

            {image && (
              <p className="mt-2 text-violet-600 font-medium">
                {image.name}
              </p>
            )}
          </div>

          {/* Form */}
          <div className="space-y-4">

            <input
              type="text"
              placeholder="name"
              value={form.name}
              onChange={handleChange}
              className="w-full border rounded-xl px-4 py-3"
            />

            <input
              type="text"
              placeholder="location"
              value={form.location}
              onChange={handleChange}
              className="w-full border rounded-xl px-4 py-3"
            />

            <input
              type="date"
              value={form.date}
              onChange={(e) =>
                setForm({ ...form, date: e.target.value })
              }
              className="w-full border rounded-xl px-4 py-3"
            />

            <textarea
              placeholder="description"
              value={form.description}
              onChange={handleChange}
              rows={3}
              className="w-full border rounded-xl px-4 py-3"
            />

            {/* Questions */}
            {questions.map((q, index) => (
              <div
                key={index}
                className="border rounded-2xl p-4 bg-slate-50 space-y-3 relative"
              >
                {questions.length > 1 && (
                  <button
                    onClick={() =>
                      setQuestions(
                        questions.filter((_, i) => i !== index)
                      )
                    }
                    className="absolute top-3 right-3 bg-red-100 text-red-600 px-3 py-1 rounded-lg text-sm"
                  >
                    Delete
                  </button>
                )}

                <input
                  type="text"
                  placeholder={`Question ${index + 1}`}
                  value={q.question}
                  onChange={(e) =>
                    updateQuestion(index, "question", e.target.value)
                  }
                  className="w-full border rounded-xl px-4 py-3"
                />

                <input
                  type="text"
                  placeholder="Correct Answer"
                  value={q.answer}
                  onChange={(e) =>
                    updateQuestion(index, "answer", e.target.value)
                  }
                  className="w-full border rounded-xl px-4 py-3"
                />
              </div>
            ))}

            <button
              onClick={addQuestion}
              className="w-full border-2 border-dashed border-violet-400 text-violet-600 py-3 rounded-xl font-semibold"
            >
              + Add Another Question
            </button>

            <button
              onClick={handleSubmit}
              className="w-full bg-violet-600 hover:bg-violet-700 text-white py-3 rounded-xl font-semibold"
            >
              Submit Item
            </button>

          </div>
        </div>
      </div>
    </div>
  );
}