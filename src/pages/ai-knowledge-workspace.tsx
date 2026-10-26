import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  BrainIcon,
  LightningIcon,
  ShieldCheckIcon,
  UsersThreeIcon,
  ArrowRightIcon,
  CheckCircleIcon,
  RocketLaunchIcon,
} from "@phosphor-icons/react";
import Header from "../components/layout/header";

// ─── Animated counter hook ────────────────────────────────────────
function useCountUp(target: number, duration = 2000, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);
  return count;
}

// ─── Feature data ─────────────────────────────────────────────────
const features = [
  {
    icon: BrainIcon,
    title: "AI-Powered Insights",
    description:
      "Leverage intelligent suggestions and automated workflows to surface the knowledge that matters most.",
  },
  {
    icon: LightningIcon,
    title: "Lightning Fast",
    description:
      "Optimized for speed — search, organize, and retrieve your knowledge base in milliseconds.",
  },
  {
    icon: ShieldCheckIcon,
    title: "Secure by Default",
    description:
      "Enterprise-grade security with role-based access and end-to-end encryption for all your data.",
  },
  {
    icon: UsersThreeIcon,
    title: "Team Collaboration",
    description:
      "Work together seamlessly with shared workspaces, real-time updates, and smart task delegation.",
  },
];

// ─── Stagger-animated wrapper ─────────────────────────────────────
function FadeInUp({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(t);
  }, [delay]);
  return (
    <div
      className={`transition-all duration-700 ease-out ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      } ${className}`}
    >
      {children}
    </div>
  );
}

// ─── Main Landing Page ────────────────────────────────────────────
export default function AIKnowledgeWorkspace() {
  const [statsVisible, setStatsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setStatsVisible(true), 800);
    return () => clearTimeout(timer);
  }, []);

  const users = useCountUp(10000, 2000, statsVisible);
  const docs = useCountUp(500000, 2200, statsVisible);
  const uptime = useCountUp(99, 1800, statsVisible);

  return (
    <div className="min-h-screen bg-white text-jet-black overflow-x-hidden">
      {/* ── Shared Header ──────────────────────────────────────── */}
      <Header />

      {/* ── Hero ────────────────────────────────────────────────── */}
      <section className="relative flex min-h-[calc(100vh-65px)] items-center justify-center px-6">
        {/* Subtle gradient orbs */}
        <div className="pointer-events-none absolute -top-40 left-1/4 h-[500px] w-[500px] rounded-full bg-primary/10 blur-[120px]" />
        <div className="pointer-events-none absolute -bottom-20 right-1/4 h-[400px] w-[400px] rounded-full bg-secondary/10 blur-[100px]" />

        <div className="relative mx-auto max-w-4xl text-center">
          <FadeInUp delay={100}>
            <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-medium text-primary">
              <RocketLaunchIcon className="size-3.5" weight="fill" />
              Now in Beta — Try it free
            </span>
          </FadeInUp>

          <FadeInUp delay={250}>
            <h1 className="mt-6 text-5xl font-bold leading-tight tracking-tight text-jet-black sm:text-6xl lg:text-7xl">
              Work smarter.
              <br />
              <span className="text-primary">Think</span>{" "}
              <span className="italic text-secondary">faster.</span>
            </h1>
          </FadeInUp>

          <FadeInUp delay={450}>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-gray-500">
              Your AI-powered knowledge workspace that organizes, surfaces, and
              connects information — so you can focus on what actually matters.
            </p>
          </FadeInUp>

          <FadeInUp delay={600}>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                to="/login"
                className="group inline-flex items-center gap-2 rounded-xl bg-primary px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-primary/25 transition-all hover:shadow-xl hover:shadow-primary/30 hover:opacity-95 active:scale-[0.97]"
              >
                Get Started Free
                <ArrowRightIcon className="size-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <a
                href="#features"
                className="inline-flex items-center gap-2 rounded-xl border border-gray-200 px-8 py-3.5 text-base font-semibold text-jet-black transition-all hover:border-primary hover:text-primary"
              >
                Learn More
              </a>
            </div>
          </FadeInUp>

          {/* Trust badges */}
          <FadeInUp delay={800}>
            <div className="mt-16 flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-sm text-gray-400">
              <span className="flex items-center gap-1.5">
                <CheckCircleIcon
                  className="size-4 text-teal"
                  weight="fill"
                />
                No credit card required
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircleIcon
                  className="size-4 text-teal"
                  weight="fill"
                />
                Free plan available
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircleIcon
                  className="size-4 text-teal"
                  weight="fill"
                />
                Cancel anytime
              </span>
            </div>
          </FadeInUp>
        </div>
      </section>

      {/* ── Stats ───────────────────────────────────────────────── */}
      <section className="border-y border-gray-100 bg-lavender/30 py-16">
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-10 px-6 sm:grid-cols-3">
          {[
            { value: users.toLocaleString() + "+", label: "Active Users" },
            { value: docs.toLocaleString() + "+", label: "Documents Managed" },
            { value: uptime + ".9%", label: "Uptime SLA" },
          ].map((stat) => (
            <FadeInUp key={stat.label} delay={900} className="text-center">
              <div className="text-4xl font-bold text-jet-black">
                {stat.value}
              </div>
              <div className="mt-1 text-sm text-gray-500">{stat.label}</div>
            </FadeInUp>
          ))}
        </div>
      </section>

      {/* ── Features ────────────────────────────────────────────── */}
      <section id="features" className="py-24 px-6">
        <div className="mx-auto max-w-6xl">
          <FadeInUp delay={200}>
            <div className="text-center">
              <span className="text-xs font-semibold uppercase tracking-widest text-primary">
                Features
              </span>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-jet-black sm:text-4xl">
                Everything you need, nothing you don't.
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-gray-500">
                A minimalist workspace packed with powerful capabilities —
                designed for individuals and teams who value clarity.
              </p>
            </div>
          </FadeInUp>

          <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <FadeInUp key={feature.title} delay={400 + index * 150}>
                <div className="group rounded-2xl border border-gray-100 bg-white p-6 transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1">
                  <div className="mb-4 inline-flex rounded-xl bg-primary/10 p-3 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                    <feature.icon className="size-6" weight="duotone" />
                  </div>
                  <h3 className="text-base font-semibold text-jet-black">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-gray-500">
                    {feature.description}
                  </p>
                </div>
              </FadeInUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ──────────────────────────────────────────── */}
      <section className="px-6 pb-24">
        <FadeInUp delay={200}>
          <div className="relative mx-auto max-w-5xl overflow-hidden rounded-3xl bg-jet-black px-8 py-16 text-center sm:px-16">
            {/* decorative gradient */}
            <div className="pointer-events-none absolute -right-20 -top-20 h-60 w-60 rounded-full bg-primary/20 blur-[80px]" />
            <div className="pointer-events-none absolute -bottom-20 -left-20 h-60 w-60 rounded-full bg-secondary/15 blur-[80px]" />

            <h2 className="relative text-3xl font-bold text-white sm:text-4xl">
              Ready to transform how you work?
            </h2>
            <p className="relative mx-auto mt-4 max-w-lg text-base text-pale-sky/80">
              Join thousands of professionals who use AI Knowledge Workspace to
              stay organized, collaborative, and ahead of the curve.
            </p>
            <div className="relative mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                to="/login"
                className="group inline-flex items-center gap-2 rounded-xl bg-primary px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-primary/30 transition-all hover:shadow-xl hover:opacity-95 active:scale-[0.97]"
              >
                Start for Free
                <ArrowRightIcon className="size-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                to="/login"
                className="inline-flex items-center gap-2 rounded-xl border border-white/20 px-8 py-3.5 text-base font-semibold text-white transition-all hover:border-white/50 hover:bg-white/5"
              >
                Sign In
              </Link>
            </div>
          </div>
        </FadeInUp>
      </section>

      {/* ── Footer ──────────────────────────────────────────────── */}
      <footer className="border-t border-gray-100 bg-white px-6 py-10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 sm:flex-row">
          <span className="text-sm text-gray-400 select-none">
            © {new Date().getFullYear()} AI
            <span className="text-primary font-semibold">Knowledge</span>{" "}
            Workspace. All rights reserved.
          </span>
          <div className="flex gap-6 text-sm text-gray-400">
            <a href="#" className="transition hover:text-jet-black">
              Privacy
            </a>
            <a href="#" className="transition hover:text-jet-black">
              Terms
            </a>
            <a href="#" className="transition hover:text-jet-black">
              Contact
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
