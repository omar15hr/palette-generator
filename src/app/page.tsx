'use client';

import { Button } from "@/components/ui/button";
import { HexadecimalContext } from "./context/hexadecimal.context";
import { ModeToggle } from "./components/ModeToggle";
import { SavePalette } from "./components/SavePalette";
import { Shuffle } from "lucide-react";
import { Toaster } from "@/components/ui/sonner";
import { useContext, useEffect, useMemo, useState } from "react";
import AppController from "./page.controller";
import ColorPicker from "./components/ColorPicker";
import Palette from "./components/Palette";
import SavePaletteSection from "./components/save-palette-section/SavePaletteSection";
import store from "@/app/utils/palettes";
import { ValidateHexadecimal } from "./utils/hexadecimal-validator";

const controller: AppController = new AppController();

export default function Home() {
  const provider = useContext(HexadecimalContext);
  const [ color, setColor ] = useState("#ffffff");
  console.log(color);
  const colors = useMemo(() => controller.getColor(color), [ color ]);

  useEffect(() => {
    if (!ValidateHexadecimal(provider.hexColor)) return;

    setColor(provider.hexColor);

  }, [ provider.hexColor ]);
  return (
    <>
      <section className="pt-10">
      <div
          style={{ backgroundColor: color }}
          className="absolute inset-0 bg-gradient-to-b from-[var(--color)] to-white to-25% -z-10"
        />
        <div className="flex flex-col items-center justify-center w-full mx-auto gap-[36px] mb-10">
          <h1 className="text-3xl font-bold font-headings lg:text-6xl">
            Generate your Custom Palette
          </h1>
          <div className="flex gap-3">
            <ColorPicker />
            <ModeToggle />
          </div>
          <Toaster />
          <SavePalette colors={colors} action={store.add} />
          <Palette colors={colors} variant={"Primary"} />
          <div className="flex gap-4">
            <Button variant={"default"} className="cursor-pointer" onClick={() => provider.setHexColor(controller.getRandom()!)}>
              Generate random <Shuffle />
            </Button>
            <Button variant={"default"} className="cursor-pointer">
              Generate with AI
            </Button>
          </div>
        </div>
      </section>

      <section>
        <SavePaletteSection />
      </section>
    </>
  );
}
