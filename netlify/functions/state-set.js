import { getStore } from "@netlify/blobs";

export default async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Use POST" };
  }
  const store = getStore("mintshift");
  const body = event.body || "{}";
  await store.set("state.json", body);
  return {
    statusCode: 200,
    headers: { "access-control-allow-origin": "*" },
    body: "OK"
  };
};
