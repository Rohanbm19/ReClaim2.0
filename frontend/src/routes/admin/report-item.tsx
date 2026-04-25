import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/admin/report-item")({
  component: ReportItemPage,
});

function ReportItemPage() {
  const [image, setImage] = useState<File | null>(null);

  const [questions, setQuestions] = useState([
    { question: "", answer: "" },
  ]);

  const addQuestion = () => {
    setQuestions([
      ...questions,
      { question: "", answer: "" },
    ]);
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
              placeholder="Item Name"
              className="w-full border rounded-xl px-4 py-3"
            />

            <input
              type="text"
              placeholder="Found Location"
              className="w-full border rounded-xl px-4 py-3"
            />

            <input
              type="date"
              className="w-full border rounded-xl px-4 py-3"
            />

            <textarea
              placeholder="Description"
              rows={3}
              className="w-full border rounded-xl px-4 py-3"
            />

            {/* Dynamic Questions */}
{questions.map((q, index) => (
  <div
    key={index}
    className="border rounded-2xl p-4 bg-slate-50 space-y-3 relative"
  >
    {/* Delete Button */}
    {questions.length > 1 && (
      <button
        type="button"
        onClick={() =>
          setQuestions(
            questions.filter((_, i) => i !== index)
          )
        }
        className="absolute top-3 right-3 bg-red-100 text-red-600 px-3 py-1 rounded-lg text-sm hover:bg-red-200"
      >
        Delete
      </button>
    )}

    <input
      type="text"
      placeholder={`Question ${index + 1}`}
      value={q.question}
      onChange={(e) =>
        updateQuestion(
          index,
          "question",
          e.target.value
        )
      }
      className="w-full border rounded-xl px-4 py-3"
    />

    <input
      type="text"
      placeholder="Correct Answer"
      value={q.answer}
      onChange={(e) =>
        updateQuestion(
          index,
          "answer",
          e.target.value
        )
      }
      className="w-full border rounded-xl px-4 py-3"
    />
  </div>
))}

            {/* Add Button */}
            <button
              type="button"
              onClick={addQuestion}
              className="w-full border-2 border-dashed border-violet-400 text-violet-600 py-3 rounded-xl font-semibold hover:bg-violet-50"
            >
              + Add Another Question
            </button>

            <button className="w-full bg-violet-600 hover:bg-violet-700 text-white py-3 rounded-xl font-semibold">
              Submit Item
            </button>

          </div>
        </div>
      </div>
    </div>
  );
}