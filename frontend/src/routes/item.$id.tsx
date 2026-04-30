import { createFileRoute, useParams } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { getItemById } from "../services/itemService";

export const Route = createFileRoute("/item/$id")({
  component: ItemDetail,
});

function ItemDetail() {
  const { id } = useParams({ from: "/item/$id" });

  const [item, setItem] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [answers, setAnswers] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const data = await getItemById(id);
        setItem(data);
      } catch (error) {
        console.error("Failed to fetch item:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchItem();
  }, [id]);

  if (loading) return <div className="p-6">Loading item details...</div>;
  if (!item) return <div className="p-6">Item not found ❌</div>;

  // Handle items that might not have questions array
  const questions = item.questions || [];

  const handleChange = (index: number, value: string) => {
    const updated = [...answers];
    updated[index] = value;
    setAnswers(updated);
  };

  const handleSubmit = () => {
    setErrorMsg("");
    if (answers.length !== questions.length) {
      setErrorMsg("Please answer all questions");
      return;
    }

    if (answers.some((a) => !a || a.trim() === "")) {
      setErrorMsg("Please fill all answers");
      return;
    }

    let allCorrect = true;
    for (let i = 0; i < questions.length; i++) {
      const correctAnswer = questions[i].answer || "";
      if (answers[i].trim().toLowerCase() !== correctAnswer.trim().toLowerCase()) {
        allCorrect = false;
        break;
      }
    }

    if (allCorrect) {
      setSubmitted(true);
    } else {
      setErrorMsg("Incorrect answers. Please try again.");
    }
  };

  const itemName = item.name || item.itemName || item.title || "Unknown Item";
  const progress = questions.length > 0 ? (answers.filter(a => a).length / questions.length) * 100 : 0;

  return (
    <div className="min-h-screen bg-muted/30 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-card border border-border rounded-2xl shadow-lg p-6">

        {/* 🔥 HEADER */}
        <h1 className="text-2xl font-bold mb-1">{itemName}</h1>
        <p className="text-sm text-muted-foreground mb-4">
          Location: {item.location || item.locationFound || "Unknown"} <br/>
          Description: {item.description || "No description provided."}
        </p>

        {questions.length > 0 ? (
          <>
            <p className="text-sm text-muted-foreground mb-6">
              Answer the following questions to verify ownership
            </p>

            {/* 📊 PROGRESS */}
            <div className="mb-6">
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary transition-all"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {answers.filter(a => a).length} / {questions.length} answered
              </p>
            </div>

            {!submitted ? (
              <div className="space-y-5">
                {errorMsg && (
                  <div className="text-red-500 bg-red-100 p-3 rounded-lg text-sm font-medium">
                    {errorMsg}
                  </div>
                )}

                {/* QUESTIONS */}
                {questions.map((q: any, i: number) => (
                  <div
                    key={i}
                    className="p-4 rounded-xl border border-border bg-muted/40"
                  >
                    <label className="block text-sm font-medium mb-2">
                      {i + 1}. {q.question || q}
                    </label>

                    <input
                      type="text"
                      placeholder="Type your answer..."
                      value={answers[i] || ""}
                      onChange={(e) =>
                        handleChange(i, e.target.value)
                      }
                      className="w-full p-3 rounded-lg border border-border bg-background outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                ))}

                {/* SUBMIT */}
                <button
                  onClick={handleSubmit}
                  className="w-full py-3 rounded-xl bg-primary text-primary-foreground font-semibold hover:opacity-90 transition"
                >
                  Verify Ownership
                </button>
              </div>
            ) : (
              <div className="text-center py-10">
                <div className="text-green-600 text-lg font-semibold mb-2">
                  🎉 all r correct you r the owner of the item
                </div>
                <p className="text-sm text-muted-foreground">
                  Your claim has been successfully verified!
                </p>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-10">
             <p className="text-sm text-muted-foreground">
               No verification questions found for this item.
             </p>
          </div>
        )}
      </div>
    </div>
  );
}