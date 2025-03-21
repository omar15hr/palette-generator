import { Save } from "lucide-react";
import { Button } from "@/components/ui/button";

// interface SavePaletteProps {
//   colors: { color: string; text: string }[];
//   action: (name: string, palette: Palette) => void;
// }

export function SavePalette() {
  return (
    <Button className="rounded-[4px] cursor-pointer">
      <Save />
      Save Palette
    </Button>
  );
}
