import { thepiratebayUrl } from "@/lib/utils";

export const GET = async (req) => {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("q");

  try {
    const response = await (await fetch(thepiratebayUrl(query))).json();
    console.log(response);
    return Response.json({ ok: true, response });
  } catch (error) {
    console.log(`Error: ${error}`);
    return Response.json({ ok: false, error });
  }
};
