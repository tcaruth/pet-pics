import { client } from '$lib/sanity';
import { error } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
  const { slug } = params;

  const query = `*[_type == "pet" && slug.current == $slug][0] {
    _id,
    name,
    petType,
    image,
    gallery,
    bio,
    upvotes,
    "comments": *[_type == "comment" && references(^._id) && isApproved == true] | order(timestamp desc) {
      _id,
      author,
      text,
      timestamp
    }
  }`;

  const pet = await client.fetch(query, { slug });

  if (!pet) {
    throw error(404, 'Pet not found');
  }

  return { pet };
}
