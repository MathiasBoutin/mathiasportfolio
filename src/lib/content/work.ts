import { cache } from "react";
import {
  type CaseStudyBlock,
  type CaseStudyFrontmatter,
  type InlineDefinition,
} from "@/lib/content/schema";
import { DEFAULT_LOCALE, type Locale } from "@/lib/i18n/config";

type CaseStudyEntry = {
  slug: string;
  data: CaseStudyFrontmatter;
};

export type OtherWorkEntry = {
  slug: string;
  name: string;
  summary: string;
  timeframe: string;
  company: string;
  content: string;
  images: { src: string; alt: string }[];
  href: string;
  order: number;
};

// ---------------------------------------------------------------------------
// Block definitions per case study, per locale
// ---------------------------------------------------------------------------

const patchSourcingDefinitions: Record<string, InlineDefinition> = {
  ICROA: {
    term: "ICROA",
    definition:
      "International Carbon Reduction and Offset Alliance, the standards body whose endorsement defines registry credibility",
  },
  registry: {
    term: "Registry",
    definition:
      "In the VCM context, the organizations that certify and track carbon credits (Verra, Gold Standard, Puro, etc.). Not a generic database",
  },
  VCM: {
    term: "VCM",
    definition: "Voluntary carbon market",
  },
  "I built a mock": {
    term: "I built a mock",
    title: "The aligning power of design",
    theme: "default",
    definition:
      "I reach for mocks or prototypes early if the timeline is tight, before I consider them truly \"earned,\" because they turn a vague challenge or disagreement into something real. It's much easier to align people around ideas and concepts they can see and react to than something they have to imagine. Stronger alignment, more rapidly. The risk is that a mock can also paint you into a corner: people anchor on it. So I try to be explicit that an early mock is a question, not a proposal.",
  },
  "j'ai construit une maquette": {
    term: "j'ai construit une maquette",
    title: "Le pouvoir d'alignement du design",
    theme: "default",
    definition:
      "J'utilise des maquettes ou prototypes tôt si le calendrier est serré, avant de les considérer vraiment « mérités », parce qu'ils transforment un défi vague ou un désaccord en quelque chose de concret. C'est beaucoup plus facile d'aligner les gens autour d'idées qu'ils peuvent voir et auxquelles ils peuvent réagir plutôt que quelque chose qu'ils doivent imaginer. Un alignement plus fort, plus rapidement. Le risque est qu'une maquette peut aussi vous enfermer — les gens s'y ancrent. Alors j'essaie d'être explicite : une maquette précoce est une question, pas une proposition.",
  },
};

const patchSourcingBlocks: Record<Locale, CaseStudyBlock[]> = {
  en: [
    {
      type: "growthBar",
      metricLabel: "Project growth",
      metrics: [
        "12,400% growth in projects",
        "30-80 data points per project",
      ],
      rows: [
        { label: "before", value: 200, displayValue: "~200" },
        { label: "after", value: 25000, displayValue: "25,000+" },
      ],
    },
    {
      type: "text",
      content: `## About Patch and the product

Patch's core value is data and expertise, delivered to customers through a product that helps buyers and sellers of carbon credits work through the complexity of environmental commodities markets. It needs to serve two primary sets of users:

- Experts, who build procurement programs from strategy to tracking, run diligence and quality assessment, and source inventory.
- Buyers, who move through procurement stages and rely on expert recommendations and data inside the platform.

That makes Patch's product a two sided pane of glass where experts and credit buyers meet to procure environmental commodities. The process is dense and data heavy. It often involves buyers who do not yet have deep climate expertise, in a market that is relatively new and constantly evolving, and that is balancing the environmental moment with a tough integrity battle. That two sided pane of glass idea shows up directly in the structure of the product: experts and buyers work in the same sourcing surface, but see different levels of detail depending on their role and where they are in the deal.`,
    },
    {
      type: "text",
      content: `## Frame: why we had to change

One key space in the product is the sourcing platform, the main surface where users explore available inventory and projects. It is where experts assemble recommendations and where buyers see and react to them.

By late 2025, as Patch moved upmarket into mature enterprise customers, we expanded data availability from a curated set of roughly 200 to 350 projects to around 25,000 projects covering the major registries. We got there gradually over the year as we integrated additional registries and partners, but the result was a step change in scale from a curated catalog to a market level view.

From a market perspective, this was necessary. Enterprise buyers were not satisfied with a vendor curated set. A carbon purchase is often a multi year, multi million dollar commitment, and buyers have to defend it internally. "Here is everything we considered" lands very differently than "here is what a vendor showed us."

From a design perspective, the original brief came in as a medium scope front end project to improve browsability. We now had over a hundred times more data, so the ask was more filters, better sorting, and stronger search. On paper, that sounded reasonable. I was fairly sure it did not address the real problem.`,
    },
    {
      type: "desktopMock",
      variant: "full",
      src: "/images/work/patch-sourcing-portfolio-details.png",
      alt: "Patch sourcing marketplace showing expert-built portfolios and a browsable project catalog",
      caption:
        "Can we add filters & rework the UI to make the platform support 25,000 projects please?",
    },
    {
      type: "text",
      content: `## Reframing the problem

The first hint was inside the company. Our climate experts had quietly stopped using the product and moved their real work into Excel. The spreadsheet, not the app, had become the place where inventory lived and where sourcing and diligence work actually happened.

They were not leaving because the interface looked dated. They were leaving because the data underneath could not support real diligence, and a spreadsheet they controlled could. As we moved upmarket, that stopped being an internal quirk and started to look like a preview. Enterprise buyers bring their own climate experts. They were about to hit the same wall.`,
    },
    {
      type: "desktopMock",
      variant: "content",
      src: "/images/work/patch-sourcing-inventory-spreadsheet.png",
      alt: "Patch current inventory spreadsheet used as the de facto source of truth for carbon credit projects",
    },
    {
      type: "text",
      content: `Those 25,000 projects came from many different registries and third party partners, each describing things in their own way. The same technology might be labeled several different ways. The same fact might be reported in different formats, or not reported at all. We had many raw signals, but not all of them were actionable on their own. In many cases we could not reliably tell if a project was still issuing credits, whether we could actually source it, or what it might cost. A better UI on top of that would just help people browse an unreliable market faster.

My other challenge was that an internal signal is easy to downplay. We had been punting on a proper fix for our teams for a while but never got to it. The rationale was always that our experts are power users, buyers are different, and maybe buyers would not care as much. Before we spent engineering time on that assumption, I designed an early version of the new sourcing platform in Figma Make, using realistically structured mock data that reflected the real registry inputs and inconsistencies.

Figma Make and the wonders of truly interactive prototypes, at a fraction of the cost, were a huge unlock for Patch, given how often we had to design for real, messy data use cases. A static mock cannot expose a data problem because it does not have to live with the data. It is too easy to ignore the gaps, either willingly or because you do not yet have a sense of what real data will expose. A functioning prototype, even a scrappy one, lets you see how people behave when they are faced with actual structure and constraints. As was typical at Patch, we brought these prototypes into live customer calls with our sales team and watched buyers try to use them.
`,
    },
    {
      type: "desktopMock",
      variant: "content",
      src: "/images/work/uxr-screenshot.png",
      alt: "Customer research screenshot from a Patch sourcing prototype feedback session",
      caption:
        "At Patch, we ran user research in a scrappy way that fit our very small, time-strapped EPD team. Instead of taking every comment at face value, we watched for patterns and used our internal context to interpret what we heard. We did not always nail it, but we were learning constantly.",
    },
    {
      type: "text",
      content: `The failure modes showed up immediately. Buyers could not tell why one project ranked above another. They could not find the facts they cared about at the right time in their process. They did not fully trust what they were seeing. It mirrored what we had already seen internally: the same issues that pushed our experts into Excel were landing on the people this brief was supposed to serve.

The prototype was there to make the cost of the wrong plan visible to the people making roadmap decisions. We had one or two engineers available. Fixing the data meant delaying the visible UI work everyone thought they were getting, so the argument had to be concrete enough to change minds. I used those sessions to align our PM, engineering lead, and commercial leadership on pausing the UI work and investing first in the data model.

We decided to increase the scope to shape the data and the UI at the same time, delivering the data expansion the business needed while making sure it would solve customer problems.`,
    },
    {
      type: "text",
      content: `## The challenge: a system, not a single screen

There was also straightforward design complexity. We were now asking people to navigate a dataset of about 25,000 rows, each with 30 to 80 dimensions of different types. The interface had to support different phases of procurement, such as:

- Early specification, when buyers define what they want to procure.
- Diligence, when experts and buyers assess the risk profile of projects against criteria and risk appetite.
- Sourcing and negotiation, when availability, contracting requirements, and other commercial details matter more.

Experts and buyers care about different pieces of information at different phases. That created information architecture challenges: what to surface, what to nest, how dense the interface should be, and how to aggregate data into elements that feel actionable instead of overwhelming.
`,
    },
    {
      type: "desktopMock",
      variant: "full",
      src: "/images/work/project-details-page.png",
      alt: "Patch project details page showing grouped carbon project data for buyers and experts",
      caption:
        "Project-level data is deep in Patch, stretching from basic metadata to expansive expert due diligence and AI-driven quality assessments.",
    },
    {
      type: "text",
      content: `We also needed the surface to scale. As we acquired more data and learned which dimensions people actually used, the UI had to be flexible enough to absorb new fields and composite signals without a full redesign every time. I wanted engineers to be able to clean and extend the data model, and in many cases adjust what showed up, without needing to pull design back into every small change.

At the UI level, that meant being deliberate about how information was grouped and weighted. Fields that answered the same user question needed to live together. Within each group, we spent time on hierarchy and visual cues so important signals were easy to scan, and secondary details stayed readable but did not compete for attention. The goal was that, over time, as people worked in the platform, these patterns would become recognizable and the surface would feel learned rather than new on every deal, even as we added more data.

To move quickly, I relied on scrappy, interactive prototyping in Figma Make, again with realistic data. Prototyping this way is especially useful for data projects. Stakeholders and customers can click through live, browsable lists instead of trying to imagine behavior from static screens. In internal reviews, getting product, engineering, design, and commercial stakeholders to look at the same prototype made alignment, and misalignment, much more obvious than abstract conversations would. I intentionally hit prototypes early to expose those gaps while it was still cheap to course correct.

Once the Figma Make prototypes had done their job, I turned them into real specs. Being able to rely on design intuition and experience in that part was key. There are many ways I could have diverged on the UI and UX treatment for this interface, but the business reality meant we had to move quickly. Strong design system work we had done beforehand paid off massively here, and identifying which pieces required new UI was the balance we needed to strike to meet our objectives while keeping to our timelines.`,
    },
    {
      type: "text",
      content: `## Shaping the data model

Those prototypes also made our product gaps obvious, especially around the shape and usefulness of the data.

We were aggregating raw fields from registries and partners. Combined, they contained a lot of noise. Transparency and clarity are separate challenges. Good architecture is as much about what you withhold as what you surface, and how.

One gap we identified was around the sourcability of any given project. We had separate signals like issuing periods, issuance amounts and dates, supplier and developer contacts, retirement details, and registration status. On their own, these data points did not answer a buyer's core question: "Can I actually buy this, and how soon."

Early prototypes exposed this. When we surfaced all the raw fields, customers either got stuck or pulled the data out to reason about it offline. We worked with engineering and our climate experts to shape those inputs into a simple sourcing indicator. That signal combined the underlying data to represent how likely it was that a given project was actually sourcable and purchasable.
`,
    },
    {
      type: "desktopMock",
      variant: "content",
      src: "/images/work/Sourcing status.png",
      alt: "Patch sourcing status indicator showing consolidated availability and sourcing signals",
    },
    {
      type: "text",
      content: `Design's value here was in making the gaps intensely clear, then channeling what we heard from customers into concrete data requirements. Data is only as useful as it is actionable. By grounding the model in the decision buyers were trying to make, we helped the team prioritize which fields to standardize, which composite signals to create, and which raw data to keep one level down.

We sequenced the work accordingly. Design first shaped the model from the consumption side: what experts and buyers needed to see, in what combinations, to make real decisions. Engineering then layered in constraints and built indexing and infrastructure suited to this scale.

AI supported the process, but not as a shiny feature and not as a black box. Reconciling inconsistent labels and categories across tens of thousands of projects would have eaten the entire timeline for a one to two engineer team. AI made that reconciliation feasible. For example, we used AI to cluster and normalize technology labels across registries, while routing edge cases like novel methodologies or mixed category projects to our climate experts. Because we understood the industry context, we could mark areas where calling two things "the same" was actually a hard climate question rather than a pattern matching task. AI handled the volume and experts handled the truly judgment heavy decisions.`,
    },
    {
      type: "text",
      content: `## Contextualizing: making relevance obvious

Once the data was usable and consistent, we still had a second problem. Buyers did not care about all dimensions equally. They cared about different combinations of fields depending on their goals and constraints.

For example, some buyers cared deeply about availability timelines. Others focused on technology type, location, or third party ratings. Many operated under the requirements of specific climate certifications, each with its own rules. Some wanted projects co located with their supply chain, or technologies that felt narratively connected to their industry.

Surfacing all dimensions all the time was not an option. It would have recreated the "Excel wall" inside the product.
`,
    },
    {
      type: "desktopMock",
      variant: "full",
      src: "/images/work/source-with-scorecard.png",
      alt: "Patch sourcing results showing project scorecards matched against buyer specifications",
    },
    {
      type: "text",
      content: `For this, we built a scorecard type interface directly into the results. Buyers would express their spec up front. The scorecard cross referenced that spec with each project's dimensions and then:

- Sorted projects by how well they matched that buyer's criteria.
- Surfaced the project's match to a spec with a simple score that could be hovered to view the full match breakdown.

This started as a scrappy Figma mock and quickly became one of the most useful UX patterns in the platform. It made the connection between "what I said I care about" and "what I am seeing on screen" explicit, without forcing buyers to manually manage filters for every slice of the market.

In parallel, we kept the core information architecture principle consistent. The main sourcing view surfaced decision making signals. The project detail view nested the deeper, expert level fields. Experts could read further down when the task demanded it. Role based access governed sensitive information like pricing and supplier details, but the underlying mental model stayed consistent.`,
    },
    {
      type: "text",
      content: `## Outcomes`,
    },
    {
      type: "desktopMock",
      variant: "full",
      src: "/images/work/source-outcome.png",
      alt: "What if I could tell the sourcing platform what I was looking for, rather than click through hundreds of filters and complex sorting logic.",
      caption:
        "The final result was a platform that balanced density with information architecture, prioritizing key data points with visual weight and positioning, and offering consolidated data bundled in logical ways depending on user access.",
    },
    {
      type: "text",
      content: `I cannot share detailed metrics, given the nature of Patch's product. The clearest outcomes are organizational and qualitative.

If we had simply executed the original brief, we would have shipped a polished new UI onto a market that experts and mature buyers still could not fully trust. Internal teams would likely have stayed in Excel. Enterprise deals would still have stalled at diligence because buyers could not complete the work inside the product. The refactor would have looked good in demos and left the underlying system unchanged.

What actually happened was different. Internal teams came back first. The climate experts who had drifted to spreadsheets returned to the platform because it now reflected the way they thought and worked, and it made that work faster. Recommendations could be shaped around each buyer's spec rather than re assembled from scratch each time. Over time, the spreadsheet was deprecated as the primary workspace. For a designer, replacing Excel as the power user tool is a meaningful outcome.

On the buyer side, we saw deals move through diligence with fewer back and forth conversations about missing or unclear information, and buyers spent more of their time comparing options instead of chasing basic facts.

The sourcing platform also became the data hub that other functions relied on. Supply, sales, and operations all worked in it, tracking projects, updating them, and presenting them to buyers from the same source. That was the real return on shaping the data first. A surface alone does not pull three functions onto one system. A data model that each of them can trust does.

The hardest moment in the project was asking leadership to delay a visible UI refresh in favor of invisible data work. I came in expecting pushback, so I brought prototypes and specific failure examples from sales calls to keep the discussion grounded in how experts and buyers were actually behaving.`,
    },
    {
      type: "text",
      content: `## Reflexions

In this project, the value of design was not just about individual screens, UI and information architecture, it was also about how the system fit together. Design is so much more than the top layers of a product, and it's most useful when it can help at every level of it.

- 0 to 1 and reframing. I pushed back on a UI first brief and reframed the problem around data quality and model design, using scrappy prototypes and realistic data to make the risks visible instead of debating them in the abstract.
- Systems thinking. I treated the sourcing platform as part of a larger system that linked registries, internal experts, buyers, and other Patch teams, and used that lens to shape both the data model and the information architecture.
- Scoping and tradeoffs. With one or two engineers, I helped the team choose to invest in the data model first, accepting a slower, less visible path in the short term in exchange for a platform other teams could build on.
- Stakeholder management. I used interactive prototypes in live sales calls and internal reviews to align product, engineering, and commercial stakeholders around what success needed to look like for experts and buyers, not just for demos.
- Collaboration. I worked closely with climate experts to define where AI automation was safe and where expert judgment was necessary, and with engineering to ensure that the model we designed together was actually buildable within constraints.`,
    },
  ],
  fr: [
    {
      type: "growthBar",
      metricLabel: "Croissance des projets",
      metrics: [
        "12 400 % de croissance en projets",
        "30-80 points de données par projet",
      ],
      rows: [
        { label: "avant", value: 200, displayValue: "~200" },
        { label: "après", value: 25000, displayValue: "25 000+" },
      ],
    },
    {
      type: "text",
      content: "## À propos de Patch et du produit",
    },
    {
      type: "text",
      content: `## Cadre : pourquoi nous avons dû changer

Le produit sourcing de Patch a d'abord été conçu pour environ 200 projets de crédits carbone. Fin 2024, nous l'avons porté à plus de 25 000.

Cette montée en charge a accompagné notre progression vers des acheteurs enterprise, car un catalogue curaté était ce que nos acheteurs les plus exigeants — et les plus importants — ne pouvaient pas utiliser. Un achat carbone est souvent un engagement pluriannuel de plusieurs millions, et l'acheteur doit le défendre face à sa direction : « voici tout ce que nous avons considéré » est une décision plus défendable que « voici ce qu'un fournisseur nous a montré ». Les acheteurs matures veulent savoir que nous avions tout le marché en vue, le vérifier eux-mêmes, et revenir vers nous s'il manquait un projet. Un catalogue curaté ne leur offrait rien de cela ; nous sommes donc allés couvrir le marché.

Un marché consultable est un produit différent d'un catalogue curaté. Le reconstruire signifiait concevoir pour deux publics à la fois. Les experts climat ont besoin de profondeur sur chaque dimension d'un projet. Les acheteurs ont besoin d'un chemin clair vers une décision qu'ils peuvent assumer. Une seule surface massive pour deux modèles mentaux — et cette tension a traversé chaque décision qui a suivi.`,
    },
    {
      type: "desktopMock",
      variant: "full",
      src: "/images/work/patch-sourcing-portfolio-details.png",
      alt: "Marketplace Patch sourcing avec portfolios expert et catalogue de projets consultable",
      caption:
        "Est-ce qu'on peut ajouter des filtres et retravailler l'UI pour que la plateforme supporte 25 000 projets ?",
    },
    {
      type: "text",
      content: "## Recadrage du problème",
    },
    {
      type: "desktopMock",
      variant: "content",
      src: "/images/work/patch-sourcing-inventory-spreadsheet.png",
      alt: "Feuille de calcul d'inventaire Patch utilisée comme source de vérité pour les projets de crédits carbone",
    },
    {
      type: "desktopMock",
      variant: "content",
      src: "/images/work/uxr-screenshot.png",
      alt: "Capture d'écran de recherche client issue d'une session de retour sur un prototype sourcing Patch",
      caption:
        "Chez Patch, nous menions la recherche utilisateur de façon pragmatique, adaptée à une très petite équipe EPD constamment à court de temps. Plutôt que de prendre chaque commentaire au pied de la lettre, nous cherchions les tendances et utilisions notre contexte interne pour interpréter ce que nous entendions. Nous ne visions pas toujours juste, mais nous apprenions constamment.",
    },
    {
      type: "text",
      content: "## Le défi : un système, pas un seul écran",
    },
    {
      type: "desktopMock",
      variant: "full",
      src: "/images/work/project-details-page.png",
      alt: "Page de détail projet Patch montrant des données carbone regroupées pour acheteurs et experts",
      caption:
        "Les données au niveau projet sont profondes dans Patch, allant des métadonnées de base à une due diligence experte étendue et à des évaluations qualité pilotées par l'IA.",
    },
    {
      type: "text",
      content: "## Modéliser la donnée",
    },
    {
      type: "desktopMock",
      variant: "content",
      src: "/images/work/Sourcing status.png",
      alt: "Indicateur de statut de sourcing Patch montrant des signaux consolidés de disponibilité et de sourcing",
    },
    {
      type: "text",
      content: "## Contextualiser : rendre la pertinence évidente",
    },
    {
      type: "desktopMock",
      variant: "full",
      src: "/images/work/source-with-scorecard.png",
      alt: "Résultats sourcing Patch montrant des scorecards de projets comparées aux critères de l'acheteur",
    },
    {
      type: "text",
      content: "## Résultats",
    },
    {
      type: "desktopMock",
      variant: "full",
      src: "/images/work/source-outcome.png",
      alt: "Et si je pouvais dire à la plateforme de sourcing ce que je cherchais, plutôt que de cliquer à travers des centaines de filtres et une logique de tri complexe.",
      caption:
        "Le résultat final était une plateforme qui équilibrait densité et architecture de l'information, en donnant plus de poids visuel et une meilleure position aux données clés, et en regroupant les données consolidées de manière logique selon les accès de chaque utilisateur.",
    },
    {
      type: "text",
      content: "## Réflexions",
    },
  ],
};

const naturalLanguageSearchBlocks: Record<Locale, CaseStudyBlock[]> = {
  en: [
    {
      type: "desktopMock",
      variant: "content",
      src: "/images/work/Ai-search-hero-image.mp4",
      alt: "Natural language search translating a typed query into visible, editable filter state on the Patch sourcing platform",
    },
    {
      type: "text",
      content: `## The Gap

The sourcing platform gave buyers the whole carbon market in one place: tens of thousands of projects, over 40 data points each, all filterable and sortable. The filtering was thorough, and it was slow. Expressing what you wanted meant a long string of selections. Naturally voiced criteria like "Nature-based removal" isn't one filter; it's fifteen technology types and a few mechanisms combined into a commonly used category of projects. A buyer who knew exactly what they meant by it still spent 15+ clicks to put together a filter list they'd submit to find what they were looking for.

That cost everyone, whether it be the experts who knew what to look for (e.g. NBR CCP-labeled BeZero AA+ projects on an ICROA registry) or buyers who were intent on discovery and figuring things out (e.g. what are the best ocean-based projects out there). The filtering worked. It just made everyone slow, multiple times every day.

In 2026, a proper AI setup made it so a designer could see the gap, scope it, and pick it up, which I did.`,
    },
    {
      type: "text",
      content: `## Built it in two weeks`,
    },
    {
      type: "desktopMockGallery",
      images: [
        {
          src: "/images/work/post-ai-source.png",
          alt: "After: Once search could handle most of the interaction, we could make the view denser with useful data instead of forcing users to manipulate filters directly.",
          caption: "After: Once search could handle most of the interaction, we could make the view denser with useful data instead of forcing users to manipulate filters directly.",
        },
        {
          src: "/images/work/source-pre-AI.png",
          alt: "Before: Applying any meaningful filtering to the sourcing platform required manually applying a deep set of filters & sorting logic manually.",
          caption: "Before: Applying any meaningful filtering to the sourcing platform required manually applying a deep set of filters & sorting logic manually.",
        },
      ],
    },
    {
      type: "text",
      content: `For this, I didn't build a chat interface. We had solid filtering and sorting functionality, and a set of structured data. What we needed was a probabilistic, natural language interpretation of a user's query that we could turn into deterministic results. Natural language in, a visible and editable set of filters out. You type what you're looking for, the AI translates it into filter state, and you see exactly what it did. It misinterpreted you? Or maybe you didn't query exactly as you intended? Not a problem, you can just adjust the filters directly. The AI simply lowers the cost of saying what you want. It doesn't take the decision away from you.

From some quick Figma mocks, to a locally working Cursor-built proof of concept with real project data, to a working PR in three days and shipped end to end in two weeks, this went from idea to prod with no roadmap item. The idea was clear and the build was cheap enough that overthinking it would have been the mistake. Engineers were invaluable to the process with their feedback, but otherwise could stay focused on higher priority roadmap items they were working on.

The experience was simple: type your natural language query into the search bar and a small Haiku agent, aware of the set of filters and sorting options available to it and knowledgeable about key terminology, interpreted the query and automatically applied, with visible feedback, a set of filters and sorting logic that met your criteria, that you could review and edit as needed, either with natural language again, or more traditional filter and sort patterns.`,
    },
    {
      type: "text",
      content: `## What it taught me

AI has collapsed the cost of trying. Worst case here was a week spent learning the idea didn't land, against a real build and real data. It also let me prototype against the actual dataset in days, which matters: search is hard to judge from mocks. You only see if it works when it's parsing real, messy data.

And a designer's leverage has changed. UX-first work like this at Patch used to be a roadmap item that competed for engineering time and lost most of the time. Now, it's a single designer's side project, built and shipped with a bit of support. The work that gets done is no longer limited to the work that gets prioritized.`,
    },
    {
      type: "desktopMock",
      variant: "content",
      src: "/images/work/GithubPR.png",
      alt: "Designers have so much more leverage in an AI-world than we\u2019ve ever had",
    },
  ],
  fr: [
    {
      type: "desktopMock",
      variant: "content",
      src: "/images/work/Ai-search-hero-image.mp4",
      alt: "Recherche en langage naturel traduisant une requête saisie en état de filtres visible et modifiable sur la plateforme Patch",
    },
    {
      type: "text",
      content: `## L'écart

La plateforme de sourcing donnait aux acheteurs l'ensemble du marché carbone au même endroit : des dizaines de milliers de projets, plus de 40 données par projet, tous filtrables et triables. Le filtrage était exhaustif, et il était lent. Exprimer ce que l'on voulait passait par une longue suite de sélections. Des critères formulés naturellement comme "Nature-based removal" ne correspondent pas à un seul filtre ; ce sont quinze types de technologies et quelques mécanismes combinés dans une catégorie de projets couramment utilisée. Un acheteur qui savait exactement ce qu'il voulait dire passait quand même 15+ clics à assembler une liste de filtres à soumettre pour trouver ce qu'il cherchait.

Ce coût touchait tout le monde, qu'il s'agisse des experts qui savaient quoi chercher (par exemple des projets NBR labellisés CCP, notés BeZero AA+, sur un registre ICROA) ou des acheteurs qui voulaient explorer et comprendre le marché (par exemple : quels sont les meilleurs projets ocean-based ?). Le filtrage fonctionnait. Il rendait simplement tout le monde plus lent, plusieurs fois par jour.

En 2026, avec un bon setup IA, un designer peut voir l'écart, en cadrer le périmètre, puis s'en charger lui-même. C'est ce que j'ai fait.`,
    },
    {
      type: "text",
      content: `## Construit en deux semaines`,
    },
    {
      type: "desktopMockGallery",
      images: [
        {
          src: "/images/work/post-ai-source.png",
          alt: "Après : Une fois la recherche assez puissante pour gérer la plupart des interactions, nous pouvions densifier la vue avec des données utiles au lieu d'obliger les utilisateurs à manipuler directement les filtres.",
          caption: "Après : Une fois la recherche assez puissante pour gérer la plupart des interactions, nous pouvions densifier la vue avec des données utiles au lieu d'obliger les utilisateurs à manipuler directement les filtres.",
        },
        {
          src: "/images/work/source-pre-AI.png",
          alt: "Avant : Appliquer un filtrage significatif sur la plateforme de sourcing nécessitait d'appliquer manuellement un ensemble profond de filtres et de logique de tri.",
          caption: "Avant : Appliquer un filtrage significatif sur la plateforme de sourcing nécessitait d'appliquer manuellement un ensemble profond de filtres et de logique de tri.",
        },
      ],
    },
    {
      type: "text",
      content: `Pour ça, je n'ai pas construit une interface de chat. Nous avions déjà un système de filtres et de tri solide, ainsi qu'un ensemble de données structurées. Ce dont nous avions besoin, c'était d'une interprétation probabiliste en langage naturel de la requête d'un utilisateur, que nous pourrions transformer en résultats déterministes. Langage naturel en entrée, un ensemble de filtres visible et modifiable en sortie. Vous tapez ce que vous cherchez, l'IA le traduit en état de filtres, et vous voyez exactement ce qu'elle a fait. Elle vous a mal compris ? Ou peut-être n'avez-vous pas formulé votre requête exactement comme vous le vouliez ? Aucun problème : il suffit d'ajuster les filtres directement. L'IA réduit simplement le coût d'exprimer ce que vous voulez. Elle ne vous retire pas la décision.

De quelques maquettes Figma rapides, à une preuve de concept fonctionnelle construite avec Cursor sur de vraies données de projets, puis à une PR fonctionnelle en trois jours et un déploiement de bout en bout en deux semaines, le projet est passé de l'idée à la prod sans jamais devenir un item de roadmap. L'idée était claire et le coût du build suffisamment faible pour que trop réfléchir aurait été l'erreur. Les ingénieurs ont été précieux par leurs retours, tout en pouvant rester concentrés sur les sujets roadmap plus prioritaires sur lesquels ils travaillaient.

L'expérience était simple : taper une requête en langage naturel dans la barre de recherche, puis laisser un petit agent Haiku, conscient de l'ensemble des filtres et options de tri à sa disposition et connaissant la terminologie clé, interpréter la requête et appliquer automatiquement, avec un retour visible, un ensemble de filtres et une logique de tri correspondant aux critères. L'utilisateur pouvait ensuite revoir et modifier cela si besoin, soit de nouveau en langage naturel, soit via des patterns de filtre et de tri plus classiques.`,
    },
    {
      type: "text",
      content: `## Ce que ça m'a appris

L'IA a fait s'effondrer le coût de l'essai. Dans le pire des cas ici, c'était une semaine pour apprendre que l'idée ne fonctionnait pas, face à un vrai build et à de vraies données. Elle m'a aussi permis de prototyper sur le dataset réel en quelques jours, ce qui compte : la recherche est difficile à juger sur des maquettes. On voit si ça marche seulement quand ça traite de vraies données, désordonnées.

Et l'effet de levier d'un designer a changé. Un travail UX-first comme celui-ci, chez Patch, était autrefois un item roadmap qui concurrençait du temps d'ingénierie et perdait la plupart du temps. Maintenant, c'est le side project d'un seul designer, construit et livré avec un peu de soutien. Le travail qui se fait n'est plus limité au travail qui est priorisé.`,
    },
    {
      type: "desktopMock",
      variant: "content",
      src: "/images/work/GithubPR.png",
      alt: "Les designers ont bien plus de levier dans un monde IA qu\u2019on en a jamais eu",
    },
  ],
};


// ---------------------------------------------------------------------------
// Case study data (pure TypeScript — no YAML serialization needed for blocks)
// ---------------------------------------------------------------------------

const caseStudiesByLocale: Record<Locale, CaseStudyEntry[]> = {
  en: [
    {
      slug: "patch-sourcing-marketplace",
      data: {
        title: "Scaling Patch's sourcing platform from 300 to 25,000 projects",
        summary:
          "Patch grew its sourcing data from 200 to 25,000+ carbon projects. I led the redesign that turned an unusable pile of data into a market buyers and in-house experts could both navigate.",
        company: "Patch",
        role: "Lead Product Designer",
        timeline: "Q3 2025",
        team: "Placeholder",
        tools: ["Figma"],
        topics: ["Carbon markets", "Marketplace", "Sourcing"],
        coverImage: "/images/work/case-study-preview-placeholder.png",
        previewMedia: {
          type: "image",
          src: "/images/work/case-study-preview-placeholder.png",
          alt: "Placeholder preview for Patch sourcing marketplace case study.",
        },
        featured: true,
        problem: "Placeholder",
        outcome: "Placeholder",
        order: 1,
        definitions: patchSourcingDefinitions,
        blocks: patchSourcingBlocks.en,
      },
    },
    {
      slug: "patch-natural-language-search",
      data: {
        title: "Natural language search",
        summary:
          "The sourcing platform's filtering was thorough, but slow. Powerful filters and sorting tools are not necessarily quick, quite the opposite. To bridge the gap between browsing intent and result, I built a natural language input that translated to visible, editable filter state and shipped it in two weeks without dedicated engineers, turning an oft-repeated minute-long task into a seconds-long workflow.",
        company: "Patch",
        role: "Lead Product Designer",
        timeline: "April 2026",
        team: "Solo, with support from an AI expert",
        tools: ["Figma", "Cursor"],
        topics: ["AI", "Search", "Carbon markets"],
        coverImage: "/images/work/case-study-preview-placeholder.png",
        previewMedia: {
          type: "image",
          src: "/images/work/case-study-preview-placeholder.png",
          alt: "Placeholder preview for natural language search case study.",
        },
        featured: true,
        problem:
          "Expressing a simple intent on the sourcing platform meant navigating a deep filter taxonomy, a repeated minute-long task where one sentence should have been enough.",
        outcome:
          "A natural language query translated into visible, editable filter state, turning a repeated minute-long task into a seconds-long workflow.",
        order: 2,
        blocks: naturalLanguageSearchBlocks.en,
      },
    },
    {
      slug: "patch-offer-log",
      data: {
        title: "Offer log: tracking complex deal logistics",
        summary: "",
        company: "Patch",
        role: "Lead Product Designer",
        timeline: "Q2 2025",
        team: "Placeholder",
        tools: ["Figma"],
        topics: ["Carbon markets", "Operations"],
        coverImage: "/images/work/case-study-preview-placeholder.png",
        previewMedia: {
          type: "image",
          src: "/images/work/case-study-preview-placeholder.png",
          alt: "Placeholder preview for Offer log case study.",
        },
        featured: true,
        problem: "",
        outcome: "",
        order: 3,
        comingSoon: true,
        blocks: [],
      },
    },
  ],
  fr: [
    {
      slug: "patch-sourcing-marketplace",
      data: {
        title: "Faire passer la plateforme sourcing de Patch de 300 à 25 000 projets",
        summary:
          "Patch est passé de 200 à plus de 25 000 projets carbone dans ses données sourcing. J'ai mené la refonte qui a transformé une masse de données inutilisable en un marché que les acheteurs et les experts internes pouvaient tous deux parcourir.",
        company: "Patch",
        role: "Lead Product Designer",
        timeline: "T3 2025",
        team: "Placeholder",
        tools: ["Figma"],
        topics: ["Marchés carbone", "Marketplace", "Sourcing"],
        coverImage: "/images/work/case-study-preview-placeholder.png",
        previewMedia: {
          type: "image",
          src: "/images/work/case-study-preview-placeholder.png",
          alt: "Aperçu placeholder pour l'étude de cas Patch sourcing marketplace.",
        },
        featured: true,
        problem: "Placeholder",
        outcome: "Placeholder",
        order: 1,
        definitions: patchSourcingDefinitions,
        blocks: patchSourcingBlocks.fr,
      },
    },
    {
      slug: "patch-natural-language-search",
      data: {
        title: "Recherche en langage naturel",
        summary:
          "Le filtrage de la plateforme de sourcing était exhaustif, mais lent. Des filtres puissants et des outils de tri ne sont pas forcément rapides, bien au contraire. Pour combler l'écart entre l'intention de navigation et le résultat, j'ai conçu une saisie en langage naturel qui se traduisait en un état de filtres visible et modifiable, livrée en deux semaines sans ingénieurs dédiés, transformant une tâche répétée d'une minute en un workflow de quelques secondes.",
        company: "Patch",
        role: "Lead Product Designer",
        timeline: "Avril 2026",
        team: "Solo, avec le soutien d'un expert IA",
        tools: ["Figma", "Cursor"],
        topics: ["IA", "Recherche", "Marchés carbone"],
        coverImage: "/images/work/case-study-preview-placeholder.png",
        previewMedia: {
          type: "image",
          src: "/images/work/case-study-preview-placeholder.png",
          alt: "Aperçu placeholder pour l'étude de cas recherche en langage naturel.",
        },
        featured: true,
        problem:
          "Exprimer une intention simple sur la plateforme de sourcing nécessitait de naviguer dans une taxonomie de filtres complexe — une tâche répétée d'une minute là où une phrase aurait dû suffire.",
        outcome:
          "Une requête en langage naturel traduite en état de filtres visible et modifiable, transformant une tâche répétée d'une minute en un workflow de quelques secondes.",
        order: 2,
        blocks: naturalLanguageSearchBlocks.fr,
      },
    },
    {
      slug: "patch-offer-log",
      data: {
        title: "Offer log: tracking complex deal logistics",
        summary: "",
        company: "Patch",
        role: "Lead Product Designer",
        timeline: "Q2 2025",
        team: "Placeholder",
        tools: ["Figma"],
        topics: ["Carbon markets", "Operations"],
        coverImage: "/images/work/case-study-preview-placeholder.png",
        previewMedia: {
          type: "image",
          src: "/images/work/case-study-preview-placeholder.png",
          alt: "Placeholder preview for Offer log case study.",
        },
        featured: true,
        problem: "",
        outcome: "",
        order: 3,
        comingSoon: true,
        blocks: [],
      },
    },
  ],
};

const otherWorkEntries: OtherWorkEntry[] = [
  {
    slug: "patch-portfolio-management",
    name: "Portfolio management",
    summary:
      "Redesigned a carbon credit ledger into a planning tool that helped enterprise buyers manage inventory, track status, and plan retirements with confidence.",
    timeframe: "January 2026",
    company: "Patch",
    images: [
      {
        src: "/images/work/Project page/Portfolio overview (10yrs, status, vintage).png",
        alt: "Patch portfolio management: portfolio overview showing 10-year horizon with status and vintage breakdown",
      },
      {
        src: "/images/work/Project page/Overview.png",
        alt: "Patch portfolio management: overview page showing high-level portfolio summary and credit status",
      },
      {
        src: "/images/work/Project page/Inventory.png",
        alt: "Patch portfolio management: inventory view showing credit lifecycle across delivered, undelivered, and pre-retirement states",
      },
    ],
    content: `## Challenge

Our previous portfolio management feature was built to meet table stakes: it worked like a transaction ledger, simply put. Customers were coming to us with much more complex planning needs. They needed to understand inventory across delivered, undelivered, and not-yet-issued credits, then decide which credits to retire against specific future years and claims. The complexity came from the lifecycle itself: issuance, delivery, payment, and retirement all moved on different timelines, and the product wasn't helping customers make sense of that.

## Customer Research & Framing

We treated this as a focused generative research effort over about three weeks. I put together the research plan, got buyer interviews on the schedule, and combined internal conversations with Patch teams and direct customer interviews to understand how people actually thought about inventory, status, and retirement planning. The first week was planning, the second was execution, and the third was analysis of the insights, all that while pushing the actual design explorations forward in parallel.

## Designing for Complex Inventory

The core design challenge was making a complicated portfolio feel legible without flattening the nuance or losing the details. Customers needed to see what had been purchased, what was actually available, what was still pre-retirement, and what had already been allocated or retired. I focused on organizing the experience around planning and traceability, so buyers could understand both the current state of their inventory and what actions they could take next. That made the system more useful for day-to-day decision-making and for reporting to investors or governing bodies.

## Build & Collaboration

This project moved in a very fast build environment, with engineering using AI heavily to accelerate execution. My role was to create enough clarity that engineers could keep moving without waiting on every final UI detail, while still making sure we weren't under-designing and shipping something too loose. We worked in a tight loop where prototypes, specs, and implementation evolved together, and I made sure the team had a strong enough view of the direction that they could stay unblocked as the interface firmed up. That balance between speed and product judgment was one of the most important parts of the work.

## Outcomes

This wasn't a paid feature, so success showed up in operational impact rather than direct revenue. After launch, we saw an 82% decrease over three months in customer requests to sales & operations asking basic but critical questions about their credits and status.`,
    href: "/work/patch-portfolio-management",
    order: 1,
  },
  {
    slug: "shop-pay-installments-ux",
    name: "Shop Pay installments",
    summary:
      "Designed the buyer experience for Shop Pay Installments, from purchase through repayment, balancing conversion, trust, and brand risk at Shopify scale.",
    timeframe: "2020",
    company: "Shopify",
    images: [
      {
        src: "/images/work/3.png",
        alt: "Shop Pay Installments buyer experience",
      },
      {
        src: "/images/work/5.png",
        alt: "Shop Pay Installments post-purchase payment schedule",
      },
    ],
    content: `## Context

In 2020, I led IC design for the buyer experience of Shop Pay Installments across pre-purchase, checkout, and post-purchase. The product built on top of Shop Pay, Shopify's accelerated checkout, and aimed to give buyers a flexible way to pay for higher-value purchases without adding friction to checkout. The opportunity was clear, but so were the risks: buy now, pay later was still emerging, buyer sentiment was mixed, and we were careful not to position Shopify as a lender-first brand.

## Research & Framing

This was a research-heavy project from the start. We combined partner insights, a survey of roughly 1,000 respondents, and in-depth interviews with more than 20 buyers to understand expectations, concerns, and decision-making around installments. I worked closely with researchers throughout, helping shape the problem space and translate the findings into product decisions. One of the most important insights was that buyers often saw installments as a helpful budgeting tool, but interest-bearing models introduced hesitation and cognitive overhead at the moment of purchase.

## Designing for Trust

A major design challenge was deciding how much information to show, and when, so buyers could make an informed choice without feeling overwhelmed. We led with a simple four-pay, no-interest model for smaller purchases and designed the flow so buyers could clearly compare paying in full versus paying over time, understand their approval state, and move forward with confidence. Because this wasn't the kind of financial product you ship lightly and fix later, we spent significant time designing for edge cases, especially around approvals, rejections, and moments where trust could break down.

## Post-purchase Experience

The most interesting part of the work was post-purchase. Installments stretch a single purchase across six weeks, and once buyers have overlapping orders, upcoming charges, refunds, and delivery timelines, it becomes easy to lose track of what's happening. I focused on making that experience legible across web and app, so buyers could understand their payment schedule, see what was charged and what was next, and stay informed through email and push notifications. We also made sure buyers didn't need the Shop app to manage their payments, which kept the experience accessible and reduced dependency on a single channel.

## Validation & Delivery

We validated the experience through repeated unmoderated task-based testing and gave participants real gift card funds so they could go through flows with actual stakes instead of hypothetical intent. That helped us catch where people got stuck and evaluate the experience under more realistic conditions. Throughout the project, we also instrumented key flows, set up tripwires for performance, and reviewed the work regularly with UX and business stakeholders. The result was a simple experience on the surface, backed by a lot of careful systems thinking underneath.

## Outcomes

By the time I left Shopify in April 2021, just a few months after launch, Shop Pay Installments had already become the largest installments provider in the US by merchant count. It accounted for 7% of Shop Pay orders and 15% of overall installments volume on Shopify, which showed how quickly buyers and merchants adopted it. For me, the strongest outcome was that we shipped a financial product with meaningful complexity in a way that felt clear, lightweight, and trustworthy.

## Reflections

This project taught me a lot about working with third parties and about staying opinionated without becoming rigid. Many constraints turned out to be less fixed than they first appeared, and I learned how important it is to document unresolved UX opportunities and revisit them as the product matures. If I did it again, I'd push earlier for easier testing infrastructure, use internal behavioral data sooner, and stay more closely involved through build and QA to protect the details that matter in a high-trust experience.`,
    href: "/work/shop-pay-installments-ux",
    order: 2,
  },
];

// ---------------------------------------------------------------------------
// Public API (same shape as before — cached async functions)
// ---------------------------------------------------------------------------

export const getCaseStudies = cache(async (locale: Locale = DEFAULT_LOCALE) => {
  return caseStudiesByLocale[locale].sort((a, b) => a.data.order - b.data.order);
});

export const getFeaturedCaseStudies = cache(async (locale: Locale = DEFAULT_LOCALE) => {
  const projects = await getCaseStudies(locale);
  return projects.filter((project) => project.data.featured);
});

export const getOtherWork = cache(async () => {
  return otherWorkEntries.sort((a, b) => a.order - b.order);
});

export const getCaseStudyBySlug = cache(
  async (slug: string, locale: Locale = DEFAULT_LOCALE) => {
    const projects = await getCaseStudies(locale);
    return projects.find((project) => project.slug === slug);
  },
);

export const getOtherWorkBySlug = cache(async (slug: string) => {
  const entries = await getOtherWork();
  return entries.find((entry) => entry.slug === slug);
});
