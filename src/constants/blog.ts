export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string[];
  author: string;
  publishedAt: string;
  readingMinutes: number;
  category: string;
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "spaced-repetition-actually-works",
    title: "Why spaced repetition actually works (and how to use it)",
    excerpt:
      "Cramming feels productive but fades fast. Here's the science behind spacing your review sessions — and how to apply it without a complicated system.",
    author: "StudyMate AI Team",
    publishedAt: "2026-05-12",
    readingMinutes: 6,
    category: "Study Techniques",
    content: [
      "Spaced repetition is one of the few study techniques with decades of cognitive science behind it. The core idea: you remember something longer if you review it right before you're about to forget it, rather than reviewing it repeatedly in a single sitting.",
      "In practice, this means reviewing new material after one day, then three days, then a week, then two weeks. Each successful recall pushes the next review further out. If you struggle to recall something, the interval resets shorter.",
      "You don't need special software to start. A simple three-pile system — 'daily,' 'every few days,' and 'weekly' — gets you most of the benefit. Move a topic between piles based on how easily you recalled it.",
      "Where StudyMate AI helps: when you generate a study plan with weak topics flagged, those topics get revisited more frequently across your weekly plan automatically, so you don't have to track intervals by hand.",
    ],
  },
  {
    slug: "active-recall-vs-rereading",
    title: "Active recall vs. rereading: what the research says",
    excerpt:
      "Rereading your notes feels like studying, but it's one of the least effective methods for retention. Active recall is more effort — and it's worth it.",
    author: "StudyMate AI Team",
    publishedAt: "2026-04-28",
    readingMinutes: 5,
    category: "Study Techniques",
    content: [
      "When you reread a chapter, familiarity with the text creates an illusion of mastery. You recognize the words, so it feels like you know the material — but recognition and recall are different skills, and exams test recall.",
      "Active recall means closing the book and trying to reproduce the information from memory: answering practice questions, explaining a concept aloud, or sketching a diagram from scratch. It's harder in the moment, which is exactly why it works — the effortful retrieval strengthens the memory trace.",
      "A simple way to start: after reading a section, write down everything you remember without looking. Then check what you missed and reread only that part.",
      "This is also why StudyMate AI's Document Intelligence feature generates quiz questions from your uploaded notes automatically — testing yourself on the material is more useful than a passive summary alone.",
    ],
  },
  {
    slug: "building-a-realistic-study-schedule",
    title: "Building a study schedule you'll actually follow",
    excerpt:
      "Most study schedules fail because they're too ambitious on day one. Here's how to build one that survives contact with a real week.",
    author: "StudyMate AI Team",
    publishedAt: "2026-04-09",
    readingMinutes: 7,
    category: "Planning",
    content: [
      "The most common planning mistake is scheduling every waking hour as study time. It looks impressive on paper and collapses by Wednesday. A sustainable plan accounts for the fact that you have a life outside exams.",
      "Start with your actual available hours, not your aspirational ones. If you realistically have 2-3 focused hours on a weekday, plan for that — not 6.",
      "Order matters more than most people think. Study your hardest or weakest subject when your energy is highest, not last, when willpower is depleted.",
      "Build in a weekly review slot to look at what worked and adjust. A schedule that can't adapt to a bad week isn't a schedule, it's a wish list.",
      "This is the exact logic behind the AI Study Planner: it weighs your weak topics and available hours, then lets you refine the plan in plain language when your week changes.",
    ],
  },
  {
    slug: "note-taking-methods-compared",
    title: "Cornell notes, outlining, or mind maps? A practical comparison",
    excerpt:
      "There's no single best note-taking method — the right one depends on the subject and how you'll use the notes later.",
    author: "StudyMate AI Team",
    publishedAt: "2026-03-22",
    readingMinutes: 6,
    category: "Study Techniques",
    content: [
      "Cornell notes split the page into cues, notes, and a summary section. They're excellent for lecture-heavy subjects where you need to review and self-quiz later — the cue column naturally becomes a study guide.",
      "Outlining works best for hierarchical subjects like history or law, where ideas nest under broader categories and the structure itself carries meaning.",
      "Mind maps shine for subjects with lots of interconnected relationships — biology systems, or brainstorming an essay — where a linear format hides the connections.",
      "The method matters less than consistency and later use. Notes you never revisit provide little value regardless of format; the best system is the one you'll actually review.",
    ],
  },
  {
    slug: "exam-week-without-burnout",
    title: "Getting through exam week without burning out",
    excerpt:
      "Exam week performance is decided in the weeks before, not the night before. A few habits make the difference between showing up sharp and showing up exhausted.",
    author: "StudyMate AI Team",
    publishedAt: "2026-03-03",
    readingMinutes: 5,
    category: "Wellbeing",
    content: [
      "Sleep debt compounds. One all-nighter doesn't just cost you that night — it measurably impairs recall and reaction time for days afterward. Protecting sleep during exam prep is a study strategy, not a luxury.",
      "Taper, don't sprint. Your last 48 hours before an exam should involve lighter review, not new material. Cramming new content right before an exam adds interference that can crowd out what you already know.",
      "Short breaks with real separation — a walk, not another screen — restore focus better than pushing through fatigue.",
      "If you notice persistent overwhelm rather than normal exam nerves, that's worth talking to someone about, whether a school counselor or a trusted person in your life. Performance pressure is real, but so is knowing when to ask for support.",
    ],
  },
  {
    slug: "using-ai-without-losing-the-learning",
    title: "Using AI tools to study without losing the learning",
    excerpt:
      "AI can summarize your notes in seconds. Here's how to use that speed without skipping the thinking that actually builds understanding.",
    author: "StudyMate AI Team",
    publishedAt: "2026-02-14",
    readingMinutes: 6,
    category: "AI & Learning",
    content: [
      "The risk with AI study tools isn't that they're inaccurate — it's that they're fast enough to let you skip the effortful part of learning entirely. Reading an AI summary is not the same as reading the source material.",
      "A better pattern: read the material yourself first, then use AI to check your understanding — compare your own summary against the AI's, or use AI-generated quiz questions to test recall rather than replace study.",
      "Use AI for the parts that are genuinely mechanical: organizing a schedule around your constraints, extracting formulas from a dense PDF, or generating practice questions. Keep the actual reasoning and recall practice in your own hands.",
      "That's the design principle behind StudyMate AI's features — the AI plans and extracts, but quiz questions, refinements, and the chat assistant are built to prompt you to think, not to think for you.",
    ],
  },
];

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((post) => post.slug === slug);
}