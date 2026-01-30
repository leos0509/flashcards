import { fetchDecks } from "@/apis/deckApi";
import { useQuery } from "@tanstack/react-query";

export function useGetDecks() {
  return useQuery({
    queryKey: ["decks"],
    queryFn: async () => {
      const res = await fetchDecks();
      return res.data;
    },
  });
}
