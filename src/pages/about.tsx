import { UsersThreeIcon, TargetIcon, RocketLaunchIcon } from "@phosphor-icons/react";

export default function AboutPage() {
    return (
      <div className="flex min-h-full flex-col gap-10 bg-gradient-to-b from-background to-white p-6 lg:p-10">
        {/* Header */}
        <div className="pt-6">
          <h2 className="text-3xl font-bold tracking-tight text-dark">
            About us
          </h2>
          <div className="mt-1 h-0.5 w-12 rounded-full bg-primary" />
        </div>

        {/* Intro */}
        <div className="max-w-3xl">
          <p className="text-base leading-7 text-muted">
            Welcome to our AI Knowledge Workspace! We are dedicated to providing
            a comprehensive platform for managing and utilizing AI knowledge
            effectively. Our goal is to empower individuals and organizations
            with the tools they need to harness the power of artificial
            intelligence.
          </p>
        </div>

        {/* Values grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {[
            {
              icon: TargetIcon,
              title: "Our Mission",
              description:
                "To democratize AI knowledge management and make powerful tools accessible to everyone.",
              color: "text-primary bg-primary/10",
            },
            {
              icon: UsersThreeIcon,
              title: "Our Team",
              description:
                "A passionate group of engineers and designers building the future of intelligent workspaces.",
              color: "text-teal bg-teal/10",
            },
            {
              icon: RocketLaunchIcon,
              title: "Our Vision",
              description:
                "Creating a world where knowledge is seamlessly organized, connected, and always at your fingertips.",
              color: "text-secondary bg-secondary/10",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-slate-200/60 bg-white/70 p-6 backdrop-blur-sm transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/5"
            >
              <div
                className={`mb-4 inline-flex rounded-xl p-3 ${item.color}`}
              >
                <item.icon className="size-5" weight="duotone" />
              </div>
              <h3 className="text-[15px] font-semibold text-dark">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        {/* Image */}
        <div className="overflow-hidden rounded-2xl border border-slate-200/60 shadow-sm">
          <img
            className="w-full object-cover"
            src="/assets/images/about_us.jpg"
            alt="About us"
          />
        </div>
      </div>
    );
}
