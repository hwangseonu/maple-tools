import { NEXON_API_URL, NEXON_API_TOKEN } from '$env/static/private';

export async function GET({url}) {
  const characterName = url.searchParams.get("character")
  if (!characterName) return new Response("Invalid character name", {status: 400})

  const ocId = await (await fetch(`${NEXON_API_URL}/maplestory/v1/id?character_name=${characterName}`, {
    method: 'GET',
    headers: {"x-nxopen-api-key": NEXON_API_TOKEN}
  })).json();

  const profile = await (await fetch(`${NEXON_API_URL}/maplestory/v1/character/basic?ocid=${ocId.ocid}`, {
    method: 'GET',
    headers: {"x-nxopen-api-key": NEXON_API_TOKEN}
  })).json()
  return new Response(profile.character_image)
}