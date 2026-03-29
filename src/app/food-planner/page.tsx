import { TRIP_DATA } from "@/data/trip";
import FoodPlannerClient from "@/components/food-planner/FoodPlannerClient";
import Header from "@/components/ui/Header";

export const metadata = {
  title: "Food Planner | Karoo Road Trip",
  description: "Plan meals and packing lists for the Karoo road trip",
};

export default function FoodPlannerPage() {
  return (
    <>
      <Header mode="page" />
      <main className="pt-20 pb-16 px-4 sm:px-6 max-w-3xl mx-auto">
        <FoodPlannerClient trip={TRIP_DATA} />
      </main>
    </>
  );
}
