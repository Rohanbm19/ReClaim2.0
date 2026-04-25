import { createFileRoute } from "@tanstack/react-router";
import { PageContainer } from "@/components/layout/PageContainer";
import avatar from "@/assets/avatar-user.jpg";

export const Route = createFileRoute("/profile")({
  head: () => ({ meta: [{ title: "Profile — Campus Lost & Found" }] }),
  component: Profile,
});

function Profile() {
  return (
    <PageContainer title="Profile">
      <div className="rounded-2xl border border-border bg-card p-6 flex items-start gap-6">
        <img src={avatar} alt="Riya Sharma" className="h-24 w-24 rounded-full object-cover" />
        <div className="flex-1 space-y-2">
          <div>
            <div className="text-xl font-bold">Riya Sharma</div>
            <div className="text-sm text-muted-foreground">Student · Computer Science</div>
          </div>
          <dl className="grid grid-cols-2 gap-x-8 gap-y-2 mt-4 text-sm">
            <div><dt className="text-muted-foreground text-xs">Email</dt><dd>riya.sharma@campus.edu</dd></div>
            <div><dt className="text-muted-foreground text-xs">Roll No.</dt><dd>CS21-1042</dd></div>
            <div><dt className="text-muted-foreground text-xs">Wallet</dt><dd className="font-mono text-xs">0x7a3...9f2e</dd></div>
            <div><dt className="text-muted-foreground text-xs">Joined</dt><dd>Aug 2023</dd></div>
          </dl>
        </div>
      </div>
    </PageContainer>
  );
}
