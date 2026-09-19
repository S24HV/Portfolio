const GitHubUsername = "S24HV";

const API = "https://api.github.com";
const REPOS_CACHE_KEY = "s24hv-github-repos-v2";
const STATS_CACHE_KEY = "s24hv-github-stats-v2";
const CACHE_TTL = 1000 * 60 * 30;

const headers: HeadersInit = {
  Accept: "application/vnd.github+json",
  "X-GitHub-Api-Version": "2022-11-28",
};

export interface IRepo {
  id: number;
  name: string;
  html_url: string;
  language: string | null;
  description: string | null;
  languages?: string[];
  readme?: string;
  stargazers_count?: number;
  forks_count?: number;
  updated_at?: string;
  homepage?: string | null;
}

export interface IGitHubStats {
  followers: number;
  following: number;
  public_repos: number;
  total_stars: number;
  total_forks: number;
}

interface CacheItem<T> {
  timestamp: number;
  data: T;
}

const readCache = <T,>(key: string): T | null => {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return null;

    const cached = JSON.parse(raw) as CacheItem<T>;

    if (Date.now() - cached.timestamp > CACHE_TTL) {
      return null;
    }

    return cached.data;
  } catch {
    return null;
  }
};

const writeCache = <T,>(key: string, data: T) => {
  try {
    const item: CacheItem<T> = {
      timestamp: Date.now(),
      data,
    };

    localStorage.setItem(key, JSON.stringify(item));
  } catch {
  }
};

async function githubRequest<T>(url: string): Promise<T> {
  const response = await fetch(url, {
    method: "GET",
    headers,
  });

  if (!response.ok) {
    throw new Error(`GitHub API ${response.status}`);
  }

  return response.json() as Promise<T>;
}

export async function getAllRepos(): Promise<IRepo[]> {
  const cached = readCache<IRepo[]>(REPOS_CACHE_KEY);

  try {
    const repos = await githubRequest<IRepo[]>(
      `${API}/users/${GitHubUsername}/repos?per_page=100&sort=updated&direction=desc&type=owner`
    );

    writeCache(REPOS_CACHE_KEY, repos);
    return repos;
  } catch {
    if (cached) return cached;
    throw new Error("GitHub repositories are temporarily unavailable");
  }
}

export async function getGitHubStats(
  repos: IRepo[]
): Promise<IGitHubStats> {
  const cached = readCache<IGitHubStats>(STATS_CACHE_KEY);

  try {
    const profile = await githubRequest<{
      followers: number;
      following: number;
      public_repos: number;
    }>(`${API}/users/${GitHubUsername}`);

    const stats: IGitHubStats = {
      followers: profile.followers,
      following: profile.following,
      public_repos: profile.public_repos,
      total_stars: repos.reduce(
        (sum, repo) => sum + (repo.stargazers_count ?? 0),
        0
      ),
      total_forks: repos.reduce(
        (sum, repo) => sum + (repo.forks_count ?? 0),
        0
      ),
    };

    writeCache(STATS_CACHE_KEY, stats);
    return stats;
  } catch {
    if (cached) return cached;

    return {
      followers: 0,
      following: 0,
      public_repos: repos.length,
      total_stars: repos.reduce(
        (sum, repo) => sum + (repo.stargazers_count ?? 0),
        0
      ),
      total_forks: repos.reduce(
        (sum, repo) => sum + (repo.forks_count ?? 0),
        0
      ),
    };
  }
}

export async function getRepoReadme(repo: string): Promise<string> {
  try {
    const response = await fetch(
      `${API}/repos/${GitHubUsername}/${encodeURIComponent(repo)}/readme`,
      {
        headers: {
          ...headers,
          Accept: "application/vnd.github.raw",
        },
      }
    );

    if (!response.ok) return "";

    return response.text();
  } catch {
    return "";
  }
}

export function getRepoScreenshotUrl(repo: string): string {
  return `https://opengraph.githubassets.com/1/${GitHubUsername}/${encodeURIComponent(repo)}`;
}

export { GitHubUsername };
