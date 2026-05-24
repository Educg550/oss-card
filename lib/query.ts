import type { Query, SortKey, ThemeName } from "./types";

const THEMES: ThemeName[] = ["dark", "light", "monokai"];
const SORTS: SortKey[] = ["stars", "forks", "contributors"];
const USERNAME_RE = /^[a-zA-Z0-9](?:[a-zA-Z0-9]|-(?=[a-zA-Z0-9])){0,38}$/;

export class QueryError extends Error {
  constructor(
    public status: number,
    message: string,
  ) {
    super(message);
  }
}

export function parseQuery(params: URLSearchParams): Query {
  const username = params.get("username")?.trim() ?? "";
  if (!username) throw new QueryError(400, "Missing required parameter: username");
  if (!USERNAME_RE.test(username)) throw new QueryError(400, "Invalid username");

  const themeRaw = params.get("theme") ?? "dark";
  const theme = (THEMES as string[]).includes(themeRaw) ? (themeRaw as ThemeName) : "dark";

  const sortRaw = params.get("sort") ?? "stars";
  const sort = (SORTS as string[]).includes(sortRaw) ? (sortRaw as SortKey) : "stars";

  const limitRaw = Number.parseInt(params.get("limit") ?? "5", 10);
  const limit = Number.isFinite(limitRaw) ? Math.min(10, Math.max(1, limitRaw)) : 5;

  const license = (params.get("license") ?? "all").toLowerCase();

  return { username, theme, limit, sort, license };
}
