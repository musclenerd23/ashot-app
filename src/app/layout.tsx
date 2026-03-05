import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Ashot Turns 40 — Save the Date',
  description: 'July 4th, 2026 • Yerevan, Armenia',
  openGraph: {
    title: 'Ashot Turns 40 — Save the Date',
    description: 'July 4th, 2026 • Yerevan, Armenia',
    images: [
      {
        url: 'https://ashot.app/preview.gif',
        width: 600,
        height: 315,
        type: 'image/gif',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ashot Turns 40 — Save the Date',
    description: 'July 4th, 2026 • Yerevan, Armenia',
    images: ['https://ashot.app/preview.gif'],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet" />
      </head>
      <body style={{ margin: 0, padding: 0, overflow: 'hidden' }}>{children}</body>
    </html>
  );
}
