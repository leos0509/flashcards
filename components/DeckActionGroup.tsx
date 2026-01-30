"use client";

import { useCreateQuickDeck } from "@/hooks/useCreateDeck";
import { Button } from "./ui/button";

const DeckActionGroup = () => {
  const { mutate } = useCreateQuickDeck();

  const handleCreateNewDeck = () => {
    mutate();
  };

  return (
    <>
      <Button size="sm" onClick={handleCreateNewDeck}>
        Create New Deck
      </Button>
    </>
  );
};

export default DeckActionGroup;
