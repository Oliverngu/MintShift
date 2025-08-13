import { getStore } from "@netlify/blobs";
export default async ()=> {
  try{
    const data = await getStore("mintshift").get("state.json");
    return new Response(data ?? "{}", {status:200, headers:{"content-type":"application/json","access-control-allow-origin":"*"}});
  }catch{
    return new Response(JSON.stringify({error:"get_failed"}), {status:500, headers:{"content-type":"application/json","access-control-allow-origin":"*"}});
  }
};