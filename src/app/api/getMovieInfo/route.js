import { endpoint } from "@/lib/utils"

export const GET = async () => {
  const { searchParams } = new URL(req.url)
  const movieId = searchParams.get('id')

  try {
    const response = await (await fetch(endpoint(`/movie/${movieId}`))).json()
    console.log(response)
    return Response.json({ ok: true, response })
  } catch (error) {
    console.log(`Error: ${error}`)
    return Response.json({ ok: false, error })
  }
}
