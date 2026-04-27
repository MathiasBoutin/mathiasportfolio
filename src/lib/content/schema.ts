import { z } from "zod";

export const caseStudySchema = z.object({
  title: z.string(),
  summary: z.string(),
  role: z.string(),
  timeline: z.string(),
  team: z.string(),
  tools: z.array(z.string()),
  coverImage: z.string(),
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
