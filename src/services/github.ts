import axios from "axios";

export const GitHubUsername = "S24HV";

const githubToken = import.meta.env.VITE_GITHUB_TOKEN;

const githubHeaders = githubToken
  ? { Authorization: `Bearer ${githubToken}` }
  : {};

export interface IRepo {
  id: number;
  name: string;
  html_url: string;
  language: string;
  description?: string;
  languages?: string[];
  readme?: string;
}

export async function getAllRepos(): Promise<IRepo[]> {
  const res = await axios.get(
    `https://api.github.com/users/${GitHubUsername}/repos`,
    { headers: githubHeaders }
  );
  return res.data;
}

/**
 * Returns every language GitHub detected in the repo, ordered by
 * amount of code (bytes), most-used first.
 */
export async function getRepoLanguages(repo: string): Promise<string[]> {
  try {
    const res = await axios.get(
      `https://api.github.com/repos/${GitHubUsername}/${repo}/languages`,
      { headers: githubHeaders }
    );
    const bytesByLanguage = res.data as Record<string, number>;
    return Object.entries(bytesByLanguage)
      .sort((a, b) => b[1] - a[1])
      .map(([language]) => language);
  } catch {
    return [];
  }
}

/**
 * Returns the raw text of the repo's README (markdown source, not
 * rendered HTML), or an empty string if the repo has none.
 */
export async function getRepoReadme(repo: string): Promise<string> {
  try {
    const res = await axios.get(
      `https://api.github.com/repos/${GitHubUsername}/${repo}/readme`,
      {
        headers: {
          ...githubHeaders,
          Accept: "application/vnd.github.raw",
        },
      }
    );
    return typeof res.data === "string" ? res.data : "";
  } catch {
    return "";
  }
}

/**
 * GitHub auto-generates a social-preview screenshot for every public
 * repo — no need to keep a preview.jpg committed in each project.
 */
export function getRepoScreenshotUrl(repo: string): string {
  return `https://opengraph.githubassets.com/1/${GitHubUsername}/${repo}`;
}
