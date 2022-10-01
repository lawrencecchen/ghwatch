import { env } from "./env";
import { octokit } from "./octokit";

// console.log(env);
// octokit.rest.issues.get({
//   owner: "lawrencecchen",
//   repo: "octokit.js",
// })

async function main() {
  console.log({ env });

  const issues = await octokit.paginate(octokit.rest.issues.listForRepo, {
    owner: "lawrencecchen",
    repo: "ghwatch",
  });
  console.log({ issues });
}
