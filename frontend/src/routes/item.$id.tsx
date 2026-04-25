import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/item/$id")({
  component: ItemPage,
});

function ItemPage() {
  const { id } = Route.useParams();

  // 🔥 TEMP DATA (replace with MongoDB later)
  const item = {
    id,
    name: "Black Wallet",
    location: "Library",
    description: "Found near reading area on table",
    questions: [
      "What color is your wallet?",
      "What is inside it?",
      "Where did you lose it?",
    ],
  };

  const [answers, setAnswers] = useState<string[]>(
    new Array(item.questions.length).fill("")
  );

  const handleChange = (value: string, index: number) => {
    const updated = [...answers];
    updated[index] = value;
    setAnswers(updated);
  };

  const handleSubmit = () => {
    console.log("Item ID:", id);
    console.log("Answers:", answers);

    alert("Submitted for verification (MongoDB later)");
  };

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">

      {/* ITEM DETAILS */}
      <div className="border rounded-xl p-4 bg-card">
        <h1 className="text-xl font-bold">{item.name}</h1>
        <p className="text-sm text-muted-foreground mt-1">
          {item.description}
        </p>
        <p className="text-xs mt-2">📍 {item.location}</p>
      </div>

      {/* QUESTIONS */}
      <div className="space-y-4">
        <h2 className="font-semibold">Verification Questions</h2>

        {item.questions.map((q, i) => (
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