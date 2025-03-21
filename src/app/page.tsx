import { Toaster } from "@/components/ui/sonner";
import ColorPicker from "./components/ColorPicker";
import { ModeToggle } from "./components/ModeToggle";
import { SavePalette } from "./components/SavePalette";
import Palette from "./components/Palette";

export default function Home() {
  return (
    <section className="pt-10">
      <div className="flex flex-col items-center justify-center w-full mx-auto gap-[36px] mb-10">
        <h1 className="text-3xl font-bold font-headings lg:text-6xl">
          Generate your Custom Palette
        </h1>
        <div className="flex gap-3">
          <ColorPicker />
          <ModeToggle />
        </div>
        <Toaster />
        <SavePalette />
        <Palette colors={[]} variant={"Primary"} />
      </div>
    </section>
  );
}
