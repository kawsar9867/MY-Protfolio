import { Inter, Fira_Code } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const firaCode = Fira_Code({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata = {
  title: "Kawsar Ahamed - MERN Stack Developer",
  description: "Portfolio of Kawsar Ahamed, MERN Stack Web Developer",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`scroll-smooth ${inter.variable} ${firaCode.variable} h-full antialiased`}
    >
      <body className="bg-[#050608] text-neutral-200 font-sans antialiased min-h-screen relative flex flex-col justify-between selection:bg-purple-600 selection:text-white">
        {children}
      </body>
    </html>
  );
}
