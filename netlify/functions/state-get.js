import { getStore } from "@netlify/blobs";

export default async () => {
  const store = getStore("mintshift");
  const data = await store.get("state.json");
  return {
    statusCode: 200,
    headers: {
      "content-type": "application/json",
      "access-control-allow-origin": "*"
    },
    body: data || "{}"
  };
};
