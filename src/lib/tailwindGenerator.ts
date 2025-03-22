import { IApiColorPizza } from "@/app/interfaces/apiColorPizzaInterface";
import type { Palette } from "@/app/utils/palettes.ts";

const useOpen: boolean = true;
const COLOR_API_URL: string = useOpen
  ? process.env.API_COLOR_PIZZA ?? "https://api.color.pizza/v1/"
  : "http://localhost:3001/";


export async function tailwindGenerator(colors: { color: string; text: string }[]): Promise<[string, Palette ]> {
  const colorHex = colors[4]?.color.slice(1); // Quita el '#' de "#ffffff"

  if (!colorHex) {
    throw new Error("No hay suficiente cantidad de colores en la lista.");
  }

  const response = await fetch(`${COLOR_API_URL}?values=${colorHex}`);
  if (!response.ok) {
    throw new Error(`Error al obtener datos de color: ${response.statusText}`);
  }

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