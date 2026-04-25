import { createFileRoute } from "@tanstack/react-router";
import { PageContainer } from "@/components/layout/PageContainer";
import avatar from "@/assets/avatar-user.jpg";
import { Link } from "@tanstack/react-router";
export const Route = createFileRoute("/profile")({
  head: () => ({ meta: [{ title: "Profile — Campus Lost & Found" }] }),
  component: Profile,
});

function Profile() {
  return (
    <PageContainer title="Profile">
      <div className="space-y-6">

        {/* 🔹 Top Profile Card */}
        <div className="rounded-2xl border border-border bg-card p-6 flex flex-col sm:flex-row items-start gap-6">
          <img
            src={avatar}
            alt="Riya Sharma"
            className="h-24 w-24 rounded-full object-cover"
          />

          <div className="flex-1 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <div>
                <div className="text-xl font-bold">Riya Sharma</div>
                <div className="text-sm text-muted-foreground">
                  Student · Computer Science
                </div>
              </div>

              <button className="px-4 py-2 text-sm rounded-lg border border-border hover:bg-muted transition">
                Edit Profile
              </button>
            </div>

            {/* 🔹 Info Grid */}
            <dl className="grid grid-cols-2 sm:grid-cols-4 gap-x-6 gap-y-3 mt-3 text-sm">
              <div>
                <dt className="text-muted-foreground text-xs">Email</dt>
                <dd>riya.sharma@campus.edu</dd>
              </div>
              <div>
                <dt className="text-muted-foreground text-xs">Roll No.</dt>
                <dd>CS21-1042</dd>
              </div>
              <div>
                <dt className="text-muted-foreground text-xs">Wallet</dt>
                <dd className="font-mono text-xs">0x7a3...9f2e</dd>
              </div>
              <div>
                <dt className="text-muted-foreground text-xs">Joined</dt>
                <dd>Aug 2023</dd>
              </div>
            </dl>
          </div>
        </div>

        {/* 🔹 Stats Section */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: "Items Reported", value: 12 },
            { label: "Items Claimed", value: 8 },
            { label: "Successful Returns", value: 6 },
            { label: "Trust Score", value: "92%" },
          ].map((stat, i) => (
            <div
              key={i}
              className="rounded-xl border border-border bg-card p-4 text-center"
            >
              <div className="text-lg font-semibold">{stat.value}</div>
              <div className="text-xs text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* 🔹 Recent Activity */}
        <div className="rounded-2xl border border-border bg-card p-6">
          <div className="text-sm font-semibold mb-4">Recent Activity</div>

          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span>Reported a lost wallet</span>
              <span className="text-muted-foreground text-xs">2 days ago</span>
            </div>
            <div className="flex justify-between">
              <span>Claimed a found phone</span>
              <span className="text-muted-foreground text-xs">5 days ago</span>
            </div>
            <div className="flex justify-between">
              <span>Returned ID card to owner</span>
              <span className="text-muted-foreground text-xs">1 week ago</span>
            </div>
          </div>
        </div>

        {/* 🔹 Actions */}
        <div className="flex gap-3">
          <Link to="/reportfound">
            <button className="px-5 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-medium shadow-[var(--shadow-elevated)] hover:opacity-90 transition-opacity">
              Report Found Item
            </button>
          </Link>
          
        </div>

      </div>
    </PageContainer>
  );
}