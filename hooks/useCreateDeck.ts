import { createDeck, CreateDeckPayload } from "@/apis/deckApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useCreateQuickDeck() {
  const queryClient = useQueryClient();
  const newDeck: CreateDeckPayload = {
    name: "New Deck",
  };

  return useMutation({
    mutationFn: async () => {
      const res = await createDeck(newDeck);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["decks"] });
    },
  });
}
