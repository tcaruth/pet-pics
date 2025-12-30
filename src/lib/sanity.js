import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import { PUBLIC_SANITY_PROJECT_ID, PUBLIC_SANITY_DATASET } from "$env/static/public";

export const client = createClient({
    projectId: PUBLIC_SANITY_PROJECT_ID,
    dataset: PUBLIC_SANITY_DATASET,
    useCdn: true,
    apiVersion: "2023-05-03",
});

const builder = imageUrlBuilder(client);

export function urlFor(source) {
    return builder.image(source);
}
