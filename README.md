# Workout Log Platform

Workout Log Platform is a FitLog-branded fitness management and workout tracking product. Its goal is to help users log training quickly, understand recent progress, and review training volume, PRs, and exercise history without turning each workout into heavy data entry.

The MVP specification, user flow, API I/O, and data model live in `docs/harness/product-specs/workout-logging-mvp.md`.

## Current Status

This repository is a Next.js App Router project with FitLog authentication screens and a repo-local agent harness. Core workout logging features, backend APIs, auth provider integration, database schema, and persistence are not implemented yet.

Implemented routes:

| Route | Purpose |
| --- | --- |
| `/` | Sign in screen. |
| `/sign-up` | Sign up screen. |
| `/forgot-password` | Forgot password screen. |
| `/forgot-password/sent` | Forgot password success screen. |
| `/reset-password` | Reset password screen. |
| `/reset-password/success` | Reset password success screen. |
| `/email-verify` | Email verification prompt screen. |
| `/email-verify/success` | Email verification success screen. |

## Tech Stack

- Next.js App Router
- React
- TypeScript
- Tailwind CSS
- ESLint
- npm

## Development

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Default local URL:

```text
http://localhost:3000
```

Build the production bundle:

```bash
npm run build
```

Start the production server:

```bash
npm run start
```

## Common Commands

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the Next.js development server. |
| `npm run lint` | Run ESLint. |
| `npm run build` | Build the production bundle. |
| `npm run harness:init -- "goal"` | Create a new active execution plan. |
| `npm run harness:status` | Show active and completed plan status. |
| `npm run harness:check` | Check required harness files, sections, and rules. |

## Project Structure

```text
src/app/                         Next.js routes
src/components/                  Flow-level UI components
src/styles/                      Design tokens and base styles
public/assets/figma/             Brand and icon assets exported from Figma
docs/harness/                    Trackable product, architecture, quality, and planning docs for agents
docs/harness/product-specs/      Product specs, user flows, API I/O, and data models
harness/                         Agent prompts, templates, and config
scripts/harness.mjs              Harness CLI
Design.md                        Figma design system summary
Preview.html                     Static design system preview
```

## Agent Harness

Agents should start with `AGENTS.md`, then read the relevant files under `docs/harness/`.

Main entry points:

- `docs/harness/README.md`: harness design and usage.
- `docs/harness/PRODUCT.md`: product intent, domain language, and open questions.
- `docs/harness/ARCHITECTURE.md`: current architecture, boundaries, and agent notes.
- `docs/harness/QUALITY.md`: evaluation standards and hard gates.
- `docs/harness/RELIABILITY.md`: required verification commands.
- `docs/harness/PLANS.md`: active and completed plan lifecycle.

Product flows, API I/O, and data models should live only in `docs/harness/product-specs/`. Other docs should summarize or link to those specs instead of duplicating them.

## Verification

Before finishing non-trivial work, run:

```bash
npm run harness:check
npm run lint
npm run build
```

If the change affects UI, also start the app and verify the affected flow in a browser.

## Privacy And Version Control

Product data under `docs/` is private by default and remains untracked unless explicitly requested. Trackable agent knowledge belongs under `docs/harness/`. New product specs, architecture decisions, QA reports, and handoffs should use the harness-defined locations.
