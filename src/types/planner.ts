export interface PlannedActivity {
  id: string;
  name: string;
  description: string;
  icon: string;
  source: "suggested" | "custom";
  selected: boolean;
}

export interface DayPlan {
  stopSlug: string;
  stopName: string;
  date: string;
  activities: PlannedActivity[];
  notes: string;
}

export interface ActivityPlan {
  days: DayPlan[];
  lastModified: string;
}
