import { getStore } from "@netlify/blobs";

export default async () => {
  try {
    const store = getStore("mintshift");
    const data = await store.get("state.json");   // string vagy null
    const body = data ?? "{}";
    return new Response(body, {
      status: 200,
      headers: {
        "content-type": "application/json",
        "access-control-allow-origin": "*",
      },
    });
  } catch {
    return new Response(JSON.stringify({ error: "get_failed" }), {
      status: 500,
      headers: {
        "content-type": "application/json",
        "access-control-allow-origin": "*",
      },
    });
  }
};