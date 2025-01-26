import React from "react";

export function Card({ children }) {
  return <div className="border rounded-md p-4 shadow-sm">{children}</div>;
}

export function CardHeader({ children }) {
  return <div className="mb-4">{children}</div>;
}

export function CardTitle({ children }) {
  return <h2 className="text-lg font-bold">{children}</h2>;
}

export function CardDescription({ children }) {
  return <p className="text-sm text-gray-600">{children}</p>;
}

export function CardContent({ children }) {
  return <div className="py-2">{children}</div>;
}

export function CardFooter({ children, className }) {
  return <div className={`pt-4 ${className}`}>{children}</div>;
}