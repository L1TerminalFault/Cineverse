import { endpoint } from "@/lib/utils";

export const GET = async () => {
  try {
    const response = await (await fetch(endpoint("/tv/on_the_air"))).json();
    console.log(response);
    return Response.json({ ok: true, response });
  } catch (error) {
    console.log(`Error: ${error}`);
    return Response.json(error);
  }
};
