import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { getItemById, submitClaim } from "../services/itemService";

export const Route = createFileRoute("/item/$id")({
  component: ItemPage,
});

function ItemPage() {
  const { id } = Route.useParams();

  const [item, setItem] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Default questions since not all items have generated questions
  const questions = [
    "What specific features or marks prove this is yours?",
    "When exactly did you notice it was missing?",
    "Where is the last place you saw it?"
  ];

  const [answers, setAnswers] = useState<string[]>(
    new Array(questions.length).fill("")
  );

  useEffect(() => {
    getItemById(id)
      .then((data) => {
        setItem(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  const handleChange = (value: string, index: number) => {
    const updated = [...answers];
    updated[index] = value;
    setAnswers(updated);
  };

  const handleSubmit = async () => {
    alert("Submitting claim...");
    // Create the mapped answers array
    const mappedAnswers = questions.map((q, i) => ({ question: q, answer: answers[i] }));

    // Fallback: usually you'll get a real user ID from your auth context
    const mockUserId = "64b1f6d89a4cd8d022faae3f";

    try {
      await submitClaim({
        item: id,
        claimant: mockUserId,
        description: "System generated automated claim.",
        answers: mappedAnswers
      });
      alert("Claim submitted to MongoDB successfully ✅");
    } catch (err) {
      console.error(err);
      alert("Error submitting claim ❌");
    }
  };

  if (loading) return <div className="p-10 text-center">Loading item details...</div>;
  if (!item) return <div className="p-10 text-center">Item not found.</div>;


  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">

      {/* ITEM DETAILS */}
      <div className="border rounded-xl p-4 bg-card">
        <h1 className="text-xl font-bold">{item.itemName || item.name}</h1>
        <p className="text-sm text-muted-foreground mt-1">
          {item.description}
        </p>
        <p className="text-xs mt-2">📍 {item.location}</p>
      </div>

      {/* QUESTIONS */}
      <div className="space-y-4">
        <h2 className="font-semibold">Verification Questions</h2>

        {questions.map((q, i) => (
          <div key={i}>
            <label className="text-sm font-medium">
              {i + 1}. {q}
            </label>

            <input
              className="w-full border rounded p-2 mt-1"
              placeholder="Your answer..."
              value={answers[i]}
              onChange={(e) => handleChange(e.target.value, i)}
            />
          </div>
        ))}
      </div>

      {/* SUBMIT */}
      <button
        onClick={handleSubmit}
        className="w-full bg-primary text-white py-3 rounded-lg"
      >
        Submit for Verification
      </button>

    </div>
  );
}