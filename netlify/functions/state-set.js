import { getStore } from "@netlify/blobs";
const cors={ "access-control-allow-origin":"*", "access-control-allow-methods":"POST, OPTIONS", "access-control-allow-headers":"Content-Type" };
export default async (req)=>{
  const m=req.method;
  if(m==="OPTIONS") return new Response(null,{status:204,headers:cors});
  if(m!=="POST")    return new Response("Use POST",{status:405,headers:cors});
  const body=await req.text();
  await getStore("mintshift").set("state.json", body||"{}");
  return new Response("OK",{status:200,headers:cors});
};
