import DeckActionGroup from "@/components/DeckActionGroup";
import PageHeader from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default function DecksPage() {
  return (
    <div className="page-sizing page-spacing">
      <div className="bg-card border-border h-full min-h-16 w-full rounded-xl border shadow-sm">
        <PageHeader
          title="Decks"
          description="Manage your flashcard decks here."
          headerActions={<DeckActionGroup />}
          className="items-center"
        />
        <Separator orientation="horizontal" />
      </div>
    </div>
  );
}
