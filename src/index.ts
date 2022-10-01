import { env } from "./env";
import { octokit } from "./octokit";

async function main() {
  console.log({ env });
  console.log("prpoc", process.env);

  const issues = await octokit.paginate(octokit.rest.issues.listForRepo, {
    owner: "lawrencecchen",
    repo: "ghwatch",
    state: "open",
  });
  // console.log({ issues });

  for (const issue of issues) {
    //
  }
}

main();
