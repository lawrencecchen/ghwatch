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
  const commitHrefRegex = new RegExp(
    baseUrl.replace("https://github.com", "") + "/blob/([a-f0-9]{40})"
  );
  console.log({ commitHrefRegex });
  console.log(html);
  const commitHrefMatches = html.match(commitHrefRegex);
  console.log({ commitHrefMatches });
  const commitHref = html.match(commitHrefRegex)?.[0];
  console.log({ commitHref: html.match(commitHrefRegex) });
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

const foo = getCommitHash(
  "https://github.com/lawrencecchen/ghwatch/blob/main/README.md"
);
console.log({ foo });
