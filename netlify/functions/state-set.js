import { getStore } from "@netlify/blobs";

const cors = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "POST, OPTIONS",
  "access-control-allow-headers": "Content-Type",
};

export default async (input) => {
  const method = input?.method || input?.httpMethod;
  if (method === "OPTIONS") return new Response(null, { status: 204, headers: cors });
  if (method !== "POST")   return new Response("Use POST", { status: 405, headers: cors });

  let bodyText = "{}";
  try {
    if (typeof input?.text === "function") {
      bodyText = await input.text();              // Next-gen (Request)
    } else if (typeof input?.body === "string") {
      bodyText = input.body;                      // Node (event.body)
    } else if (input?.request && typeof input.request.text === "function") {
      bodyText = await input.request.text();      // fallback
    }
  } catch {}

  await getStore("mintshift").set("state.json", bodyText);
  return new Response("OK", { status: 200, headers: cors });
};
