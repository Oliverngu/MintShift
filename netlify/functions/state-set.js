import { getStore } from "@netlify/blobs";

const cors = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "POST, OPTIONS",
  "access-control-allow-headers": "Content-Type",
};

export default async (request) => {
  const method = request.method;
  if (method === "OPTIONS") return new Response(null, { status: 204, headers: cors });
  if (method !== "POST")    return new Response("Use POST", { status: 405, headers: cors });

  const bodyText = await request.text();                 // Next-gen kompatibilis
  await getStore("mintshift").set("state.json", bodyText || "{}");

  return new Response("OK", { status: 200, headers: cors });
};
