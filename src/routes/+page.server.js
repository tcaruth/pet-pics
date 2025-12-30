import { client } from '$lib/sanity';

/** @type {import('./$types').PageServerLoad} */
export async function load() {
    const query = `*[_type == "pet"] | order(image.upvotes desc) {
    _id,
    name,
    slug,
    image,
    gallery,
    petType,
    bio,
    "upvotes": coalesce(image.upvotes, 0)
  }`;

    try {
        const pets = await client.fetch(query);
        return { pets };
    } catch (error) {
        console.error("Sanity fetch error:", error);
        // Fallback data for development if Sanity is not yet configured
        return {
            pets: [
                {
                    _id: '1',
                    name: 'Buddy the Beagle',
                    slug: { current: 'buddy-the-beagle' },
                    image: null,
                    petType: 'dog',
                    bio: 'Legendary beagle with some of the softest beans in Iowa.',
                    upvotes: 1242
                },
                {
                    _id: '2',
                    name: 'Luna the Leopard',
                    slug: { current: 'luna-the-leopard' },
                    image: null,
                    petType: 'lizard',
                    bio: 'Check out these tiny gecko hands. Premium content only.',
                    upvotes: 856
                },
                {
                    _id: '3',
                    name: 'Mittens',
                    slug: { current: 'mittens' },
                    image: null,
                    petType: 'cat',
                    bio: 'Murder mittens at their finest. Special holiday drop.',
                    upvotes: 2103
                }
            ]
        };
    }
}
