import { Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Palette } from "../utils/palettes";
import { tailwindGenerator } from "@/lib/tailwindGenerator";
import { toast } from "sonner";

interface SavePaletteProps {
  colors: { color: string; text: string }[];
  action: (name: string, palette: Palette) => void;
}

export function SavePalette({ colors, action }: SavePaletteProps) {
  return (
    <Button
      variant={"secondary"}
      onClick={() => {
        tailwindGenerator(colors).then(([name, palette]) => {
          action(name.toString(), palette);
          toast(`Palette saved correctly! 🐭`);
        });
      }}
      className="rounded-[4px] cursor-pointer"
    >
      <Save />
      Save Palette
    </Button>
  );
}
