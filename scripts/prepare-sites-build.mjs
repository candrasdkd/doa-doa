import { cp, mkdir, readdir, rename, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const projectRoot = process.cwd();
const distDirectory = resolve(projectRoot, 'dist');
const clientDirectory = resolve(distDirectory, 'client');
const serverDirectory = resolve(distDirectory, 'server');
const metadataDirectory = resolve(distDirectory, '.openai');

await mkdir(clientDirectory, { recursive: true });

for (const entry of await readdir(distDirectory, { withFileTypes: true })) {
  if (['client', 'server', '.openai'].includes(entry.name)) continue;
  await rename(resolve(distDirectory, entry.name), resolve(clientDirectory, entry.name));
}

await mkdir(serverDirectory, { recursive: true });
await mkdir(metadataDirectory, { recursive: true });
await cp(
  resolve(projectRoot, '.openai', 'hosting.json'),
  resolve(metadataDirectory, 'hosting.json'),
);

await writeFile(
  resolve(serverDirectory, 'index.js'),
  `export default {
  async fetch(request, env) {
    const response = await env.ASSETS.fetch(request);
    if (response.status !== 404 || request.method !== "GET") return response;

    const acceptsHtml = request.headers.get("accept")?.includes("text/html");
    if (!acceptsHtml) return response;

    const indexUrl = new URL("/index.html", request.url);
    return env.ASSETS.fetch(new Request(indexUrl, request));
  },
};
`,
);
