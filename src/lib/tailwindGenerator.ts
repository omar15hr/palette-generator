import { IApiColorPizza } from "@/app/interfaces/apiColorPizzaInterface";
import type { Palette } from "@/app/utils/palettes.ts";

const useOpen: boolean = true;
const COLOR_API_URL: string = useOpen
  ? process.env.API_COLOR_PIZZA ?? ''
  : "http://localhost:3001/";


export async function tailwindGenerator(colors: { color: string; text: string }[]): Promise<[string, Palette ]> {

  const response = await fetch(`${COLOR_API_URL}${colors[4].color.slice(1)}`);

  const { colors: colorsPizza, paletteTitle }: IApiColorPizza =  await response.json();

  const normalizedName = (colorsPizza[0].name || paletteTitle)
    .toLowerCase()
    .replaceAll(" ", "-");

  const palette: Palette = colors.reduce(
    (acc: Palette, { color }, index) => {
      acc[(index + 1) * 100] = color;
      return acc;
    }, 
    {}
  );

  return [
    normalizedName,
    palette
  ];
}