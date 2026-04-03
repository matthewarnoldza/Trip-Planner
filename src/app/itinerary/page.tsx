import ItineraryClient from "@/components/itinerary/ItineraryClient";
import Header from "@/components/ui/Header";

export const metadata = {
  title: "Detailed Itinerary | Karoo Road Trip",
  description:
    "Day-by-day detailed itinerary for the 13-day Karoo road trip — meals, activities, drives, and accommodation",
};

export default function ItineraryPage() {
  return (
    <>
      <Header mode="page" />
      <main className="pt-20 pb-16 px-4 sm:px-6 max-w-3xl mx-auto">
        <ItineraryClient />
      </main>
    </>
  );
}
