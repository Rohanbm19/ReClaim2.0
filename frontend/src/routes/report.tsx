import { createFileRoute } from "@tanstack/react-router";
import { PageContainer } from "@/components/layout/PageContainer";
import { Upload } from "lucide-react";
import React, { useState } from "react";
import { addFoundItem } from "../services/itemService";

export const Route = createFileRoute("/report")({
  head: () => ({ meta: [{ title: "Report Item — Campus Lost & Found" }] }),
  component: Report,
});

function Report() {
  const [formData, setFormData] = useState({
    itemName: "",
    description: "",
    date: "",
    time: "",
    location: "",
    questions: [
      { question: "", answer: "" },
      { question: "", answer: "" },
      { question: "", answer: "" },
    ],
  });
  const [error, setError] = useState("");

  const validateForm = () => {
    const isBasicValid = formData.itemName && formData.description && formData.date && formData.time && formData.location;
    const areQuestionsValid = formData.questions.every((q) => q.question.trim() !== "" && q.answer.trim() !== "");
    return isBasicValid && areQuestionsValid && formData.questions.length >= 3 && formData.questions.length <= 10;
  };

  const handleAddQuestion = () => {
    if (formData.questions.length < 10) {
      setFormData({
        ...formData,
        questions: [...formData.questions, { question: "", answer: "" }],
      });
    }
  };

  const handleRemoveQuestion = (index: number) => {
    if (formData.questions.length > 3) {
      const newQuestions = formData.questions.filter((_, i) => i !== index);
      setFormData({ ...formData, questions: newQuestions });
    }
  };

  const updateQuestion = (index: number, field: "question" | "answer", value: string) => {
    const newQuestions = [...formData.questions];
    newQuestions[index][field] = value;
    setFormData({ ...formData, questions: newQuestions });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      setError("All fields are required");
      return;
    }

    setError("");

    try {
      const res = await addFoundItem(formData);
      console.log("Saved:", res);
      alert("Item saved to MongoDB ✅");
      setFormData({
        itemName: "",
        description: "",
        date: "",
        time: "",
        location: "",
        questions: [
          { question: "", answer: "" },
          { question: "", answer: "" },
          { question: "", answer: "" },
        ],
      });
    } catch (err) {
      console.error(err);
      alert("Error saving item ❌");
    }
  };

  return (
    <PageContainer title="Report Found Item" description="Help return a lost item to its owner — record it on the blockchain.">
      <form onSubmit={handleSubmit} className="rounded-2xl border border-border bg-card p-6 space-y-5 max-w-2xl">
        {error && <p className="text-red-500 font-medium text-sm">{error}</p>}
        <Field label="Item Name">
          <input
            className="input"
            placeholder="e.g. Black wallet"
            value={formData.itemName}
            onChange={(e) => setFormData({ ...formData, itemName: e.target.value })}
          />
        </Field>

        <div className="grid grid-cols-2 gap-4">
          <Field label="Date Found">
            <input
              type="date"
              className="input"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            />
          </Field>
          <Field label="Time Found">
            <input
              type="time"
              className="input"
              value={formData.time}
              onChange={(e) => setFormData({ ...formData, time: e.target.value })}
            />
          </Field>
        </div>

        <Field label="Location Found">
          <input
            className="input"
            placeholder="e.g. Library, Block A"
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
          />
        </Field>
        <Field label="Description">
          <textarea
            className="input min-h-24"
            placeholder="Distinguishing features..."
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />
        </Field>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-medium">Verification Questions</h3>
            {formData.questions.length < 10 && (
              <button
                type="button"
                onClick={handleAddQuestion}
                className="text-sm text-primary hover:underline font-medium"
              >
                + Add Question
              </button>
            )}
          </div>
          {formData.questions.map((q, i) => (
            <div key={i} className="flex flex-col gap-3 p-4 border border-border rounded-xl bg-muted/20 relative">
              {formData.questions.length > 3 && (
                <button
                  type="button"
                  onClick={() => handleRemoveQuestion(i)}
                  className="absolute top-2 right-2 text-xs text-red-500 hover:text-red-700 font-medium"
                >
                  Delete
                </button>
              )}
              <Field label={`Question ${i + 1}`}>
                <input
                  className="input"
                  placeholder="e.g. What is the color of the inner lining?"
                  value={q.question}
                  onChange={(e) => updateQuestion(i, "question", e.target.value)}
                />
              </Field>
              <Field label={`Answer ${i + 1}`}>
                <input
                  className="input"
                  placeholder="e.g. Red"
                  value={q.answer}
                  onChange={(e) => updateQuestion(i, "answer", e.target.value)}
                />
              </Field>
            </div>
          ))}
          <p className="text-xs text-muted-foreground">Please provide between 3 and 10 questions to help verify the owner.</p>
        </div>
        <Field label="Upload Photo">
          <label className="flex flex-col items-center justify-center gap-2 border-2 border-dashed border-border rounded-xl p-8 cursor-pointer hover:bg-muted/40 transition-colors">
            <Upload className="h-6 w-6 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Click to upload or drag and drop</span>
            <input type="file" className="hidden" />
          </label>
        </Field>
        <button type="submit" className="px-5 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-medium shadow-[var(--shadow-elevated)]">
          Submit & Record on Blockchain
        </button>
      </form>
      <style>{`.input{display:block;width:100%;padding:0.625rem 0.875rem;border:1px solid var(--color-border);border-radius:0.625rem;background:var(--color-background);font-size:0.875rem;outline:none;transition:border-color .15s}.input:focus{border-color:var(--color-primary)}`}</style>
    </PageContainer>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-sm font-medium mb-2">{label}</label>
      {children}
    </div>
  );
}