'use client';

import { useDeferredValue, useEffect, useState } from "react";
import { HexadecimalContext, IValuesProvider } from "./hexadecimal.context";
import { getRandomColor } from "@/app/utils/getRandomColor";
import { ValidateHexadecimal } from "@/app/utils/hexadecimal-validator";
import { debounce } from "@/app/utils/debounce";

interface IHexadecimalProviderProps {
    children: React.ReactNode
}

class ProviderHandlers {
    public verifyColorEntered(callback: (hex:string) => void){
        const search = window.location.search;
        let queryString = new URLSearchParams(search).get("color");
    
        if (!queryString) queryString = getRandomColor();
        
        if (ValidateHexadecimal(queryString)) callback(queryString);
    }
}

const providerHandler: ProviderHandlers = new ProviderHandlers();

function HexadecimalProvider({ children }: IHexadecimalProviderProps) {
    const [ hexColor, setHexColor ] = useState<string>("");

    const deferredColor = useDeferredValue(hexColor);

    useEffect(() => {
        providerHandler.verifyColorEntered(setHexColor);
    },[]);
    
    const values: IValuesProvider = {
        hexColor: deferredColor,
        rgbColor: "",
        setHexColor: (hex:string, useDebounce?: boolean) => {
            return useDebounce ? 
            debounce({ callback: () => setHexColor(hex) }) :
            setHexColor(hex);
        }
    };

    return (
        <HexadecimalContext.Provider value={values}>
            {children}
        </HexadecimalContext.Provider>
    );
}

export default HexadecimalProvider;