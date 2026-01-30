import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";
import { NextRequest } from "next/server";
import z from "zod";

const createDeckSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
});

export async function POST(req: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
      });
    }

    const body = await req.json();

    const validation = createDeckSchema.safeParse(body);

    if (!validation.success) {
      return new Response(
        JSON.stringify({
          error: "Validation failed",
          details: validation.error.flatten().fieldErrors,
        }),
        {
          status: 400,
        },
      );
    }

    const createdDeck = await prisma.deck.create({
      data: {
        name: validation.data.name,
        description: validation.data.description,
        createdById: session.user.id,
      },
    });

    if (!createdDeck) {
      return new Response(JSON.stringify({ error: "Failed to create deck" }), {
        status: 500,
      });
    }

    return new Response(JSON.stringify(createdDeck), {
      status: 201,
    });
  } catch (error) {
    console.error("Error creating deck:", error);
    return new Response(JSON.stringify({ error: "Failed to create deck" }), {
      status: 500,
    });
  }
}

export async function GET() {
  try {
    // const {} = await params;
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
      });
    }

    const decks = await prisma.deck.findMany({
      where: {
        createdById: session.user.id,
      },
    });

    return new Response(JSON.stringify(decks), {
      status: 200,
    });
  } catch (error) {
    console.error("Error fetching decks:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch decks" }), {
      status: 500,
    });
  }
}
