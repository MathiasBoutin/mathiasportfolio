import type { DefinitionPopoverTheme } from "@/components/ui/definition-popover";

export const definitionPopoverThemes: Record<"shopify" | "patch", DefinitionPopoverTheme> = {
  shopify: {
    trigger:
      "hover:bg-[#1B3B36] hover:text-[#6BFF91] data-[popup-open]:bg-[#1B3B36] data-[popup-open]:text-[#6BFF91]",
    popup: "bg-[#1B3B36] text-[#6BFF91]",
    title: "text-[#6BFF91]",
    pronunciation: "text-[#6BFF91]",
    description: "text-[#6BFF91]",
    link: "bg-[#6BFF91] text-[#1B3B36] hover:bg-[#6BFF91] hover:text-[#1B3B36]",
  },
  patch: {
    trigger:
      "hover:bg-[#2B261C] hover:text-[#F48C60] data-[popup-open]:bg-[#2B261C] data-[popup-open]:text-[#F48C60]",
    popup: "bg-[#2B261C] text-[#F48C60]",
    title: "text-[#F48C60]",
    pronunciation: "text-[#F48C60]",
    description: "text-[#F48C60]",
    link: "bg-[#F48C60] text-[#2B261C] hover:bg-[#F48C60] hover:text-[#2B261C]",
  },
};
