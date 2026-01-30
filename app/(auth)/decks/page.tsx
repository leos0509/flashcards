import { fetchDecks } from "@/apis/deckApi";
import DeckActionGroup from "@/components/DeckActionGroup";
import DeckFilter from "@/components/DeckFilter";
import DeckList from "@/components/DeckList";
import PageHeader from "@/components/PageHeader";
import { Separator } from "@/components/ui/separator";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

export default async function DecksPage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["decks"],
    queryFn: fetchDecks,
  });

  return (
    <div className="page-sizing page-spacing overflow-hidden">
      <div className="bg-card border-border flex h-full min-h-16 w-full flex-col rounded-xl border shadow-sm">
        <PageHeader
          title="Decks"
          description="Manage your flashcard decks here."
          headerActions={<DeckActionGroup />}
          className="items-center"
        />
        <Separator orientation="horizontal" />
        <DeckFilter />
        <HydrationBoundary state={dehydrate(queryClient)}>
          <DeckList />
        </HydrationBoundary>
      </div>
    </div>
  );
}
