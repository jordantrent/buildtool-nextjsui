import { MainCard } from "@/components/maincard";
import { ModeToggle } from "@/components/modetoggle";

export default function Home() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <MainCard />
      <div className="absolute bottom-4 left-4 p-2">
        <ModeToggle />
      </div>
    </div>
  );
}
