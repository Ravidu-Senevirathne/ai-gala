"use client";

import { useState } from "react";

type GetDirectionsButtonProps = {
    lat: number;
    lng: number;
    className?: string;
};

export function GetDirectionsButton({ lat, lng, className }: GetDirectionsButtonProps) {
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
