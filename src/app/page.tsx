import { WooriMohaeChatSection } from "@/components/chat/WooriMohaeChatSection";

export default function Home() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-5xl flex-col items-center gap-10 px-4 pb-12 pt-12 sm:px-8">
      <WooriMohaeChatSection />
    </main>
  );
}
