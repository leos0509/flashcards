"use client"

import { Button } from "./ui/button";

const DeckActionGroup = () => {
  const handleCreateNewDeck = () => {
    // Logic to handle creating a new deck
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
