"use client";
import { SearchIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Field, FieldLabel } from "./ui/field";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { parseAsString, useQueryState } from "nuqs";

const DeckFilter = () => {
  const [sort, setSort] = useQueryState(
    "sort",
    parseAsString.withDefault("newest"),
  );
  const [search, setSearch] = useQueryState(
    "search",
    parseAsString.withDefault(""),
  );

  return (
    <div className="mt-2 mb-1 flex items-start justify-between gap-4 px-4 py-2">
      <div className="flex gap-2">
        <Field className="gap-1">
          <FieldLabel
            htmlFor="deck-filter-select"
            className="text-muted-foreground text-xs"
          >
            Sort by
          </FieldLabel>
          <Select defaultValue={sort} onValueChange={setSort}>
            <SelectTrigger
              size="sm"
              className="h-8 min-w-40"
              id="deck-filter-select"
            >
              <SelectValue placeholder="Sort options" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Sort by</SelectLabel>
                <SelectItem value="name">Name A-Z</SelectItem>
                <SelectItem value="name-reverse">Name Z-A</SelectItem>
                <SelectItem value="newest">Newest</SelectItem>
                <SelectItem value="oldest">Oldest</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </Field>
      </div>
      <Field className="w-48 gap-1 lg:w-64">
        <FieldLabel
          htmlFor="deck-filter-search"
          className="text-muted-foreground text-xs"
        >
          Search
        </FieldLabel>
        <div className="flex w-full gap-1">
          <Input
            id="deck-filter-search"
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-8"
            placeholder="Search ..."
          />
          <Button size="icon-sm">
            <SearchIcon className="size-4" />
          </Button>
        </div>
      </Field>
    </div>
  );
};

export default DeckFilter;
