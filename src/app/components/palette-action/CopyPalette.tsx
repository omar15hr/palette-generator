import { Copy } from "lucide-react";
import { toast } from "sonner";
import { TooltipTrigger } from "@radix-ui/react-tooltip";
import { clipboard } from "@/app/utils/clipboard";
import { tailwindGenerator } from "@/lib/tailwindGenerator";
import { Tooltip, TooltipContent, TooltipProvider } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Palette } from "@/app/utils/palettes";

interface CopyPaletteProps {
  colors: { color: string; text: string }[];
}

export function CopyPalette({ colors }: CopyPaletteProps) {

  const handlerClick = async () => {
    const response = await tailwindGenerator(colors);

    const palette: Palette | string = response[1];

    clipboard(JSON.stringify(palette));
    toast(`Palette copied correctly! 🐭`);
  };

  return (
    <TooltipProvider>
      <Tooltip delayDuration={200}>
          <TooltipTrigger asChild>
            <Button
              aria-label="copy palette"
              size={"sm"}
              variant={"outline"}
              onClick={handlerClick}
              className="ml-2 rounded-[4px]"
            >
              <Copy></Copy>
            </Button>
          </TooltipTrigger>
        <TooltipContent className="rounded-[4px]">
          <p className="text-[12px]">Copy palette</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}