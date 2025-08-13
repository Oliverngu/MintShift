import { getStore } from "@netlify/blobs";

export default async (event) => {
  try {
    if (event.method && event.method !== "POST") {
      return new Response("Use POST", { status: 405, headers: { "access-control-allow-origin": "*" } });
    }

    const bodyText = typeof event.text === "function"
      ? await event.text()
      : event.body || "{}";

    const store = getStore("mintshift");
    await store.set("state.json", bodyText);

    return new Response("OK", { status: 200, headers: { "access-control-allow-origin": "*" } });
  } catch (e) {
    return new Response("Save failed", { status: 500, headers: { "access-control-allow-origin": "*" } });
  }
};