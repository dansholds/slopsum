/**
 * Jest tests for "TypeScript Best Practices" documentation.
 *
 * Test runner: Jest
 *
 * These tests validate structure and critical contents of the instructions document.
 * They focus on the following sections and bullets (from the PR diff):
 * - # TypeScript Best Practices
 *   ## Type System
 *   ## Naming Conventions
 *   ## Code Organization
 *   ## Functions
 *   ## Best Practices
 *   ## Error Handling
 *   ## Patterns
 *
 * If the repository uses a different test runner (e.g., Vitest/Mocha),
 * consider minor adjustments to the import/assertion APIs.
 */

const fs = require('fs');
const path = require('path');

const expected = {
  heading: /^#\s*TypeScript Best Practices\s*$/m,
  sections: [
    {
      title: /^##\s*Type System\s*$/m,
      bullets: [
        /Prefer interfaces over types for object definitions/,
        /Use type for unions, intersections, and mapped types/,
        /Avoid using `any`, prefer `unknown` for unknown types/,
        /Use strict TypeScript configuration/,
        /Leverage TypeScript's built-in utility types/,
        /Use generics for reusable type patterns/,
      ],
    },
    {
      title: /^##\s*Naming Conventions\s*$/m,
      bullets: [
        /Use PascalCase for type names and interfaces/,
        /Use camelCase for variables and functions/,
        /Use UPPER_CASE for constants/,
        /Use descriptive names with auxiliary verbs \(e\.g\., isLoading, hasError\)/,
        /Prefix interfaces for React props with 'Props' \(e\.g\., ButtonProps\)/,
      ],
    },
    {
      title: /^##\s*Code Organization\s*$/m,
      bullets: [
        /Keep type definitions close to where they're used/,
        /Export types and interfaces from dedicated type files when shared/,
        /Use barrel exports \(index\.ts\) for organizing exports/,
        /Place shared types in a `types` directory/,
        /Co-locate component props with their components/,
      ],
    },
    {
      title: /^##\s*Functions\s*$/m,
      bullets: [
        /Use explicit return types for public functions/,
        /Use arrow functions for callbacks and methods/,
        /Implement proper error handling with custom error types/,
        /Use function overloads for complex type scenarios/,
        /Prefer async\/await over Promises/,
      ],
    },
    {
      title: /^##\s*Best Practices\s*$/m,
      bullets: [
        /Enable strict mode in tsconfig\.json/,
        /Use readonly for immutable properties/,
        /Leverage discriminated unions for type safety/,
        /Use type guards for runtime type checking/,
        /Implement proper null checking/,
        /Avoid type assertions unless necessary/,
      ],
    },
    {
      title: /^##\s*Error Handling\s*$/m,
      bullets: [
        /Create custom error types for domain-specific errors/,
        /Use Result types for operations that can fail/,
        /Implement proper error boundaries/,
        /Use try-catch blocks with typed catch clauses/,
        /Handle Promise rejections properly/,
      ],
    },
    {
      title: /^##\s*Patterns\s*$/m,
      bullets: [
        /Use the Builder pattern for complex object creation/,
        /Implement the Repository pattern for data access/,
        /Use the Factory pattern for object creation/,
        /Leverage dependency injection/,
        /Use the Module pattern for encapsulation/,
      ],
    },
  ],
};

function loadDoc() {
  // Resolve path from env injected by the script or default to README.md
  const injectedPath = process.env.COPILOT_INSTRUCTIONS_PATH || 'README.md';
  const candidatePaths = [
    injectedPath,
    path.join(process.cwd(), injectedPath),
  ];

  for (const p of candidatePaths) {
    try {
      if (fs.existsSync(p)) {
        return { content: fs.readFileSync(p, 'utf8'), pathUsed: p };
      }
    } catch (_) {
      // ignore
    }
  }

  // Fallback: attempt to discover by scanning repo for the unique heading
  try {
    const { execSync } = require('child_process');
    const out = execSync("rg -l -H '^\\s*#\\s*TypeScript Best Practices\\s*$' -g '!**/node_modules/**' -g '!**/dist/**' -g '!**/build/**'", { stdio: ['ignore', 'pipe', 'ignore'] }).toString();
    const first = out.split('\n').filter(Boolean)[0];
    if (first && fs.existsSync(first)) {
      return { content: fs.readFileSync(first, 'utf8'), pathUsed: first };
    }
  } catch (_) {
    // ignore
  }

  // Final fallback: empty content to trigger helpful failure
  return { content: '', pathUsed: injectedPath };
}

describe('TypeScript Best Practices documentation', () => {
  let doc;
  let pathUsed;

  beforeAll(() => {
    const loaded = loadDoc();
    doc = loaded.content;
    pathUsed = loaded.pathUsed;
  });

  it('should load the documentation file successfully', () => {
    expect(typeof doc).toBe('string');
    expect(doc.length).toBeGreaterThan(0);
  });

  it('should contain the main heading exactly once', () => {
    const matches = doc.match(new RegExp(expected.heading, 'gm')) || [];
    expect(matches.length).toBe(1);
  });

  it('should include all expected sections in the correct order', () => {
    const indices = [];
    expected.sections.forEach(({ title }) => {
      const m = doc.match(title);
      expect(m).not.toBeNull();
      const idx = doc.search(title);
      indices.push(idx);
      expect(idx).toBeGreaterThanOrEqual(0);
    });
    // Verify non-decreasing order (strictly increasing since sections shouldn’t overlap)
    for (let i = 1; i < indices.length; i++) {
      expect(indices[i]).toBeGreaterThan(indices[i - 1]);
    }
  });

  describe('section bullets presence and formatting', () => {
    for (const section of expected.sections) {
      const title = section.title;
      const bullets = section.bullets;

      it(`should contain all bullets under ${title.source}`, () => {
        // Extract the section block between current title and next title (or end)
        const startIdx = doc.search(title);
        expect(startIdx).toBeGreaterThanOrEqual(0);

        // Find next section header position
        const nextHeaderRegex = /^##\s+/gm;
        nextHeaderRegex.lastIndex = startIdx + 1;
        let nextIdx = -1;
        let m;
        while ((m = nextHeaderRegex.exec(doc)) !== null) {
          if (m.index > startIdx) {
            nextIdx = m.index;
            break;
          }
        }
        const sectionBlock = doc.slice(startIdx, nextIdx === -1 ? doc.length : nextIdx);

        // Each bullet should appear at least once in the section block
        for (const bullet of bullets) {
          const found = sectionBlock.match(bullet);
          expect(found).not.toBeNull();
        }
      });

      it(`should use list markers for bullets in ${title.source}`, () => {
        const startIdx = doc.search(title);
        const nextHeaderRegex = /^##\s+/gm;
        nextHeaderRegex.lastIndex = startIdx + 1;
        let nextIdx = -1;
        let m;
        while ((m = nextHeaderRegex.exec(doc)) !== null) {
          if (m.index > startIdx) {
            nextIdx = m.index;
            break;
          }
        }
        const sectionBlock = doc.slice(startIdx, nextIdx === -1 ? doc.length : nextIdx);

        // Check that section has at least N bullet lines starting with '-' (allow optional spaces)
        const lines = sectionBlock.split(/\r?\n/);
        const bulletLines = lines.filter(l => /^\s*-\s+/.test(l));
        // We require at least as many bullet lines as expected bullets (tolerates extra bullets)
        expect(bulletLines.length).toBeGreaterThanOrEqual((section.bullets || []).length);
      });
    }
  });

  it('should not contain duplicate bullets across the document (basic dedup check by line)', () => {
    const lineBullets = (doc.match(/^\s*-\s+.*$/gm) || []).map(s => s.trim());
    const seen = new Set();
    const dups = new Set();
    for (const b of lineBullets) {
      if (seen.has(b)) dups.add(b);
      seen.add(b);
    }
    expect(Array.from(dups)).toEqual([]);
  });

  it('should not include contradictory guidance (e.g., advocating use of any)', () => {
    // Ensure there is no bullet explicitly encouraging `any`
    const badPattern = /^\s*-\s+Use\s+`any`\b.*$/m;
    expect(badPattern.test(doc)).toBe(false);
  });

  it('should keep sections concise and not empty', () => {
    for (const { title } of expected.sections) {
      const startIdx = doc.search(title);
      expect(startIdx).toBeGreaterThanOrEqual(0);
      const nextHeaderRegex = /^##\s+/gm;
      nextHeaderRegex.lastIndex = startIdx + 1;
      let nextIdx = -1;
      let m;
      while ((m = nextHeaderRegex.exec(doc)) !== null) {
        if (m.index > startIdx) {
          nextIdx = m.index;
          break;
        }
      }
      const sectionBlock = doc.slice(startIdx, nextIdx === -1 ? doc.length : nextIdx).trim();
      // Section should have at least 3 lines (header + at least 2 content lines)
      const lineCount = sectionBlock.split(/\r?\n/).length;
      expect(lineCount).toBeGreaterThanOrEqual(3);
    }
  });

  it('reports the file path used (debug aid)', () => {
    expect(typeof pathUsed).toBe('string');
    expect(pathUsed.length).toBeGreaterThan(0);
  });
});

// Allow env injection of path from the shell script for stability
process.env.COPILOT_INSTRUCTIONS_PATH = process.env.COPILOT_INSTRUCTIONS_PATH || process.env.INSTRUCTIONS_PATH || (function() {
  // Injected by the shell script below
  return 'README.md';
})();