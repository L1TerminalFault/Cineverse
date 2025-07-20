import { endpoint } from "@/lib/utils";

export const GET = async (req) => {
  const params = req.url.split("?")[1];

  try {
    const response = await (
      await fetch(endpoint(`/trending/movie/day?${params}`))
    ).json();

    console.log(response);
    return Response.json({ ok: true, response });
  } catch (error) {
    console.log(`Error: ${error}`);
    return Response.json(error);
  }
};
