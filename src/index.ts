import { env } from "./env";
import { octokit } from "./octokit";

// Returns either a commit hash from the url or from innerHTML.
async function getCommitHash(url: string) {
  const sha1Regex = /\b([a-f0-9]{40})\b/;
  const match = url.match(sha1Regex);
  if (match) {
    return match[0];
  }
  const html = await fetch(url).then((r) => r.text());
  const baseUrlRegex = /https:\/\/github\.com\/[^\/]+\/[^\/]+/gm;
  const baseUrl = url.match(baseUrlRegex)?.[0];
  if (!baseUrl) {
    console.error(`❌ Invalid github url (no base found): ${url}`);
    return null;
  }
  const commitHrefRegex = new RegExp(baseUrl + "/commit/" + /([a-f0-9]{40})/);
  console.log({ commitHrefRegex });
  const commitHref = html.match(commitHrefRegex)?.[0];
  if (!commitHref) {
    console.error(`❌ Invalid github url (no commit found): ${url}`);
    return null;
  }
  const commitHash = commitHref.match(sha1Regex)?.[0];
  if (!commitHash) {
    console.error(`❌ Invalid github url (no commit hash found): ${url}`);
    return null;
  }
  return commitHash;
}

async function main() {
  // console.log({ env });

  const issues = await octokit.paginate(octokit.rest.issues.listForRepo, {
    owner: env.GITHUB_REPOSITORY_OWNER,
    repo: env.GITHUB_REPOSITORY.replace(`${env.GITHUB_REPOSITORY_OWNER}/`, ""),
    state: "open",
  });
  // console.log({ issues });

  for (const issue of issues) {
    const commitHash = await getCommitHash(issue.title);
    if (!commitHash) {
      continue;
    }
    console.log({ commitHash });
  }
}

main();
