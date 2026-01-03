"use client";

import Box from "../../atoms/Box";
import Typography from "../../atoms/Typography";
import { useState } from "react";
import type { AccordionProps } from "./types";

const Accordion = ({ data = [], allowMultiple = false, className }: AccordionProps) => {
  const [openItems, setOpenItems] = useState<Set<string>>(
    new Set(data.filter((item) => item.defaultOpen).map((item) => item.id)),
  );

  const handleToggle = (itemId: string) => {
    if (allowMultiple) {
      setOpenItems((prev) => {
        const newSet = new Set(prev);
        if (newSet.has(itemId)) {
          newSet.delete(itemId);
        } else {
          newSet.add(itemId);
        }
        return newSet;
      });
    } else {
      setOpenItems((prev) =>
        prev.has(itemId) ? new Set() : new Set([itemId]),
      );
    }
  };

  return (
    <Box className={className}>
      {data.map((item) => (
        <Box
          key={item.id}
          variant="details"
          open={openItems.has(item.id)}
          mb="mb-2"
          className="accordion-item overflow-hidden rounded-lg border border-gray-200"
        >
          <Box
            variant="summary"
            display="flex"
            className="cursor-pointer list-none bg-gray-50 px-6 py-4 font-medium text-gray-800 transition-colors duration-200 hover:bg-gray-100"
            justify="justify-between"
            items="items-center"
            onClick={(e) => {
              e.preventDefault();
              handleToggle(item.id);
            }}
          >
            <Typography>{item.title}</Typography>
            <span
              className={`transform transition-transform duration-200 ${
                openItems.has(item.id) ? "rotate-180" : ""
              }`}
            >
              ▼
            </span>
          </Box>
          <Box
            px="px-6"
            py="py-4"
            className={`transition-all duration-300 ${
              openItems.has(item.id)
                ? "max-h-none opacity-100"
                : "max-h-0 overflow-hidden py-0 opacity-0"
            }`}
          >
            {item.content}
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default Accordion;
