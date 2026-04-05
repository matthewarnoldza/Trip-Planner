"use client";

import { useEffect, useRef } from "react";
import {
  MapContainer,
  TileLayer,
  Polyline,
  Marker,
  Popup,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { TripData } from "@/types/trip";
import { routeSegments } from "@/data/route-geometry";

interface RouteMapProps {
  trip: TripData;
  activeStop?: number;
  onStopClick?: (stopId: number) => void;
}

function createStopIcon(stopNumber: number, isActive: boolean): L.DivIcon {
  return L.divIcon({
    html: `<div class="custom-marker ${isActive ? "active marker-pulse" : ""}">${stopNumber}</div>`,
    className: "",
    iconSize: [36, 36],
    iconAnchor: [18, 18],
    popupAnchor: [0, -20],
  });
}

function FitBounds({ trip }: { trip: TripData }) {
  const map = useMap();

  useEffect(() => {
    const bounds = L.latLngBounds(
      trip.stops.map((s) => [s.coordinates.lat, s.coordinates.lng])
    );
    map.fitBounds(bounds, { padding: [40, 40] });
  }, [map, trip.stops]);

  return null;
}

export default function RouteMap({
  trip,
  activeStop = -1,
  onStopClick,
}: RouteMapProps) {
  const mapRef = useRef<L.Map | null>(null);

  const center: [number, number] = [-30.5, 24.5];

  // Filter out start/end JHB duplicates for display purposes
  const displayStops = trip.stops.filter(
    (s) => s.accommodationType !== "travel"
  );

  return (
    <MapContainer
      center={center}
      zoom={6}
      scrollWheelZoom={false}
      className="w-full h-full rounded-2xl"
      ref={mapRef}
      zoomControl={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/">CARTO</a>'
        url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
      />

      <FitBounds trip={trip} />

      {/* Route polylines — full route shown from the start */}
      {routeSegments.map((segment, i) => (
        <Polyline
          key={i}
          positions={segment}
          pathOptions={{
            color: "#EA580C",
            weight: 3.5,
            opacity: 0.8,
            lineCap: "round",
            lineJoin: "round",
          }}
        />
      ))}

      {/* Stop markers */}
      {trip.stops.map((stop, index) => {
        const isActive = activeStop === stop.id;

        return (
          <Marker
            key={stop.id}
            position={[stop.coordinates.lat, stop.coordinates.lng]}
            icon={createStopIcon(index + 1, isActive)}
            eventHandlers={{
              click: () => onStopClick?.(stop.id),
            }}
          >
            <Popup>
              <div className="p-3 min-w-[200px]">
                <p className="text-xs text-karoo-600 font-semibold uppercase tracking-wide mb-1">
                  {stop.dates}
                </p>
                <h3 className="font-serif text-lg font-bold text-sand-800 mb-1">
                  {stop.name}
                </h3>
                <p className="text-sm text-sand-500">{stop.accommodation}</p>
                {stop.nights > 0 && (
                  <p className="text-xs text-sand-400 mt-1">
                    {stop.nights} {stop.nights === 1 ? "night" : "nights"}{" "}
                    &middot; {stop.accommodationType}
                  </p>
                )}
              </div>
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
}
