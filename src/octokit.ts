import { Octokit, App } from "octokit";
import { env } from "./env";

export const octokit = new Octokit({ auth: env.GH_TOKEN });
