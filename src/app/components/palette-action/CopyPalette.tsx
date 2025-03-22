import { Button } from "@/components/ui/button";
import { clipboard } from "@/app/utils/clipboard";
import { Copy } from "lucide-react";
import { Palette } from "@/app/utils/palettes";
import { tailwindGenerator } from "@/lib/tailwindGenerator";
import { toast } from "sonner";
import { Tooltip, TooltipContent, TooltipProvider } from "@/components/ui/tooltip";
import { TooltipTrigger } from "@radix-ui/react-tooltip";

interface CopyPaletteProps {
  colors: { color: string; text: string }[];
}

export function CopyPalette({ colors }: CopyPaletteProps) {

  const handlerClick = async () => {
    const response = await tailwindGenerator(colors);
    console.log(response);

    const palette: Palette | string = response[1];

    clipboard(JSON.stringify(palette));
    toast(`Palette copied correctly!`);
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