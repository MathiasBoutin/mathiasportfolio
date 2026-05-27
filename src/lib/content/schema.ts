import { z } from "zod";

export const previewMediaSchema = z.object({
  type: z.enum(["image", "video"]),
  src: z.string(),
  alt: z.string(),
});

// ---------------------------------------------------------------------------
// Case study block types
// ---------------------------------------------------------------------------

const mediaWidthSchema = z.enum(["same", "wider", "full"]);

export type MediaWidth = z.infer<typeof mediaWidthSchema>;

const mediaItemSchema = z.object({
  type: z.enum(["image", "video", "svg"]),
  src: z.string(),
  alt: z.string(),
  caption: z.string().optional(),
});

export type MediaItem = z.infer<typeof mediaItemSchema>;

const textBlockSchema = z.object({
  type: z.literal("text"),
  content: z.string(),
});

const bigTextBlockSchema = z.object({
  type: z.literal("bigText"),
  text: z.string(),
});

const mediaBlockSchema = z.object({
  type: z.literal("media"),
  width: mediaWidthSchema.default("same"),
  media: mediaItemSchema,
});

const desktopMockBlockSchema = z.object({
  type: z.literal("desktopMock"),
  src: z.string().optional(),
  alt: z.string().default(""),
  caption: z.string().optional(),
  width: z.number().optional(),
  height: z.number().optional(),
  variant: z.enum(["full", "content"]).default("full"),
});

const desktopMockGalleryItemSchema = z.object({
  src: z.string(),
  alt: z.string().default(""),
});

const desktopMockGalleryBlockSchema = z.object({
  type: z.literal("desktopMockGallery"),
  images: z.array(desktopMockGalleryItemSchema).min(2),
});

const growthBarRowSchema = z.object({
  label: z.string(),
  value: z.number(),
  displayValue: z.string().optional(),
});

const growthBarBlockSchema = z.object({
  type: z.literal("growthBar"),
  rows: z.array(growthBarRowSchema).min(2),
  metricLabel: z.string(),
});

export type DesktopMockBlock = z.infer<typeof desktopMockBlockSchema>;
export type DesktopMockGalleryBlock = z.infer<typeof desktopMockGalleryBlockSchema>;
export type GrowthBarBlock = z.infer<typeof growthBarBlockSchema>;

export const caseStudyBlockSchema = z.discriminatedUnion("type", [
  textBlockSchema,
  bigTextBlockSchema,
  mediaBlockSchema,
  desktopMockBlockSchema,
  desktopMockGalleryBlockSchema,
  growthBarBlockSchema,
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
// Inline definition glossary (case study text blocks)
// ---------------------------------------------------------------------------

export const inlineDefinitionSchema = z.object({
  term: z.string(),
  definition: z.string(),
  title: z.string().optional(),
  theme: z.enum(["default", "shopify", "patch"]).optional(),
  pronunciation: z.string().optional(),
  learnMoreHref: z.string().optional(),
});

export type InlineDefinition = z.infer<typeof inlineDefinitionSchema>;

// ---------------------------------------------------------------------------
// Case study frontmatter
// ---------------------------------------------------------------------------

export const caseStudySchema = z.object({
  title: z.string(),
  summary: z.string(),
  company: z.string(),
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
  definitions: z.record(z.string(), inlineDefinitionSchema).optional(),
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
