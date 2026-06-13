"use client";

import { useState } from "react";

type GetDirectionsButtonProps = {
    lat: number;
    lng: number;
    className?: string;
    iconOnly?: boolean;
};

function NavigationIcon() {
    return (
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <polygon points="3 11 22 2 13 21 11 13 3 11" />
        </svg>
    );
}

export function GetDirectionsButton({ lat, lng, className, iconOnly }: GetDirectionsButtonProps) {
    const [isLocating, setIsLocating] = useState(false);

    function openDirections() {
        const destination = `${lat},${lng}`;

        if (!navigator.geolocation) {
            window.open(`https://www.google.com/maps/dir/?api=1&destination=${destination}`, "_blank", "noopener,noreferrer");
            return;
        }

        setIsLocating(true);
        navigator.geolocation.getCurrentPosition(
            (position) => {
                setIsLocating(false);
                const origin = `${position.coords.latitude},${position.coords.longitude}`;
                window.open(
                    `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}`,
                    "_blank",
                    "noopener,noreferrer",
                );
            },
            () => {
                setIsLocating(false);
                window.open(`https://www.google.com/maps/dir/?api=1&destination=${destination}`, "_blank", "noopener,noreferrer");
            },
        );
    }

    if (iconOnly) {
        return (
            <button
                type="button"
                onClick={openDirections}
                disabled={isLocating}
                title="Get directions"
                aria-label="Get directions"
                className={
                    className ??
                    "inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/70 transition duration-300 hover:scale-110 hover:border-[#FF6500]/40 hover:bg-[#FF6500]/10 hover:text-[#FFB27A] disabled:cursor-not-allowed disabled:opacity-60"
                }
            >
                {isLocating ? (
                    <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-current border-t-transparent" />
                ) : (
                    <NavigationIcon />
                )}
            </button>
        );
    }

    return (
        <button
            type="button"
            onClick={openDirections}
            disabled={isLocating}
            className={
                className ??
                "inline-flex items-center justify-center rounded-full border border-[#FF6500]/40 bg-[#FF6500]/10 px-4 py-2 text-xs font-medium text-[#FFB27A] transition duration-300 hover:scale-105 hover:bg-[#FF6500]/20 disabled:cursor-not-allowed disabled:opacity-60"
            }
        >
            {isLocating ? "Locating..." : "Get Directions"}
        </button>
    );
}
