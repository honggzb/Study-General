---
name: browser-summary
description: Browses a webpage and summarizes it into a 'goodsample' markdown file following the React Patterns format. Use when the user asks to summarize a webpage, specifically to generate a 'goodsample' or patterns file.
---

# Browser Summary

## Overview

This skill allows Claude to browse a webpage and condense its content into a structured Markdown summary that follows a specific "React Patterns" format. The output is saved to a file named `goodsample` (or `goodsample.md`).

## Workflow

1.  **Read Content**: When a URL is provided, use the available browsing or content reading tools (e.g., `read_url_content`, `read_browser_page`) to retrieve the full text of the page.
2.  **Analyze**: innovative and extract key information relevant to the sections defined in the output template.
3.  **Generate Output**: Create a new file named `goodsample.md` (or `goodsample` if requested without extension, but prefer .md).
4.  **Format**: The content of `goodsample.md` MUST differ to the structure defined in [react_patterns_template.md](references/react_patterns_template.md).

## Output Format

The output must strictly follow the headings and structure of the reference template.

- **Overview**: High-level summary.
- **Patterns and Practices**: Detailed patterns found in the content.
- **Guidelines**: Code organization, performance, security, etc.
- **Common Patterns**: recurring themes.
- **Anti-Patterns**: What to avoid.
- **Tools and Resources**: Linked tools or libraries.
- **Conclusion**: Final thoughts.

See [react_patterns_template.md](references/react_patterns_template.md) for the exact structure.
