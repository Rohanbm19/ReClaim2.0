import { createFileRoute } from "@tanstack/react-router";
import { PageContainer } from "@/components/layout/PageContainer";
import { Upload } from "lucide-react";

export const Route = createFileRoute("/report")({
  head: () => ({ meta: [{ title: "Report Item — Campus Lost & Found" }] }),
  component: Report,
});

function Report() {
  return (
    <PageContainer title="Report Found Item" description="Help return a lost item to its owner — record it on the blockchain.">
      <form className="rounded-2xl border border-border bg-card p-6 space-y-5 max-w-2xl">
        <Field label="Item Name"><input className="input" placeholder="e.g. Black wallet" /></Field>
        <Field label="Category">
          <select className="input">
            <option>Electronics</option><option>Accessories</option><option>Bags</option><option>Sports</option><option>Other</option>
          </select>
        </Field>
        <Field label="Location Found"><input className="input" placeholder="e.g. Library, Block A" /></Field>
        <Field label="Description"><textarea className="input min-h-24" placeholder="Distinguishing features..." /></Field>
        <Field label="Upload Photo">
          <label className="flex flex-col items-center justify-center gap-2 border-2 border-dashed border-border rounded-xl p-8 cursor-pointer hover:bg-muted/40 transition-colors">
            <Upload className="h-6 w-6 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Click to upload or drag and drop</span>
            <input type="file" className="hidden" />
          </label>
        </Field>
        <button type="button" className="px-5 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-medium shadow-[var(--shadow-elevated)]">
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
