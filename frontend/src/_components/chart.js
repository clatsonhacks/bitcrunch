import React from "react";

export function ChartContainer({ children }) {
  return <div className="w-full overflow-hidden">{children}</div>;
}

export function ChartTooltip({ content }) {
  return <>{content}</>;
}

export function ChartTooltipContent({ hideLabel }) {
  return <div className="bg-white p-2 shadow-md">{hideLabel ? null : "Tooltip"}</div>;
}