"use client";

import dynamic from "next/dynamic";
import { TripData } from "@/types/trip";

const RouteMap = dynamic(() => import("./RouteMap"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-sand-100 animate-pulse rounded-2xl flex items-center justify-center">
      <div className="text-center">
        <div className="inline-block w-10 h-10 border-4 border-karoo-200 border-t-karoo-500 rounded-full animate-spin mb-3" />
        <p className="text-sand-400 text-sm">Loading map...</p>
      </div>
    </div>
  ),
});

interface MapWrapperProps {
  trip: TripData;
  activeStop?: number;
  onStopClick?: (stopId: number) => void;
}

export default function MapWrapper({
  trip,
  activeStop,
  onStopClick,
}: MapWrapperProps) {
  return (
    <RouteMap trip={trip} activeStop={activeStop} onStopClick={onStopClick} />
  );
}
