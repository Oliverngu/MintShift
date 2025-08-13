import { getStore } from "@netlify/blobs";

const cors = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "POST, OPTIONS",
  "access-control-allow-headers": "Content-Type"
};

export default async (event) => {
  // Edge + Node kompatibilis mezők
  const method = event.method || event.httpMethod;

  // Preflight
  if (method === "OPTIONS") {
    return new Response(null, { status: 204, headers: cors });
  }

  if (method !== "POST") {
    return new Response("Use POST", { status: 405, headers: cors });
  }

  try {
    const bodyText = typeof event.text === "function" ? await event.text() : (event.body || "{}");
    const store = getStore("mintshift");
    await store.set("state.json", bodyText);
    return new Response("OK", { status: 200, headers: cors });
  } catch (e) {
    return new Response("Save failed", { status: 500, headers: cors });
  }
};