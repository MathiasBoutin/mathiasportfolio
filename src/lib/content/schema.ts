import { z } from "zod";

export const previewMediaSchema = z.object({
  type: z.enum(["image", "video"]),
  src: z.string(),
  alt: z.string(),
});

// ---------------------------------------------------------------------------
// Case study block types
// ---------------------------------------------------------------------------

const blockSpanSchema = z.enum(["full", "half"]);

export type BlockSpan = z.infer<typeof blockSpanSchema>;

const mediaItemSchema = z.object({
  type: z.enum(["image", "video", "svg"]),
  src: z.string(),
  alt: z.string(),
  caption: z.string().optional(),
});

export type MediaItem = z.infer<typeof mediaItemSchema>;

const textBlockSchema = z.object({
  type: z.literal("text"),
  span: blockSpanSchema,
  content: z.string(),
});

const bigTextBlockSchema = z.object({
  type: z.literal("bigText"),
  span: blockSpanSchema,
  text: z.string(),
});

const mediaBlockSchema = z.object({
  type: z.literal("media"),
  span: blockSpanSchema,
  media: mediaItemSchema,
});

export const caseStudyBlockSchema = z.discriminatedUnion("type", [
  textBlockSchema,
  bigTextBlockSchema,
  mediaBlockSchema,
]);

export type CaseStudyBlock = z.infer<typeof caseStudyBlockSchema>;

// ---------------------------------------------------------------------------
// Hero & meta stubs (rendering deferred)
// ---------------------------------------------------------------------------

export const caseStudyHeroSchema = z.object({
  type: z.enum(["media", "interactive"]),
  media: mediaItemSchema.optional(),
  component: z.string().optional(),
});

export type CaseStudyHero = z.infer<typeof caseStudyHeroSchema>;

export const caseStudyMetaSchema = z.object({
  entries: z.array(
    z.object({
      label: z.string(),
      value: z.string(),
    }),
  ),
});

export type CaseStudyMeta = z.infer<typeof caseStudyMetaSchema>;

// ---------------------------------------------------------------------------
// Case study frontmatter
// ---------------------------------------------------------------------------

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
  blocks: z.array(caseStudyBlockSchema).default([]),
  hero: caseStudyHeroSchema.optional(),
  meta: caseStudyMetaSchema.optional(),
});

export type CaseStudyFrontmatter = z.infer<typeof caseStudySchema>;

export const profileSchema = z.object({
  title: z.string(),
  summary: z.string().optional(),
  updatedAt: z.string().optional(),
});

export type ProfileFrontmatter = z.infer<typeof profileSchema>;
