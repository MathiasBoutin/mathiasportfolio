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
      "I reach for mocks or prototypes early if the timeline is tight, before I consider them truly \"earned,\" because they turn a vague challenge or disagreement into something real. It's much easier to align people around ideas and concepts they can see and react to than something they have to imagine. Stronger alignment, more rapidly. The risk is that a mock can also paint you into a corner — people anchor on it. So I try to be explicit that an early mock is a question, not a proposal.",
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
      rows: [
        { label: "before", value: 200, displayValue: "~200" },
        { label: "after", value: 25000, displayValue: "25,000+" },
      ],
    },
    {
      type: "text",
      content: `## Frame

Patch's sourcing product was originally built for about 200 carbon credit projects. In late 2024 we grew that number to 25,000+.

We grew it as we moved upmarket into enterprise buyers, because a curated set was the one thing our most serious — and our largest — buyers couldn't use. A carbon purchase is often a multi-year commitment worth millions, and the buyer has to defend it to their own leadership, where "here's everything we considered" is a more defensible decision than "here's what a vendor showed us." Mature buyers want to know we had the full market in view, verify it themselves, and push back if there was a project we hadn't considered. A curated catalog gave them none of that, so we went and covered the market instead.

A searchable market is a different product than a curated catalog. Rebuilding it meant designing for two audiences at once. Climate experts need depth on every dimension of a project. Buyers need a clear path to a decision they can stand behind. One massive surface for two mental models, and that tension ran through every decision that followed.`,
    },
    {
      type: "text",
      content: `## Reframe

The brief was to redesign the UI for a much larger set of data. More filters, better sorting, a way to compare projects. It sounded reasonable. I was fairly sure it was wrong.

The clearest hint was sitting inside our own company. Patch's climate experts had quietly stopped using the product and moved their real work into Excel — a spreadsheet that had become the de facto source of truth for inventory for most of the team. They hadn't left because the interface was dated. They'd left because the data underneath couldn't support actual diligence, and a spreadsheet they controlled could. As we moved upmarket, that stopped being an internal quirk and became a forecast: enterprise buyers come with their own climate experts, and they were about to hit exactly the wall our experts already had.`,
    },
    {
      type: "desktopMock",
      variant: "content",
      src: "/images/work/patch-sourcing-inventory-spreadsheet.png",
      alt: "Patch current inventory spreadsheet used as the de facto source of truth for carbon credit projects",
    },
    {
      type: "desktopMockGallery",
      images: [
        {
          src: "/images/work/patch-sourcing-source-tab-filters.png",
          alt: "Patch sourcing source tab showing filters, sortable columns, and project inventory results",
        },
        {
          src: "/images/work/patch-sourcing-project-matching.png",
          alt: "Patch sourcing project matching view showing buyer criteria and matched project attributes",
        },
        {
          src: "/images/work/patch-sourcing-source-tab-table.png",
          alt: "Patch sourcing source tab showing a filtered project table with registry, inventory, and pricing data",
        },
      ],
    },
    {
      type: "text",
      content: `So the problem wasn't the interface. It was the data. Our 25,000 projects came from dozens of registries that each described things differently: different names for the same technology, different ways of reporting the same fact, different fields entirely. And the data was incomplete in ways that mattered. It often couldn't tell you whether a project was still issuing credits, whether we could actually source it, or what it might cost. A better UI on top of that would have been a faster way to browse an unreliable market.

An internal signal is easy to wave away, though. Our experts are power users; buyers are different; maybe it wouldn't matter at the scale that counted. So before we committed engineering time, I built a working prototype of the new sourcing platform in Figma Make, running on the real, messy data. That detail was the point: a static mock can't expose a data problem because it has no data underneath it. A functioning prototype on the actual registry data could — and AI was what made building it fast and cheap enough to be worth doing before the real decision got made. I put it in front of customers on the sales calls we already had on the books. The gaps were obvious the moment people tried to use it. Buyers couldn't tell why one project ranked above another, couldn't find the facts they cared about, didn't trust what they were seeing. The same failure that drove our experts to Excel, now in front of the people the brief was meant to serve.

The prototype wasn't there to test whether buyers liked the UI. It was there to make the cost of the wrong plan visible to the people funding it. We had one or two engineers on this, and fixing the data meant delaying the visible work everyone was expecting — so the argument had to be concrete enough to move a room already committed to a different plan. It was. Instead of redesigning the UI, we'd stop and rebuild the data model first.

What we deliberately didn't do was the safe version of the brief: a UI/UX refactor on top of the data we had. That would have shipped, demoed well, and changed nothing about whether a buyer could trust the market. Choosing the data instead meant choosing a harder, slower, less visible battle — picked because it was the one actually worth fighting.`,
    },
    {
      type: "desktopMock",
      src: "/images/work/patch-sourcing-portfolio-details.png",
      alt: "Patch sourcing marketplace showing expert-built portfolios and a browsable project catalog",
    },
    {
      type: "text",
      content: `## The Lever

Every registry described its projects differently, and even at its best the data was raw: accurate, but not actionable without an expert. Sourcing and pricing weren't in the registries at all. We had to assemble those ourselves.

It would have been easy to treat this as a backend job and hand it off. I pushed against that. Data decisions are some of the most expensive to reverse: once 25,000 projects are modeled a certain way and a product sits on top, re-shaping the model means re-touching everything downstream. Making those calls without the product in view is a bet placed before you can see what you're betting on.

So we shaped the data with its final home in view. Registries structure their data for accounting. Buyers need it structured for choosing. Most of the work was translating one into the other: deciding the canonical shape so a buyer filtering for one thing found all of it, and merging internally gathered data into the same model without seams, so it read as one coherent picture rather than two sources stitched together.

We sequenced the work to match. Design shaped the model from the consumption side first; engineering constraints came in once we knew what we were building. Then engineering moved to indexing and the infrastructure a dataset this size demands.

AI mattered here, but not as a feature — and not as a black box either. Reconciling dozens of registries' inconsistent labels across 25,000 projects would have eaten the timeline on a one-to-two-engineer team; AI made it tractable. The judgment call was knowing where it couldn't be trusted. We knew the industry well enough to identify up front which categories of reconciliation were genuinely ambiguous — where calling two things "the same" required a climate expert, not a pattern match — and routed those to our experts before the model ran, rather than discovering the bad merges afterward. AI did the volume; we decided in advance where volume wasn't good enough.`,
    },
    {
      type: "text",
      content: `## The two-sided pane of glass

A clean data model made 25,000 projects correct. It didn't make them usable. Twenty-five thousand of anything is unbrowsable, and a buyer still had to get from the whole market down to a shortlist they could act on.

There was an obvious path here: build two products, an expert tool and a buyer tool, one for depth and one for clarity. We didn't. Two surfaces would have re-created, inside our own product, the exact registry-versus-buyer split we'd just spent the data work closing. The bet was to align business and product incentives on a single surface and scale both audiences' needs at once — on the hypothesis that as the market matures, buyers grow more expert, and the two mental models converge rather than diverge. One surface was a wager on where the market was heading.

That made the core of this stage information architecture: deciding what gets surfaced and what gets nested, what order it's read in, what sits next to what. The instinct the brief came with was to show more — more filters, more columns, more sort options. But more is what made the market unusable in the first place. Good architecture is as much about what you withhold. What earns a place in the sourcing platform itself, and what belongs one level down on a project's detail page, was the real decision, and most of the work was making those calls deliberately rather than defaulting everything to the surface.

The grouping mattered more than the sorting. Inventory availability and issuance timelines, for instance, live together: a buyer asking whether they can get a project is asking, in the same breath, when it will be ready. Grouped, the two answer one question. Apart, the buyer has to assemble the answer themselves. We grouped by how buyers reason, not by how the data is typed.

But a fixed architecture still treats every buyer the same, and buyers don't weight the market the same way. One buyer's spec makes location the dimension everything turns on; another barely cares about it. So the architecture had to respond to the buyer in front of it: a buyer's stated requirements pull the dimensions they care about forward, into the first thing they see on a project and into how the list is sorted. The scorecard is that principle made visible — adapting the architecture to each buyer's spec instead of guessing one fixed hierarchy for all of them, scoring each project against what that buyer actually asked for.

This is also where the single-surface bet did its work. What's surfaced is the buyer's clarity; what's nested is the expert's depth — same surface, read as far down as the job demands, with role-based access governing pricing and supplier detail. The dual-audience tension doesn't fully resolve here, and it isn't meant to. It becomes a standing product principle: every buyer-facing surface built after this one inherits the same question of what to surface and what to nest. The architecture didn't end the tension — it gave the team a consistent way to keep answering it.

Done well, this stage was quiet. It set up the search that came next: a way to read a buyer's intent directly, instead of waiting for them to express it one filter at a time.`,
    },
    {
      type: "text",
      content: `## Outcomes

There are no hard metrics I can share here, due to the nature of Patch's product. But the honest result is organizational, and it's specific: the work built a capability the company didn't have before.

The counterfactual is the clearest way to see it. Had we executed the original brief, we'd have shipped a polished UI onto a market buyers still couldn't trust — experts still in Excel, enterprise buyers hitting the same wall, the deals that prompted the move upmarket stalling on diligence they couldn't complete. The refactor would have demoed well and changed none of that.

Instead, the internal teams came back first. The climate experts who'd drifted to Excel had somewhere to do real work again, and the platform made that work faster — recommendations shaped to each buyer rather than assembled from scratch each time. The spreadsheet got deprecated. As a designer, beating Excel is not a small thing to put on the board.

The larger shift is what the platform became. It's now the data hub the product runs through. Supply, sales, and operations all work in it — tracking projects, updating them, presenting them to buyers from the same source. That was the real return on shaping the data first. A surface alone doesn't pull three functions onto one system; a data model they can all trust does.

It also became the ground the next thing was built on: search that could read a buyer's intent directly, which is its own story.`,
    },
    {
      type: "text",
      content: "## Reflexions",
    },
  ],
  fr: [
    {
      type: "growthBar",
      metricLabel: "Croissance des projets",
      rows: [
        { label: "avant", value: 200, displayValue: "~200" },
        { label: "après", value: 25000, displayValue: "25 000+" },
      ],
    },
    {
      type: "text",
      content: `## Cadre

Le produit sourcing de Patch a d'abord été conçu pour environ 200 projets de crédits carbone. Fin 2024, nous l'avons porté à plus de 25 000.

Cette montée en charge a accompagné notre progression vers des acheteurs enterprise, car un catalogue curaté était ce que nos acheteurs les plus exigeants — et les plus importants — ne pouvaient pas utiliser. Un achat carbone est souvent un engagement pluriannuel de plusieurs millions, et l'acheteur doit le défendre face à sa direction : « voici tout ce que nous avons considéré » est une décision plus défendable que « voici ce qu'un fournisseur nous a montré ». Les acheteurs matures veulent savoir que nous avions tout le marché en vue, le vérifier eux-mêmes, et revenir vers nous s'il manquait un projet. Un catalogue curaté ne leur offrait rien de cela ; nous sommes donc allés couvrir le marché.

Un marché consultable est un produit différent d'un catalogue curaté. Le reconstruire signifiait concevoir pour deux publics à la fois. Les experts climat ont besoin de profondeur sur chaque dimension d'un projet. Les acheteurs ont besoin d'un chemin clair vers une décision qu'ils peuvent assumer. Une seule surface massive pour deux modèles mentaux — et cette tension a traversé chaque décision qui a suivi.`,
    },
    {
      type: "text",
      content: "## Recadrage",
    },
    {
      type: "desktopMock",
      variant: "content",
      src: "/images/work/patch-sourcing-inventory-spreadsheet.png",
      alt: "Feuille de calcul d'inventaire Patch utilisée comme source de vérité pour les projets de crédits carbone",
    },
    {
      type: "desktopMockGallery",
      images: [
        {
          src: "/images/work/patch-sourcing-source-tab-filters.png",
          alt: "Onglet source de Patch montrant les filtres, les colonnes triables et les résultats d'inventaire projets",
        },
        {
          src: "/images/work/patch-sourcing-project-matching.png",
          alt: "Vue de matching projet de Patch montrant les critères d'achat et les attributs projet correspondants",
        },
        {
          src: "/images/work/patch-sourcing-source-tab-table.png",
          alt: "Onglet source de Patch montrant un tableau filtré avec les données de registre, d'inventaire et de prix",
        },
      ],
    },
    {
      type: "desktopMock",
      src: "/images/work/patch-sourcing-portfolio-details.png",
      alt: "Marketplace Patch sourcing avec portfolios expert et catalogue de projets consultable",
    },
    {
      type: "text",
      content: "## Le levier",
    },
    {
      type: "text",
      content: "## La vitre à deux faces",
    },
    {
      type: "text",
      content: "## Résultats",
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
      variant: "full",
      src: "/images/work/Source tab.png",
      alt: "What if I could tell the sourcing platform what I was looking for, rather than click through hundreds of filters and complex sorting logic.",
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
      content: `## Built it in two weeks

For this, I didn't build a chat interface. We had solid filtering and sorting functionality, and a set of structured data. What we needed was a probabilistic, natural language interpretation of a user's query that we could turn into deterministic results. Natural language in, a visible and editable set of filters out. You type what you're looking for, the AI translates it into filter state, and you see exactly what it did. It misinterpreted you? Or maybe you didn't query exactly as you intended? Not a problem, you can just adjust the filters directly. The AI simply lowers the cost of saying what you want. It doesn't take the decision away from you.`,
    },
    {
      type: "desktopMock",
      variant: "content",
      src: "/images/work/FIgma Mock AI Search.png",
      alt: "A quick figma prototype was all that was needed to stress test the visuals: no extensive spec, no overly complex brief or RFC.",
    },
    {
      type: "text",
      content: `From some quick Figma mocks, to a locally working Cursor-built proof of concept with real project data, to a working PR in three days and shipped end to end in two weeks, this went from idea to prod with no roadmap item. The idea was clear and the build was cheap enough that overthinking it would have been the mistake. Engineers were invaluable to the process with their feedback, but otherwise could stay focused on higher priority roadmap items they were working on.

The experience was simple: type your natural language query into the search bar and a small Haiku agent, aware of the set of filters and sorting options available to it and knowledgeable about key terminology, interpreted the query and automatically applied, with visible feedback, a set of filters and sorting logic that met your criteria, that you could review and edit as needed, either with natural language again, or more traditional filter and sort patterns.`,
    },
    {
      type: "desktopMock",
      variant: "content",
      src: "/images/work/Ai-search-hero-image.mp4",
      alt: "Natural language search translating a typed query into visible, editable filter state on the Patch sourcing platform",
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
      variant: "full",
      src: "/images/work/Source tab.png",
      alt: "Et si je pouvais dire à la plateforme de sourcing ce que je cherchais, plutôt que de cliquer à travers des centaines de filtres et une logique de tri complexe.",
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
      content: `## Construit en deux semaines

Pour ça, je n'ai pas construit une interface de chat. Nous avions déjà un système de filtres et de tri solide, ainsi qu'un ensemble de données structurées. Ce dont nous avions besoin, c'était d'une interprétation probabiliste en langage naturel de la requête d'un utilisateur, que nous pourrions transformer en résultats déterministes. Langage naturel en entrée, un ensemble de filtres visible et modifiable en sortie. Vous tapez ce que vous cherchez, l'IA le traduit en état de filtres, et vous voyez exactement ce qu'elle a fait. Elle vous a mal compris ? Ou peut-être n'avez-vous pas formulé votre requête exactement comme vous le vouliez ? Aucun problème : il suffit d'ajuster les filtres directement. L'IA réduit simplement le coût d'exprimer ce que vous voulez. Elle ne vous retire pas la décision.`,
    },
    {
      type: "desktopMock",
      variant: "content",
      src: "/images/work/FIgma Mock AI Search.png",
      alt: "Un prototype Figma rapide a suffi pour mettre les visuels à l'épreuve : pas de spec lourde, pas de brief ou de RFC inutilement complexe.",
    },
    {
      type: "text",
      content: `De quelques maquettes Figma rapides, à une preuve de concept fonctionnelle construite avec Cursor sur de vraies données de projets, puis à une PR fonctionnelle en trois jours et un déploiement de bout en bout en deux semaines, le projet est passé de l'idée à la prod sans jamais devenir un item de roadmap. L'idée était claire et le coût du build suffisamment faible pour que trop réfléchir aurait été l'erreur. Les ingénieurs ont été précieux par leurs retours, tout en pouvant rester concentrés sur les sujets roadmap plus prioritaires sur lesquels ils travaillaient.

L'expérience était simple : taper une requête en langage naturel dans la barre de recherche, puis laisser un petit agent Haiku, conscient de l'ensemble des filtres et options de tri à sa disposition et connaissant la terminologie clé, interpréter la requête et appliquer automatiquement, avec un retour visible, un ensemble de filtres et une logique de tri correspondant aux critères. L'utilisateur pouvait ensuite revoir et modifier cela si besoin, soit de nouveau en langage naturel, soit via des patterns de filtre et de tri plus classiques.`,
    },
    {
      type: "desktopMock",
      variant: "content",
      src: "/images/work/Ai-search-hero-image.mp4",
      alt: "Recherche en langage naturel traduisant une requête saisie en état de filtres visible et modifiable sur la plateforme Patch",
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

const shopPayInstallmentsBlocks: Record<Locale, CaseStudyBlock[]> = {
  en: [
    {
      type: "desktopMock",
      variant: "full",
      src: "/images/work/Final purchase.png",
      alt: "Shop Pay Installments final purchase screen showing 4-payment breakdown with no interest",
      caption: "Shop Pay Installments allowed buyers to pay for the purchase in 4 payments with no interest, and needed to work across millions of online stores & complex checkout permutations.",
      width: 1440,
      height: 748,
    },
    {
      type: "text",
      content: `## Context

Shopify wanted to let buyers split a purchase into smaller payments. The reasoning was simple. Conversion dropped as carts got more expensive, and a lot of buyers were already looking for ways to keep their budget flexible.

Shop Pay was a natural place to put it. It had reach, it knew its buyers, and it could offer installments right in the flow instead of as a separate signup. We built the product with Affirm as a partner, which added real constraints to what the experience could be.

I led design for the buyer side, from pre-purchase through to post-purchase.`,
    },
    {
      type: "text",
      content: `## What we did

We started with research. A survey of over a thousand respondents, partner insights, and twelve interviews split across two groups: people who already used Buy-Now-Pay-Later, and people who didn't. We wanted to understand how buyers actually thought about it before picking a direction.`,
    },
    {
      type: "desktopMock",
      variant: "content",
      src: "/images/work/uxrbnpl.png",
      alt: "UXR research synthesis showing buyer profiles for Shop Pay Installments BNPL solution",
      caption: "We ran extensive UXR research, with both a survey and in-person interviews, to establish buyer profiles for our BNPL solution.",
      width: 1662,
      height: 924,
    },
    {
      type: "text",
      content: `A few things stood out. Buyers felt very differently about installments depending on who they were, but Shop Pay's buyers leaned positive and tended to treat it as a budgeting tool. Some worried that interest would make an already hard purchase decision harder. And in early testing, a few buyers started to see Shop Pay itself as an installments company, which was a brand risk worth keeping an eye on.

Most of my time went to the post-purchase experience. That's where a buyer tracks their order, sees what they still owe, and makes payments over the next six to eight weeks. It's the least visible part of installments. It's also where things quietly go wrong, so it had to be clear and calm. We prototyped, ran unmoderated task-based tests on the riskier assumptions, and instrumented the flows so we could watch support load, repayment rates, and failed payments once it shipped.`,
    },
    {
      type: "text",
      content: `## Where we landed

Shop Pay Installments left beta and launched in April 2021. Within a few months it was the largest installments provider in the US by merchant count, and it accounted for roughly 7% of Shop Pay orders.`,
    },
  ],
  fr: [
    {
      type: "desktopMock",
      variant: "full",
      src: "/images/work/Final purchase.png",
      alt: "Écran d'achat final Shop Pay Versements montrant la répartition en 4 paiements sans intérêts",
      caption: "Shop Pay Versements permettait aux acheteurs de payer leur achat en 4 versements sans intérêts, et devait fonctionner dans des millions de boutiques en ligne avec des permutations de paiement complexes.",
      width: 1440,
      height: 748,
    },
    {
      type: "text",
      content: `## Contexte

Shopify souhaitait permettre aux acheteurs de diviser un achat en plusieurs paiements. Le raisonnement était simple. La conversion chutait à mesure que les paniers devenaient plus coûteux, et de nombreux acheteurs cherchaient déjà des moyens de garder leur budget flexible.

Shop Pay était l'endroit naturel pour l'intégrer. Il avait la portée, connaissait ses acheteurs, et pouvait proposer les versements directement dans le parcours plutôt que comme une inscription séparée. Nous avons construit le produit avec Affirm comme partenaire, ce qui ajoutait de vraies contraintes à ce que l'expérience pouvait être.

J'ai dirigé le design pour le côté acheteur, du pré-achat jusqu'au post-achat.`,
    },
    {
      type: "text",
      content: `## Ce que nous avons fait

Nous avons commencé par la recherche. Un sondage auprès de plus d'un millier de répondants, des insights partenaires, et douze entretiens répartis en deux groupes : des personnes qui utilisaient déjà le Buy-Now-Pay-Later, et des personnes qui ne l'utilisaient pas. Nous voulions comprendre comment les acheteurs pensaient réellement au produit avant de choisir une direction.`,
    },
    {
      type: "desktopMock",
      variant: "content",
      src: "/images/work/uxrbnpl.png",
      alt: "Synthèse de recherche UXR montrant les profils d'acheteurs pour la solution BNPL de Shop Pay",
      caption: "Nous avons mené une recherche UXR approfondie, avec à la fois un sondage et des entretiens en personne, pour établir les profils d'acheteurs de notre solution BNPL.",
      width: 1662,
      height: 924,
    },
    {
      type: "text",
      content: `Quelques éléments se sont démarqués. Les acheteurs ressentaient les versements très différemment selon leur profil, mais les acheteurs Shop Pay penchaient positivement et avaient tendance à le traiter comme un outil de gestion budgétaire. Certains craignaient que les intérêts ne rendent une décision d'achat déjà difficile encore plus compliquée. Et lors des premiers tests, quelques acheteurs ont commencé à percevoir Shop Pay lui-même comme une entreprise de versements, ce qui représentait un risque de marque à surveiller.

La majeure partie de mon temps a été consacrée à l'expérience post-achat. C'est là qu'un acheteur suit sa commande, voit ce qu'il doit encore payer, et effectue ses paiements sur les six à huit semaines suivantes. C'est la partie la moins visible des versements. C'est aussi là que les choses se passent discrètement mal, donc il fallait que ce soit clair et calme. Nous avons prototypé, effectué des tests non modérés basés sur des tâches pour les hypothèses les plus risquées, et instrumenté les parcours pour surveiller la charge du support, les taux de remboursement et les paiements échoués une fois le produit lancé.`,
    },
    {
      type: "text",
      content: `## Où nous en sommes arrivés

Shop Pay Versements a quitté la bêta et lancé en avril 2021. En quelques mois, c'était le plus grand fournisseur de versements aux États-Unis en nombre de marchands, et il représentait environ 7 % des commandes Shop Pay.`,
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
        title: "From a curated marketplace to a transparent market (temporary)",
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
          "Expressing a simple intent on the sourcing platform meant navigating a deep filter taxonomy — a repeated minute-long task where one sentence should have been enough.",
        outcome:
          "A natural language query translated into visible, editable filter state, turning a repeated minute-long task into a seconds-long workflow.",
        order: 2,
        blocks: naturalLanguageSearchBlocks.en,
      },
    },
    {
      slug: "shop-pay-installments",
      data: {
        title: "Shop Pay Installments",
        summary:
          "A Buy-Now-Pay-Later product built into Shop Pay. I led buyer experience design for the entire project, focused on the purchase flow as much as the post-purchase journey, where buyers track and repay their installments.",
        company: "Shopify",
        role: "Lead Product Designer",
        timeline: "2020–2021",
        team: "Placeholder",
        tools: ["Figma"],
        topics: ["Fintech", "Payments", "Post-purchase"],
        coverImage: "/images/work/case-study-preview-placeholder.png",
        previewMedia: {
          type: "image",
          src: "/images/work/case-study-preview-placeholder.png",
          alt: "Placeholder preview for Shop Pay Installments case study.",
        },
        featured: true,
        problem:
          "Conversion dropped as carts got more expensive. Shopify needed a way to let buyers split purchases into smaller payments without breaking the Shop Pay experience.",
        outcome:
          "Shop Pay Installments launched in April 2021 and became the largest installments provider in the US by merchant count within months, accounting for ~7% of Shop Pay orders.",
        order: 3,
        blocks: shopPayInstallmentsBlocks.en,
      },
    },
  ],
  fr: [
    {
      slug: "patch-sourcing-marketplace",
      data: {
        title: "D'un marché curaté à un marché transparent (temporaire)",
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
      slug: "shop-pay-installments",
      data: {
        title: "Shop Pay Versements",
        summary:
          "Un produit Buy-Now-Pay-Later intégré à Shop Pay. J'ai dirigé le design de l'expérience acheteur pour l'ensemble du projet, en me concentrant autant sur le parcours d'achat que sur le parcours post-achat, où les acheteurs suivent et remboursent leurs versements.",
        company: "Shopify",
        role: "Lead Product Designer",
        timeline: "2020–2021",
        team: "Placeholder",
        tools: ["Figma"],
        topics: ["Fintech", "Paiements", "Post-achat"],
        coverImage: "/images/work/case-study-preview-placeholder.png",
        previewMedia: {
          type: "image",
          src: "/images/work/case-study-preview-placeholder.png",
          alt: "Aperçu placeholder pour l'étude de cas Shop Pay Versements.",
        },
        featured: true,
        problem:
          "La conversion chutait à mesure que les paniers devenaient plus coûteux. Shopify avait besoin d'un moyen de permettre aux acheteurs de diviser leurs achats en paiements plus petits sans briser l'expérience Shop Pay.",
        outcome:
          "Shop Pay Versements a lancé en avril 2021 et est devenu le plus grand fournisseur de versements aux États-Unis en nombre de marchands en quelques mois, représentant ~7 % des commandes Shop Pay.",
        order: 3,
        blocks: shopPayInstallmentsBlocks.fr,
      },
    },
  ],
};

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

export const getCaseStudyBySlug = cache(
  async (slug: string, locale: Locale = DEFAULT_LOCALE) => {
    const projects = await getCaseStudies(locale);
    return projects.find((project) => project.slug === slug);
  },
);
