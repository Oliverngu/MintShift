import { getStore } from "@netlify/blobs";

const cors = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "POST, OPTIONS",
  "access-control-allow-headers": "Content-Type",
};

export default async (request) => {
  if (request.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: cors });
  }
  if (request.method !== "POST") {
    return new Response("Use POST", { status: 405, headers: cors });
  }

  const data = await request.text();  
  await getStore("mintshift").set("state.json", data || "{}");

  return new Response("OK", { status: 200, headers: cors });
};
