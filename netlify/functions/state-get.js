     import { getStore } from "@netlify/blobs";

export default async () => {
  const data = await getStore("mintshift").get("state.json");
  return new Response(data ?? "{}", {
    status: 200,
    headers: {
      "content-type": "application/json",
      "access-control-allow-origin": "*",
    },
  });
};
