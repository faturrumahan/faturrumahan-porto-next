import ContentBar from "@/components/organism/ContentBar";
import ProfileBar from "@/components/organism/ProfileBar";

export default function Home() {
  return (
    <main className="flex gap-5 p-10 bg-stone-200 min-h-screen">
      <ProfileBar />
      <ContentBar />
    </main>
  );
}
