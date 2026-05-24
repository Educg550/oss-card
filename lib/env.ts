function required(key: string): string {
  const v = process.env[key];
  if (!v) throw new Error(`Missing env: ${key}`);
  return v;
}

export const env = {
  get githubToken(): string {
    return required("GITHUB_TOKEN");
  },
};
