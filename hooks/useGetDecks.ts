import { fetchDecks, FetchDeckParams } from "@/apis/deckApi";
import { useQuery } from "@tanstack/react-query";

export function useGetDecks(params?: FetchDeckParams) {
  return useQuery({
    queryKey: ["decks", params],
    queryFn: async () => {
      const res = await fetchDecks(params);
      return res.data;
    },
  });
}
