import { createFileRoute } from "@tanstack/react-router";
import { PageContainer } from "@/components/layout/PageContainer";

const faqs = [
  // 🔐 Security & Verification
  {
    q: "How does item verification work?",
    a: "Every reported item is checked against the details submitted, and claims are reviewed through admin-approved questions to confirm ownership.",
  },
  {
    q: "Is my data secure?",
    a: "Yes. Personal information is kept limited to what is needed for verification and processing, and access is restricted to authorized users.",
  },
  {
    q: "Can someone fake an item claim?",
    a: "No. Claims require verification through admin-approved questions and secure account checks.",
  },

  // 📦 Item Reporting
  {
    q: "How do I report a lost item?",
    a: "Go to 'Report Item', fill in item details, location, and description. Once submitted, it is recorded in the system for matching.",
  },
  {
    q: "Who can report found items?",
    a: "Any verified student or admin can report found items through the platform.",
  },
  {
    q: "Can I edit a reported item?",
    a: "No. Once submitted, items should be reviewed by admin for any necessary corrections or updates.",
  },

  // 🔍 Claim Process
  {
    q: "How do I claim an item?",
    a: "Click on the item, answer verification questions set by admin, and submit for approval.",
  },
  {
    q: "What happens after I submit a claim?",
    a: "Your claim is reviewed by admin. If answers match, the item is marked as returned.",
  },
  {
    q: "How long does verification take?",
    a: "Usually within 24 hours depending on admin workload.",
  },

  // 📱 QR & OTP
  {
    q: "What is QR verification used for?",
    a: "QR codes are used to verify physical possession of the item during handover.",
  },
  {
    q: "What if I lose my OTP or QR code?",
    a: "You can regenerate it anytime from the 'My Claims' section.",
  },

  // 👤 User & Account
  {
    q: "Do I need an account to use the system?",
    a: "Yes, only registered users can report, claim, or verify items.",
  },
  {
    q: "Can I see my previous claims?",
    a: "Yes, all your claims are stored in 'My Claims' history.",
  },

  // 🧑‍💼 Admin
  {
    q: "What does the admin do?",
    a: "Admins verify items, approve claims, manage disputes, and keep item records accurate and up to date.",
  },
  {
    q: "Can admin reject a claim?",
    a: "Yes, if verification answers do not match stored records.",
  },

  // ⚡ System
  {
    q: "Is this system real-time?",
    a: "Yes, new items appear instantly once reported by users or admins.",
  },
  {
    q: "What happens if two people claim the same item?",
    a: "The system prioritizes the correct answers and admin verification before approval.",
  },
];

export const Route = createFileRoute("/help")({
  head: () => ({
    meta: [{ title: "Help & Support — Campus Lost & Found" }],
  }),
  component: Help,
});

function Help() {
  return (
    <PageContainer
      title="Help & Support"
      description="Everything you need to know about using the platform"
    >
      <div className="space-y-3">
        {faqs.map((f, i) => (
          <details
            key={i}
            className="rounded-2xl border border-border bg-card p-5 group"
          >
            <summary className="cursor-pointer font-medium text-sm list-none flex items-center justify-between">
              {f.q}
              <span className="text-primary group-open:rotate-45 transition-transform">
                +
              </span>
            </summary>

            <p className="mt-3 text-sm text-muted-foreground">
              {f.a}
            </p>
          </details>
        ))}
      </div>
    </PageContainer>
  );
}