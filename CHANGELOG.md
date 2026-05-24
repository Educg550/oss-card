# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Initial project scaffold (Next.js 15, TypeScript, Biome).
- `GET /api?username=<login>` returns an SVG card of a user's upstream OSS contributions.
- Query params: `theme` (dark/light/monokai), `limit` (1–10), `sort` (stars/forks/contributors), `license` (SPDX id / all).
- Error states (missing/invalid username, 404, rate-limited, internal) return SVG with a readable message.
- Edge cache: `s-maxage=3600, stale-while-revalidate=86400`.
