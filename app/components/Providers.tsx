"use client";
import {HeroUIProvider} from "@heroui/system";
import {ReactNode} from "react";

export const Providers = ({children}: { children: ReactNode }) => {
    return (
        <HeroUIProvider>
            {children}
        </HeroUIProvider>
    );
};
