import { writeClient } from '$lib/server/sanity';
import { json } from '@sveltejs/kit';

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
    const body = await request.json();
    const { petId, type, author, text, imageKey } = body;

    if (!petId) {
        return json({ error: 'Missing petId' }, { status: 400 });
    }

    try {
        if (type === 'upvote') {
            const targetPath = imageKey === 'main' || !imageKey
                ? 'image.upvotes'
                : `gallery[_key=="${imageKey}"].upvotes`;

            const result = await writeClient
                .patch(petId)
                .setIfMissing({ [targetPath]: 0 })
                .inc({ [targetPath]: 1 })
                .commit();

            // Extract the updated count from the committed document
            let newCount;
            if (imageKey === 'main' || !imageKey) {
                newCount = result.image?.upvotes;
            } else {
                newCount = result.gallery?.find(img => img._key === imageKey)?.upvotes;
            }

            return json({ success: true, upvotes: newCount || 0 });
        }

        if (type === 'comment') {
            if (!text) {
                return json({ error: 'Missing comment text' }, { status: 400 });
            }

            await writeClient.create({
                _type: 'comment',
                pet: {
                    _type: 'reference',
                    _ref: petId
                },
                author: author || 'Anonymous',
                text: text,
                isApproved: false, // Default to false for moderation
                timestamp: new Date().toISOString()
            });

            return json({ success: true, message: 'Comment submitted for moderation' });
        }

        return json({ error: 'Invalid interaction type' }, { status: 400 });
    } catch (err) {
        const error = /** @type {Error} */ (err);
        console.error('Sanity Mutation Error details:', {
            message: error.message,
            stack: error.stack,
            petId,
            type
        });
        return json({
            error: 'Internal Server Error',
            details: error.message,
            hint: 'Check server logs for mutation details'
        }, { status: 500 });
    }
}
