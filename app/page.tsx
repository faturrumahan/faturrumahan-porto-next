import ContentBar from "@/components/organism/ContentBar";
import ProfileBar from "@/components/organism/ProfileBar";

export default function Home() {
  return (
    <main className="flex max-lg:flex-col gap-3 p-5 bg-stone-200 min-h-screen lg:p-10 lg:gap-5">
      <ProfileBar />
      <ContentBar />
    </main>
  );
}
