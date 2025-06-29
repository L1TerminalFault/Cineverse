import { endpoint } from "@/lib/utils";

export const GET = async (req) => {
  const { searchParams } = new URL(req.url)
  const query = searchParams.get('query')

  try {
    const response = await (await fetch(endpoint(`/search/movie?query=${query}`))).json()
    console.log(response)
    return Response.json({ ok: true, response })
  } catch (error) {
    console.log(`Error: ${error}`)
    return Response.json({ ok: false, error })
  }
}