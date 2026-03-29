import { DayMeals, MealItem } from "@/types/planner";

function item(name: string): MealItem {
  return { id: crypto.randomUUID(), name, checked: false };
}

const travelDay: DayMeals = {
  breakfast: [item("Coffee thermos"), item("Rusks")],
  lunch: [item("Sandwiches"), item("Fruit")],
  dinner: [],
  snacks: [item("Biltong"), item("Dried fruit & nuts"), item("Water bottles")],
  notes: "",
};

const campsiteDay: DayMeals = {
  breakfast: [item("Eggs & bacon"), item("Toast"), item("Coffee")],
  lunch: [item("Sandwiches"), item("Crisps")],
  dinner: [item("Braai meat"), item("Braai salad"), item("Rolls")],
  snacks: [item("Marshmallows"), item("Biltong")],
  notes: "",
};

const bnbDay: DayMeals = {
  breakfast: [],
  lunch: [item("Lunch out / packed lunch")],
  dinner: [item("Dinner out / self-catering")],
  snacks: [item("Snacks"), item("Water bottles")],
  notes: "Breakfast may be included with accommodation",
};

const activityDay: DayMeals = {
  breakfast: [],
  lunch: [item("Packed lunch")],
  dinner: [],
  snacks: [item("Water bottles"), item("Energy bars")],
  notes: "Meals covered by accommodation stops",
};

export function getDefaultMeals(
  accommodationType: "travel" | "bnb" | "campsite" | "activity"
): DayMeals {
  // Deep clone to give each day unique IDs
  const template =
    accommodationType === "travel"
      ? travelDay
      : accommodationType === "campsite"
        ? campsiteDay
        : accommodationType === "activity"
          ? activityDay
          : bnbDay;

  return {
    breakfast: template.breakfast.map((i) => ({
      ...i,
      id: crypto.randomUUID(),
    })),
    lunch: template.lunch.map((i) => ({ ...i, id: crypto.randomUUID() })),
    dinner: template.dinner.map((i) => ({ ...i, id: crypto.randomUUID() })),
    snacks: template.snacks.map((i) => ({ ...i, id: crypto.randomUUID() })),
    notes: template.notes,
  };
}
