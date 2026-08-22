export interface ToolMeta {
  name: string;
  slug: string;
  description: string;
  longDescription: string;
  seoTitle: string;
  seoDescription: string;
  keywords: string[];
  icon: string;
  relatedTools: string[];
}

export const SITE = {
  name: 'JSONCraft',
  url: 'https://jsoncraft-app.pages.dev',
  tagline: 'Free online JSON tools for developers',
  description: 'Format, validate, minify, and beautify JSON instantly in your browser. Fast, free, private — no data leaves your device.',
};

export const tools: ToolMeta[] = [
  {
    name: 'JSON Formatter',
    slug: 'json-formatter',
    description: 'Format and pretty-print JSON data with customizable indentation.',
    longDescription: 'Transform messy, minified, or unformatted JSON into clean, readable output. Choose between 2 spaces, 4 spaces, or tab indentation. Copy to clipboard or download as a .json file.',
    seoTitle: 'JSON Formatter Online — Free Pretty Print Tool | JSONCraft',
    seoDescription: 'Format JSON online for free. Pretty-print, indent, and organize JSON data instantly in your browser. No data uploaded. Fast, private, and accurate.',
    keywords: ['json formatter', 'format json', 'json pretty print', 'json online', 'json formatter online'],
    icon: '{ }',
    relatedTools: ['json-validator', 'json-minifier', 'json-beautifier'],
  },
  {
    name: 'JSON Validator',
    slug: 'json-validator',
    description: 'Validate JSON syntax and detect errors with precise line-by-line reporting.',
    longDescription: 'Check if your JSON is valid before using it in APIs, configs, or code. Get clear error messages with context to fix issues quickly.',
    seoTitle: 'JSON Validator Online — Check JSON Syntax | JSONCraft',
    seoDescription: 'Validate JSON syntax online. Detect errors, broken brackets, missing commas, and more. Free browser-based tool — your data never leaves your device.',
    keywords: ['json validator', 'validate json', 'json syntax checker', 'json lint'],
    icon: '✓',
    relatedTools: ['json-beautifier', 'json-minifier', 'json-formatter'],
  },
  {
    name: 'JSON Minifier',
    slug: 'json-minifier',
    description: 'Minify JSON by removing whitespace and line breaks to reduce file size.',
    longDescription: 'Compress JSON to its smallest representation by stripping unnecessary whitespace. Ideal for APIs, production deployments, and reducing bandwidth.',
    seoTitle: 'JSON Minifier Online — Compress JSON | JSONCraft',
    seoDescription: 'Minify JSON online. Remove whitespace and reduce JSON file size instantly. Free, private, browser-based — no server uploads.',
    keywords: ['json minifier', 'minify json', 'compress json', 'json shrink'],
    icon: '−',
    relatedTools: ['json-beautifier', 'json-validator', 'json-formatter'],
  },
  {
    name: 'JSON Beautifier',
    slug: 'json-beautifier',
    description: 'Beautify and format JSON with syntax highlighting and customizable indentation.',
    longDescription: 'Turn compact, hard-to-read JSON into beautifully formatted output with color-coded syntax. Choose your preferred indentation style.',
    seoTitle: 'JSON Beautifier Online — Pretty Print & Format | JSONCraft',
    seoDescription: 'Beautify JSON online with syntax highlighting. Format and color-code your JSON for easy reading. Free, fast, and private.',
    keywords: ['json beautifier', 'json pretty print', 'json format', 'json color'],
    icon: '✦',
    relatedTools: ['json-formatter', 'json-validator', 'json-minifier'],
  },
];

export function getToolBySlug(slug: string): ToolMeta | undefined {
  return tools.find((t) => t.slug === slug);
}

export function getRelatedTools(slug: string): ToolMeta[] {
  const tool = getToolBySlug(slug);
  if (!tool) return [];
  return tool.relatedTools.map((s) => getToolBySlug(s)).filter(Boolean) as ToolMeta[];
}

export const guides = [
  {
    title: 'How to Format JSON: A Complete Guide',
    slug: 'how-to-format-json',
    description: 'Learn the best ways to format JSON data for readability, debugging, and production use.',
  },
  {
    title: 'Common JSON Errors and How to Fix Them',
    slug: 'common-json-errors',
    description: 'Identify and resolve the most frequent JSON syntax errors developers encounter.',
  },
];
