"use client";

import { Deck } from "@/generated/prisma/client";
import { useGetDecks } from "@/hooks/useGetDecks";
import { ImageIcon } from "lucide-react";
import { parseAsString, useQueryState } from "nuqs";
import { toast } from "sonner";

const DeckCard = ({ deck }: { deck: Deck }) => {
  return (
    <div className="bg-card text-card-foreground border-border hover:bg-accent hover:text-accent-foreground flex w-full flex-col gap-1 rounded border p-2 shadow-xs hover:cursor-pointer">
      <div className="bg-muted border-border/50 mb-2 flex aspect-square w-full items-center justify-center rounded-sm border">
        <ImageIcon className="text-muted-foreground/80 size-16" />
      </div>
      <h3 className="font-semibold">{deck.name}</h3>
      <p className="text-muted-foreground line-clamp-3 text-xs">
        {deck.description || "No description"}
      </p>
    </div>
  );
};

const DeckList = () => {
  const [sort] = useQueryState("sort", parseAsString.withDefault("newest"));
  const [search] = useQueryState("search", parseAsString.withDefault(""));

  const { data, isLoading, isError } = useGetDecks({ sort, search });

  if (isLoading) {
    return <div className="flex flex-col gap-2 p-4">Loading decks...</div>;
  }

  if (data === undefined || isError) {
    toast.error("Failed to load decks");
    return <div className="flex flex-col gap-2 p-4">Error loading decks.</div>;
  }

  return (
    <div className="flex w-full flex-col gap-2 overflow-y-auto px-4 py-4">
      <div className="grid w-full grid-cols-2 gap-2 lg:grid-cols-4 xl:grid-cols-5">
        {data.map((deck) => (
          <DeckCard key={deck.id} deck={deck} />
        ))}
      </div>
    </div>
  );
};

export default DeckList;
