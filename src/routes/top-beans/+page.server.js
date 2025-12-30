import { client } from '$lib/sanity';

/** @type {import('./$types').PageServerLoad} */
export async function load() {
  const query = `*[_type == "pet"] {
      "images": [
        {
          "key": "main",
          "asset": image.asset,
          "upvotes": coalesce(image.upvotes, 0),
          "petName": name,
          "petSlug": slug.current,
          "petType": petType
        }
      ] + coalesce(gallery[] {
          "key": _key,
          "asset": asset,
          "upvotes": coalesce(upvotes, 0),
          "petName": ^.name,
          "petSlug": ^.slug.current,
          "petType": ^.petType
      }, [])
    }.images[][defined(asset)] | order(upvotes desc)[0...12]`;

  const images = await client.fetch(query);
  return { images };
}
