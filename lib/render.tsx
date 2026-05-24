import { readFile } from "node:fs/promises";
import path from "node:path";
import satori from "satori";
import { themes } from "./themes";
import type { CardProps, RepoData } from "./types";

const WIDTH = 495;

async function loadFonts() {
  const dir = path.join(process.cwd(), "public", "fonts");
  const [regular, bold] = await Promise.all([
    readFile(path.join(dir, "Inter_18pt-Regular.ttf")),
    readFile(path.join(dir, "Inter_18pt-Bold.ttf")),
  ]);
  return [
    {
      name: "Inter",
      data: regular,
      weight: 400 as const,
      style: "normal" as const,
    },
    {
      name: "Inter",
      data: bold,
      weight: 700 as const,
      style: "normal" as const,
    },
  ];
}

function formatStars(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`;
  return String(n);
}

function RepoRow({
  repo,
  maxStars,
  accent,
  text,
  bar,
}: {
  repo: RepoData;
  maxStars: number;
  accent: string;
  text: string;
  bar: string;
}) {
  const fill = maxStars > 0 ? Math.max(0.05, repo.stars / maxStars) : 0;
  return (
    <div style={{ display: "flex", flexDirection: "column", marginBottom: 14 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: 13,
        }}
      >
        <span style={{ color: accent, fontWeight: 700 }}>{repo.slug}</span>
        <span style={{ color: text }}>
          ★ {formatStars(repo.stars)} {repo.license?.toUpperCase() ?? "—"}
        </span>
      </div>
      <div
        style={{
          display: "flex",
          height: 4,
          background: bar,
          borderRadius: 2,
          marginTop: 4,
        }}
      >
        <div
          style={{
            width: `${fill * 100}%`,
            background: accent,
            borderRadius: 2,
          }}
        />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: 11,
          color: text,
          marginTop: 4,
        }}
      >
        <span>{repo.language ?? "—"}</span>
        <span>
          👥 {formatStars(repo.contributors)} ↗ {repo.prCount}
        </span>
      </div>
    </div>
  );
}

export async function renderCard(props: CardProps): Promise<string> {
  const t = themes[props.theme];
  const maxStars = props.repos.reduce((m, r) => Math.max(m, r.stars), 0);
  const height = 90 + props.repos.length * 56;
  const fonts = await loadFonts();

  return satori(
    <div
      style={{
        width: WIDTH,
        height,
        display: "flex",
        flexDirection: "column",
        background: t.background,
        padding: 20,
        fontFamily: "Inter",
        color: t.text,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          color: t.title,
          fontSize: 14,
          fontWeight: 700,
        }}
      >
        ◈ OSS Contributions · @{props.username}
      </div>
      <div
        style={{
          display: "flex",
          height: 1,
          background: t.bar,
          margin: "10px 0",
        }}
      />
      <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
        {props.repos.map((r) => (
          <RepoRow
            key={r.slug}
            repo={r}
            maxStars={maxStars}
            accent={t.accent}
            text={t.text}
            bar={t.bar}
          />
        ))}
      </div>
      <div
        style={{
          display: "flex",
          height: 1,
          background: t.bar,
          margin: "6px 0",
        }}
      />
      <div style={{ display: "flex", fontSize: 11, color: t.text }}>
        {props.totalRepos} repos · {props.totalPrs} PRs merged
      </div>
    </div>,
    { width: WIDTH, height, fonts },
  );
}
