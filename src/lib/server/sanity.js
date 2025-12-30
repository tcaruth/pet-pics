import { createClient } from "@sanity/client";
import { PUBLIC_SANITY_PROJECT_ID, PUBLIC_SANITY_DATASET } from "$env/static/public";
import { SANITY_WRITE_TOKEN } from "$env/static/private";

export const writeClient = createClient({
    projectId: PUBLIC_SANITY_PROJECT_ID,
    dataset: PUBLIC_SANITY_DATASET,
    useCdn: false,
    token: SANITY_WRITE_TOKEN,
    apiVersion: "2023-05-03",
});
