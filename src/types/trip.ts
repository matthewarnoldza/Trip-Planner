export interface Coordinates {
  lat: number;
  lng: number;
}

export interface DriveInfo {
  distanceKm: number;
  durationHours: number;
  description: string;
}

export interface Activity {
  name: string;
  description: string;
  icon: string;
}

export interface Stop {
  id: number;
  slug: string;
  name: string;
  accommodation: string;
  accommodationType: "travel" | "bnb" | "campsite";
  coordinates: Coordinates;
  dates: string;
  nights: number;
  description: string;
  landscapeDescription: string;
  activities: Activity[];
  features: string[];
  bookingSource: string;
  bookingUrl?: string;
  imageUrl: string;
  driveFromPrevious: DriveInfo;
}

export interface TripData {
  title: string;
  subtitle: string;
  tagline: string;
  month: string;
  year: number;
  startDate: string;
  endDate: string;
  totalDistanceKm: number;
  totalDays: number;
  totalStops: number;
  stops: Stop[];
}
