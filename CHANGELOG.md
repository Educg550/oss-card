# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Fixed
- Card renderer now uses the static `Inter_18pt` TTFs; the previous variable Inter font crashed satori on every `/api` request.

## [0.1.0] - 2026-05-24

### Added
- Initial project scaffold (Next.js 15, TypeScript, Biome).
- `GET /api?username=<login>` returns an SVG card of a user's upstream OSS contributions.
- Query params: `theme` (dark/light/monokai), `limit` (1–10), `sort` (stars/forks/contributors), `license` (SPDX id / all).
- Error states (missing/invalid username, 404, rate-limited, internal) return SVG with a readable message.
- Edge cache: `s-maxage=3600, stale-while-revalidate=86400`.
- README with usage, options, self-hosting, and local dev instructions.
- Landing page (`/`) with live preview examples.
