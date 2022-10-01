import * as dotenv from "dotenv";
import z from "zod";
dotenv.config();

const envSchema = z.object({
  GH_TOKEN: z.string(),
  GITHUB_REPOSITORY_OWNER: z.string(),
  GITHUB_REPOSITORY: z.string(),
});

const _env = envSchema.safeParse(process.env);

if (!_env.success) {
  console.error("❌ Invalid environment variables:\n", _env.error.format());
  console.log("process", process.env);
  throw new Error("Invalid environment variables");
}

export const env = { ..._env.data };
