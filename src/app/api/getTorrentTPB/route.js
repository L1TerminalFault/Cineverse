import {
  thepiratebayUrl,
  tpbMovieCategories,
  tpbTVCategories,
} from "@/lib/utils";

export const GET = async (req) => {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("q");
  const type = searchParams.get("type");

  try {
    const response = await (await fetch(thepiratebayUrl(query))).json();
    console.log("all the responses ", response);
    let filtered_response;
    if (response[0].name === "No results returned" && response[0].id === "0")
      filtered_response = [];
    else {
      filtered_response = response;
      filtered_response = response.filter((each) =>
        type === "movies"
          ? tpbMovieCategories.includes(each.category)
          : tpbTVCategories.includes(each.category),
      );
    }
    console.log(filtered_response);
    return Response.json({ ok: true, response: filtered_response });
  } catch (error) {
    console.log(`Error: ${error}`);
    return Response.json({ ok: false, error });
  }
};

/*
 100: Audio
   101: Music
   102: Audio Books
   103: Sound Clips
   104: FLAC
   199: Other Audio
 200: Video
   201: Movies
   202: Movies DVDR
   203: Music Videos
   204: Movie Clips
   205: TV Shows
   206: Handheld
   207: HD - Movies
   208: HD - TV Shows
   209: 3D
   299: Other Video
 300: Applications
   301: Windows
   302: Mac
   303: UNIX
   304: Handheld
   305: IOS (iPad/iPhone)
   306: Android
   399: Other OS
 400: Games
   401: PC
   402: Mac
   403: PSx
   404: XBOX360
   405: Wii
   406: Handheld
   407: IOS (iPad/iPhone)
   408: Android
   499: Other Games
 500: Porn
   501: Movies
   502: Movies DVDR
   503: Pictures
   504: Games
   505: HD - Movies
   506: Movie Clips
   599: Other Porn
 600: Other
   601: E-books
   602: Comics
   603: Pictures
   604: Covers
   605: Physibles
   699: Other Other
*/
