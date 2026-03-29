import { TRIP_DATA } from "@/data/trip";
import ActivitiesClient from "@/components/activities/ActivitiesClient";
import Header from "@/components/ui/Header";

export const metadata = {
  title: "Daily Activities | Karoo Road Trip",
  description: "Plan daily activities for each stop on the Karoo road trip",
};

export default function ActivitiesPage() {
  return (
    <>
      <Header mode="page" />
      <main className="pt-20 pb-16 px-4 sm:px-6 max-w-3xl mx-auto">
        <ActivitiesClient trip={TRIP_DATA} />
      </main>
    </>
  );
}
