export type ProfileLink = {
  label: string;
  href: string;
};

export type SkillGroup = {
  title: string;
  items: Array<{
    name: string;
    level: "Advanced" | "Proficient" | "Working";
    evidence?: string;
  }>;
};

export type FAQ = {
  question: string;
  answer: string;
};

export type Testimonial = {
  quote: string;
  source: string;
  href?: string;
};

export type Resource = {
  label: string;
  href: string;
  note?: string;
};

export type EngagementStep = {
  step: number;
  title: string;
};

export const profile = {
  name: "Monaim Abdel",
  title: "Workflow Automation Engineer | n8n • Make • Python • API Systems",
  summary:
    "I design and implement automation systems that eliminate repetitive operations and improve process reliability.",
  value:
    "Reduces manual workload by 10–20 hours/week (based on client workflows) through structured automation delivery.",
  deliverables: [
    "End-to-end workflow design",
    "API integrations",
    "Data synchronization",
    "Error handling and monitoring",
    "AI-enhanced automation",
    "Documentation"
  ] as string[],
  industries: ["E-commerce", "SaaS", "Real Estate", "Healthcare", "Finance", "Education"] as string[],
  engagementProcess: [
    { step: 1, title: "Workflow audit" },
    { step: 2, title: "System design" },
    { step: 3, title: "Implementation" },
    { step: 4, title: "Testing and monitoring" },
    { step: 5, title: "Documentation" }
  ] as EngagementStep[],
  result: "Operational time reduction and process standardization through monitored workflows and fail-safes.",
  contact: {
    email: "monaimabdel119@gmail.com",
    links: [] as ProfileLink[]
  },
  skills: [
    {
      title: "Core Stack",
      items: [
        { name: "Next.js (App Router)", level: "Proficient" },
        { name: "TypeScript", level: "Proficient" },
        { name: "Tailwind CSS", level: "Proficient" },
        { name: "Prisma", level: "Proficient" },
        { name: "SQLite", level: "Working" }
      ]
    },
    {
      title: "Security & Auth",
      items: [
        { name: "NextAuth (Credentials)", level: "Working" },
        { name: "bcrypt password hashing", level: "Working" }
      ]
    }
  ] as SkillGroup[],
  testimonials: [] as Testimonial[],
  resources: [] as Resource[],
  faqs: [
    {
      question: "What was your role in these projects?",
      answer:
        "I owned end-to-end delivery: architecture, implementation, testing, deployment readiness, and maintenance."
    },
    {
      question: "Why did you choose this method or stack?",
      answer:
        "I prioritize simple, secure defaults and a maintainable codebase with strong typing and minimal dependencies."
    },
    {
      question: "What would you do differently next time?",
      answer:
        "I iterate based on real usage: tighten validation, improve UX around admin flows, and add targeted automated tests."
    }
  ] as FAQ[]
};
