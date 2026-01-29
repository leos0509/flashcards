import { cn } from "@/lib/utils";
import React from "react";

type Props = {
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  headerActions?: React.ReactNode;
  className?: string;
};

const PageHeader = ({
  title,
  description,
  headerActions,
  className,
}: Props) => {
  return (
    <div
      className={cn("flex w-full items-start justify-between p-4", className)}
    >
      <div className="flex flex-col gap-1">
        {title && (
          <h1 className="text-3xl leading-tight font-semibold">{title}</h1>
        )}
        {description && (
          <div className="text-muted-foreground text-sm">{description}</div>
        )}
      </div>
      <div>{headerActions}</div>
    </div>
  );
};

export default PageHeader;
