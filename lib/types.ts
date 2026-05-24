export type ThemeName = "dark" | "light" | "monokai";

export type SortKey = "stars" | "forks" | "contributors";

export type RepoData = {
  slug: string; // "owner/name"
  url: string;
  description: string | null;
  stars: number;
  forks: number;
  language: string | null;
  license: string | null; // SPDX ID (lowercase) or null
  contributors: number;
  prCount: number;
};

export type Query = {
  username: string;
  theme: ThemeName;
  limit: number; // 1..10
  sort: SortKey;
  license: string; // "all" or SPDX id (lowercase)
};

export type CardProps = {
  username: string;
  repos: RepoData[];
  totalRepos: number;
  totalPrs: number;
  theme: ThemeName;
};
