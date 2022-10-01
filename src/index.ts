import { env } from "./env";
import { octokit } from "./octokit";

async function main() {
  console.log({ env });

  const issues = await octokit.paginate(octokit.rest.issues.listForRepo, {
    owner: env.GITHUB_REPOSITORY_OWNER,
    repo: env.GITHUB_REPOSITORY.replace(`${env.GITHUB_REPOSITORY_OWNER}/`, ""),
    state: "open",
  });
  // console.log({ issues });

  for (const issue of issues) {
    //
  }
}

main();
