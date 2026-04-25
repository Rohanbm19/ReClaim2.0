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
  });
  const [error, setError] = useState("");

  const validateForm = () => {
    return formData.itemName && formData.description && formData.date && formData.time && formData.location;
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