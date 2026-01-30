import { Deck } from "@/generated/prisma/client";
import axios from "../lib/axios-client";
import { AxiosResponse } from "axios";

export type CreateDeckPayload = {
  name: string;
  description?: string;
};

export async function createDeck(
  newDeck: CreateDeckPayload,
): Promise<AxiosResponse<Deck>> {
  const res = await axios.post("/decks", newDeck);
  return res;
}

export type FetchDeckParams = {
  sort?: string;
  search?: string;
};

export async function fetchDecks(
  params?: FetchDeckParams,
): Promise<AxiosResponse<Deck[]>> {
  const res = await axios.get("/decks", {
    params,
  });
  return res;
}
