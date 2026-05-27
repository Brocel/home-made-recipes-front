---
agent: 'agent'
name: 'generate-i18n'
description: 'Generate translation keys and i18n wiring for an Angular feature'
---

Analyze the requested feature, file, or folder and generate the required translation keys and i18n wiring.

Context:

- Target feature / file / folder: ${input:target:Which feature, file, or folder should be analyzed?}
- Scope: ${input:scope:What should be translated? }
- Existing translation files: ${input:files:Which translation files should be updated?}
- Notes or constraints: ${input:constraints:Any rules, naming conventions, or special cases to respect?}

Requirements:

- Follow the repository i18n conventions.
- Use the i18n json files in public/assets/i18n/ for FR<->BR translations.
- Analyse the logic in the i18n json files to understand the existing structure and keys.
- Create new entries in i18n json files only if needed, otherwise reuse existing keys.
- Ensure that every user-facing text (template text, labels, errors, placeholders, alerts, etc.) has a corresponding translation key.
- Do not hardcode user-facing text in templates or components if a translation key should be used.
- Prefer clear, feature-scoped translation namespaces.
- Reuse existing keys when appropriate instead of duplicating similar text.
- Keep the translation structure consistent across locales.
- Include missing keys for:
  - titles
  - labels
  - placeholders
  - validation messages
  - empty states
  - loading states
  - error states
  - actions / buttons
- If the current i18n setup is unclear, state the missing information before proposing changes.
- Preserve accessibility and meaning in translated text.
- Avoid generating unnecessary keys.

Output:

1. i18n diagnosis
2. Optimization of i18n json files structure if needed
3. Translation key proposal
4. Changes needed in templates / components
5. Updated translation entries per locale
6. Missing context or risks
