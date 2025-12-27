"use client";

import * as React from "react";
import { DayPicker } from "react-day-picker";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3", className)}
      classNames={{
        months: "flex flex-col space-y-4",
        month: "space-y-4",
        caption: "flex justify-between items-center",
        caption_label: "text-sm font-medium text-primary",
        nav: "flex items-center gap-2",
        nav_button:
          "h-7 w-7 bg-transparent p-0 text-primary hover:bg-primary/5 rounded-md",
        nav_button_previous: "",
        nav_button_next: "",
        table: "w-full border-collapse space-y-1",
        head_row: "flex",
        head_cell: "w-9 text-[0.65rem] font-medium text-muted-foreground",
        row: "mt-2 flex w-full",
        cell: "relative h-9 w-9 text-center text-sm text-primary",
        day: "h-9 w-9 rounded-md p-0 font-normal hover:bg-primary/5",
        day_selected: "bg-[#EE4312] text-white hover:bg-[#cf3a10]",
        day_today: "border border-[#EE4312]/50",
        day_outside: "text-muted-foreground opacity-50",
        day_disabled: "text-muted-foreground opacity-50",
        ...classNames,
      }}
      components={{
        IconLeft: () => <ChevronLeft className="h-4 w-4" />,
        IconRight: () => <ChevronRight className="h-4 w-4" />,
      }}
      {...props}
    />
  );
}

export { Calendar };
