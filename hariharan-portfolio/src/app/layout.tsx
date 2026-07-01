import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Hariharan Joga — Agentic, Generative & Voice AI Engineer",
  description:
    "Hariharan Joga — AI engineer building agentic & generative AI: multi-agent architectures, LLM systems, and voice & chat agents. Ask my AI anything about me — it talks back.",
  openGraph: {
    title: "Hariharan Joga — Agentic, Generative & Voice AI Engineer",
    description:
      "AI engineer building agentic & generative AI — multi-agent architectures, LLM systems, voice & chat agents. Ask my AI anything — it talks back.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Chakra+Petch:wght@400;500;600;700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
        {/* Google Analytics (GA4) */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-H833VPJ1EM" />
        <script
          dangerouslySetInnerHTML={{
            __html:
              "window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-H833VPJ1EM');",
          }}
        />
      </head>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
