import axios from "axios";

export const GitHubUsername = "N-EXIT24";

export interface IRepo {
  id: number;
  name: string;
  html_url: string;
  language: string;
  description?: string;
  isImage?: boolean;
}

export async function getAllRepos(): Promise<IRepo[]> {
  const res = await axios.get(
    `https://api.github.com/users/${GitHubUsername}/repos`
  );
  return res.data;
}

export async function getRepoDescription(repo: string): Promise<string> {
  try {
    const res = await axios.get(
      `https://raw.githubusercontent.com/${GitHubUsername}/${repo}/master/README.md`
    );
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      return "Project without Description";
    }
    throw error;
  }
}

export async function isRepoImage(repo: string): Promise<boolean> {
  try {
    const res = await axios.get(
      `https://raw.githubusercontent.com/${GitHubUsername}/${repo}/master/preview.jpg`
    );
    return res.status !== 404;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      return false;
    }
    return false;
  }
}
