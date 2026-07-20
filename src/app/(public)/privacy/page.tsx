const SECTIONS = [
  {
    title: "Information we collect",
    body: [
      "Account information: your name, email address, and profile image if you sign in with Google.",
      "Content you provide: study resources you add, study plan inputs (exam dates, subjects, weak topics, target grade), documents you upload for analysis, and chat messages sent to the AI assistant.",
      "Usage data: which AI features you use and when, so we can show you your own activity on the dashboard and improve reliability.",
    ],
  },
  {
    title: "How we use your information",
    body: [
      "To generate AI study plans, document summaries, and chat responses via Google Gemini based on the inputs you provide.",
      "To operate your account, including authentication via email/password or Google sign-in.",
      "To show you your own usage statistics on your dashboard.",
      "We do not sell your personal information to third parties.",
    ],
  },
  {
    title: "AI processing",
    body: [
      "Study plan inputs, uploaded document text, and chat messages are sent to Google's Gemini API to generate responses. This data is processed to produce your requested output (a plan, a summary, a reply) and is not used by StudyMate AI to train models.",
      "Uploaded documents are parsed to extract text for analysis. We store the AI-generated summary, key points, and quiz questions, not a permanent copy of the original file.",
    ],
  },
  {
    title: "Data retention and deletion",
    body: [
      "Resources, study plans, document analyses, and conversations are retained until you delete them or delete your account.",
      "You can delete individual resources and documents from the Manage Resources and Document Intelligence pages at any time.",
      "To request full account deletion, contact us at support@studymate.ai.",
    ],
  },
  {
    title: "Cookies and sessions",
    body: [
      "We use a session cookie to keep you signed in. This cookie is required for the application to function and is not used for advertising or third-party tracking.",
    ],
  },
  {
    title: "Your rights",
    body: [
      "You can access, update, or delete your account information at any time through your Profile and Settings pages.",
      "You can request a copy of your data or full deletion by contacting support@studymate.ai.",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold tracking-tight text-foreground">Privacy Policy</h1>
      <p className="mt-2 text-sm text-muted-foreground">Last updated: July 1, 2026</p>

      <div className="mt-10 space-y-10">
        {SECTIONS.map((section) => (
          <div key={section.title}>
            <h2 className="text-lg font-semibold text-foreground">{section.title}</h2>
            <ul className="mt-3 space-y-2">
              {section.body.map((line, i) => (
                <li key={i} className="text-sm leading-relaxed text-muted-foreground">
                  {line}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-12 rounded-lg border border-border bg-muted/30 p-5 text-sm text-muted-foreground">
        Questions about this policy? Reach us at{" "}
        <a href="mailto:support@studymate.ai" className="font-medium text-primary hover:underline">
          support@studymate.ai
        </a>
        .
      </div>
    </div>
  );
}