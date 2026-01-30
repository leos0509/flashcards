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

export async function fetchDecks(): Promise<AxiosResponse<Deck[]>> {
  const res = await axios.get("/decks");
  return res;
}
