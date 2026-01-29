CREATE TABLE "card" (
	"id" text PRIMARY KEY NOT NULL,
	"front" text NOT NULL,
	"back" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"created_by" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "deck" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"description" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"is_public" boolean DEFAULT false NOT NULL,
	"created_by" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "deck_card" (
	"deck_id" text NOT NULL,
	"card_id" text NOT NULL,
	"added_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "deck_card_deck_id_card_id_pk" PRIMARY KEY("deck_id","card_id")
);
--> statement-breakpoint
ALTER TABLE "card" ADD CONSTRAINT "card_created_by_user_id_fk" FOREIGN KEY ("created_by") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "deck" ADD CONSTRAINT "deck_created_by_user_id_fk" FOREIGN KEY ("created_by") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "deck_card" ADD CONSTRAINT "deck_card_deck_id_deck_id_fk" FOREIGN KEY ("deck_id") REFERENCES "public"."deck"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "deck_card" ADD CONSTRAINT "deck_card_card_id_card_id_fk" FOREIGN KEY ("card_id") REFERENCES "public"."card"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "card_createdBy_idx" ON "card" USING btree ("created_by");--> statement-breakpoint
CREATE INDEX "deck_createdBy_idx" ON "deck" USING btree ("created_by");--> statement-breakpoint
CREATE INDEX "deckCard_deckId_idx" ON "deck_card" USING btree ("deck_id");--> statement-breakpoint
CREATE INDEX "deckCard_cardId_idx" ON "deck_card" USING btree ("card_id");