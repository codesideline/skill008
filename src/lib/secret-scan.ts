// Secret scanning utility
// Blocks any content that looks like it contains credentials

const SECRET_PATTERNS = [
  // API keys
  /(?:api[_-]?key|apikey)\s*[:=]\s*['"]?[a-zA-Z0-9_\-]{20,}/gi,
  // Bearer tokens
  /bearer\s+[a-zA-Z0-9_\-\.]{20,}/gi,
  // AWS keys
  /AKIA[0-9A-Z]{16}/g,
  // Private keys
  /-----BEGIN (?:RSA |EC |DSA )?PRIVATE KEY-----/g,
  // Connection strings with passwords
  /(?:postgres|mysql|mongodb|redis):\/\/[^:]+:[^@]+@/gi,
  // Generic secrets
  /(?:secret|password|passwd|token|auth)\s*[:=]\s*['"]?[^\s'"]{8,}/gi,
  // Supabase service role keys
  /sbp_[a-zA-Z0-9]{30,}/g,
  // Anthropic keys
  /sk-ant-[a-zA-Z0-9_\-]{20,}/g,
  // OpenAI keys
  /sk-[a-zA-Z0-9]{20,}/g,
  // GitHub tokens
  /gh[ps]_[a-zA-Z0-9]{36,}/g,
  // Auth headers
  /authorization\s*:\s*['"]?(?:bearer|basic|token)\s+[^\s'"]+/gi,
  // Cookies with session data
  /(?:session|csrf|xsrf)[_-]?(?:id|token|key)\s*[:=]\s*['"]?[a-zA-Z0-9_\-]{16,}/gi,
];

export interface ScanResult {
  passed: boolean;
  findings: string[];
}

export function scanForSecrets(content: string): ScanResult {
  const findings: string[] = [];

  for (const pattern of SECRET_PATTERNS) {
    // Reset lastIndex for global patterns
    pattern.lastIndex = 0;
    const matches = content.match(pattern);
    if (matches) {
      for (const match of matches) {
        // Truncate the finding for display
        const truncated = match.length > 40 ? match.slice(0, 40) + "..." : match;
        findings.push(truncated);
      }
    }
  }

  return {
    passed: findings.length === 0,
    findings,
  };
}

// Scan structured JSON for secrets
export function scanObjectForSecrets(obj: unknown): ScanResult {
  const serialized = JSON.stringify(obj);
  return scanForSecrets(serialized);
}
