import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const Pagination = ({ className, ...props }: React.ComponentProps<"nav">) => (
  <nav
    role="navigation"
    aria-label="pagination"
    className={cn("flex w-full justify-center", className)}
    {...props}
  />
);

const PaginationContent = React.forwardRef<HTMLUListElement, React.ComponentProps<"ul">>(
  ({ className, ...props }, ref) => (
    <ul
      ref={ref}
      className={cn("flex flex-row items-center gap-2", className)}
      {...props}
    />
  )
);
PaginationContent.displayName = "PaginationContent";

const PaginationItem = React.forwardRef<HTMLLIElement, React.ComponentProps<"li">>(
  ({ className, ...props }, ref) => (
    <li ref={ref} className={cn("", className)} {...props} />
  )
);
PaginationItem.displayName = "PaginationItem";

type PaginationLinkProps = {
  isActive?: boolean;
} & React.ComponentProps<typeof Link>;

const PaginationLink = ({ className, isActive, ...props }: PaginationLinkProps) => (
  <Link
    aria-current={isActive ? "page" : undefined}
    className={cn(
  "inline-flex h-8 w-8 items-center justify-center rounded-md border text-xs font-semibold transition",
      isActive
        ? "border-[#EE4312] bg-[#EE4312] text-white"
        : "border-primary/10 text-primary hover:border-primary/30",
      className
    )}
    {...props}
  />
);

const PaginationButton = ({
  className,
  isActive,
  ...props
}: React.ComponentProps<"button"> & { isActive?: boolean }) => (
  <button
    type="button"
    aria-current={isActive ? "page" : undefined}
    className={cn(
  "inline-flex h-8 w-8 items-center justify-center rounded-md border text-xs font-semibold transition cursor-pointer",
      isActive
        ? "border-[#EE4312] bg-[#EE4312] text-white"
        : "border-primary/10 text-primary hover:border-primary/30",
      className
    )}
    {...props}
  />
);

export { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationButton };
