export type MealType = "breakfast" | "lunch" | "dinner" | "snacks";
export type StorageCategory = "fridge" | "freezer" | "pantry" | "coolerBox";

export interface MealItem {
  id: string;
  name: string;
  checked: boolean;
}

export interface DayMeals {
  breakfast: MealItem[];
  lunch: MealItem[];
  dinner: MealItem[];
  snacks: MealItem[];
  notes: string;
}

export interface PackingItem {
  id: string;
  name: string;
  category: StorageCategory;
  checked: boolean;
}

export interface FoodPlan {
  days: Record<string, DayMeals>;
  packingList: PackingItem[];
  lastModified: string;
}

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
