import { z } from "zod";

export const previewMediaSchema = z.object({
  type: z.enum(["image", "video"]),
  src: z.string(),
  alt: z.string(),
});

export const caseStudySchema = z.object({
  title: z.string(),
  summary: z.string(),
  role: z.string(),
  timeline: z.string(),
  team: z.string(),
  tools: z.array(z.string()),
  topics: z.array(z.string()),
  coverImage: z.string(),
  previewMedia: previewMediaSchema,
  featured: z.boolean().default(false),
  problem: z.string(),
  outcome: z.string(),
  order: z.number().int(),
});

export type CaseStudyFrontmatter = z.infer<typeof caseStudySchema>;

export const profileSchema = z.object({
  title: z.string(),
  summary: z.string().optional(),
  updatedAt: z.string().optional(),
});

export type ProfileFrontmatter = z.infer<typeof profileSchema>;
