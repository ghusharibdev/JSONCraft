export interface JsonParseResult {
  valid: boolean;
  data?: unknown;
  error?: string;
  errorDetail?: string;
}

export interface JsonFormatOptions {
  indent: '2' | '4' | 'tab';
}

export function parseJson(input: string): JsonParseResult {
  if (!input.trim()) {
    return { valid: false, error: 'Input is empty', errorDetail: 'Please paste some JSON to process.' };
  }
  try {
    const data = JSON.parse(input);
    return { valid: true, data };
  } catch (e) {
    const msg = e instanceof Error ? e.message : 'Unknown parse error';
    const cleaned = msg.replace(/^JSON\.parse:\s*/, '');
    return {
      valid: false,
      error: 'Invalid JSON',
      errorDetail: cleaned,
    };
  }
}

export function formatJson(input: string, options: JsonFormatOptions = { indent: '2' }): JsonParseResult & { output?: string } {
  const parsed = parseJson(input);
  if (!parsed.valid) return parsed;
  const indentStr = options.indent === 'tab' ? '\t' : options.indent;
  try {
    const output = JSON.stringify(parsed.data, null, indentStr);
    return { ...parsed, output };
  } catch {
    return { valid: false, error: 'Format error', errorDetail: 'Could not serialize the parsed JSON.' };
  }
}

export function minifyJson(input: string): JsonParseResult & { output?: string } {
  const parsed = parseJson(input);
  if (!parsed.valid) return parsed;
  try {
    const output = JSON.stringify(parsed.data);
    return { ...parsed, output };
  } catch {
    return { valid: false, error: 'Minify error', errorDetail: 'Could not serialize the parsed JSON.' };
  }
}

export function beautifyJson(input: string, options: JsonFormatOptions = { indent: '2' }): JsonParseResult & { output?: string } {
  return formatJson(input, options);
}

export function getCharCount(text: string): number {
  return text.length;
}

export function getLineCount(text: string): number {
  if (!text) return 0;
  return text.split('\n').length;
}

export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    return true;
  } catch {
    return false;
  }
}

export function downloadJson(text: string, filename: string = 'data.json'): void {
  try {
    const blob = new Blob([text], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  } catch {
    // Silently fail if download not supported
  }
}

export function escapeHtml(str: string): string {
  const div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}
