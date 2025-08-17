import { endpoint } from "@/lib/utils"

export const GET = async (req) => {
  const { searchParams } = new URL(req.url)
  const movieId = searchParams.get('id')
  const type = searchParams.get('type')

  const url = type === "trailer" ? `/movie/${movieId}/videos` : type === "info" ? `/movie/${movieId}/credits` : `/movie/${movieId}`

  try {
    const response = await (await fetch(endpoint(url))).json()
    console.log(response)
    return Response.json({ ok: true, response })
  } catch (error) {
    console.log(`Error: ${error}`)
    return Response.json({ ok: false, error })
  }
}
