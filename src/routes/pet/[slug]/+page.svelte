<script>
	import { urlFor } from '$lib/sanity';
	import CommentSection from '$lib/components/CommentSection.svelte';

	/** @type {{ data: import('./$types').PageData }} */
	let { data } = $props();
	let pet = $derived(data.pet);

	// Track upvotes and voted status per image key
	let upvoteCounts = $state({});
	let votedImages = $state({});

	/** @type {any} */
	let mainImage = $state(null);
	let lastPetId = $state(null);

	$effect(() => {
		if (data.pet._id !== lastPetId) {
			mainImage = data.pet.image || data.pet.gallery?.[0];
			lastPetId = data.pet._id;

			// Initialize counts from data
			const counts = { main: data.pet.image?.upvotes || 0 };
			data.pet.gallery?.forEach((img) => {
				counts[img._key] = img.upvotes || 0;
			});
			upvoteCounts = counts;
			votedImages = {}; // Reset voted status when switching pets
		}
	});

	/** @param {any} img */
	function swapImage(img) {
		if (!document.startViewTransition) {
			mainImage = img;
			return;
		}

		document.startViewTransition(() => {
			mainImage = img;
		});
	}

	async function handleUpvote() {
		const currentKey = mainImage?._key || 'main';
		if (votedImages[currentKey]) return;

		// Optimistic UI
		upvoteCounts[currentKey]++;
		votedImages[currentKey] = true;

		try {
			const response = await fetch('/api/interact', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					petId: pet._id,
					type: 'upvote',
					imageKey: currentKey === 'main' ? 'main' : currentKey
				})
			});

			if (!response.ok) throw new Error('Failed to upvote');
			const result = await response.json();
			upvoteCounts[currentKey] = result.upvotes;
		} catch (err) {
			console.error(err);
			// Revert on error
			upvoteCounts[currentKey]--;
			votedImages[currentKey] = false;
		}
	}

	const currentKey = $derived(mainImage?._key || 'main');
	const currentUpvoteCount = $derived(upvoteCounts[currentKey] || 0);
	const hasVotedCurrent = $derived(votedImages[currentKey] || false);
</script>

<svelte:head>
	<title>{pet.name} | ForbinFeet</title>
</svelte:head>

<div class="premium-container detail-view">
	<div class="header-row">
		<a href="/" class="back-link">← Back to Gallery</a>
	</div>

	<div class="layout">
		<div class="image-column">
			<div class="image-wrapper">
				{#if mainImage}
					<img
						src={urlFor(mainImage).width(800).url()}
						alt={pet.name}
						style:view-transition-name="img-{mainImage._key || 'main'}"
					/>
				{:else}
					<div class="placeholder">🐾 No Photos yet</div>
				{/if}
			</div>

			{#if pet.gallery && pet.gallery.length > 1}
				<div class="gallery-grid">
					{#each pet.gallery as img}
						{#if img._key !== mainImage?._key}
							<button class="gallery-item" onclick={() => swapImage(img)}>
								<img
									src={urlFor(img).width(400).url()}
									alt={pet.name}
									style:view-transition-name="img-{img._key}"
								/>
								{#if upvoteCounts[img._key] > 0}
									<div class="mini-count">
										{upvoteCounts[img._key]}
									</div>
								{/if}
							</button>
						{/if}
					{/each}
				</div>
			{/if}
		</div>

		<div class="info-column">
			<div class="pet-meta">
				<span class="type-tag">{pet.petType}</span>
				<h1 class="name">{pet.name}</h1>
			</div>

			<div class="stats">
				<button
					class="upvote-btn"
					onclick={handleUpvote}
					disabled={hasVotedCurrent}
					class:voted={hasVotedCurrent}
				>
					<span class="icon">{pet.petType === 'cat' ? '🐈' : '🐕'}</span>
					<span class="label">
						{#if hasVotedCurrent}
							Voted
						{:else if pet.petType === 'cat'}
							Touch Beans
						{:else if pet.petType === 'dog'}
							Shake Paw
						{:else}
							Give High-Five
						{/if}
					</span>
					<span class="count">{currentUpvoteCount}</span>
				</button>
			</div>

			<p class="full-bio">{pet.bio || 'This pet is still shy...'}</p>

			<div class="comments-container">
				<h3>Comments</h3>
				<CommentSection petId={pet._id} initialComments={pet.comments || []} />
			</div>
		</div>
	</div>
</div>

<style>
	.detail-view {
		padding: 2rem 1rem 4rem;
	}

	.header-row {
		margin-bottom: 1.5rem;
	}

	.back-link {
		color: var(--subtext);
		font-size: 0.9rem;
		font-weight: 500;
	}

	.back-link:hover {
		color: var(--text);
	}

	.layout {
		display: grid;
		grid-template-columns: 1fr 400px;
		gap: 2rem;
	}

	.image-wrapper {
		background: var(--card-bg);
		border-radius: 16px;
		overflow: hidden;
		border: 1px solid var(--border);
		line-height: 0;
	}

	img {
		width: 100%;
		height: auto;
		object-fit: cover;
	}

	.gallery-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
		gap: 1rem;
		margin-top: 1rem;
	}

	.gallery-item {
		appearance: none;
		background: none;
		border: 1px solid var(--border);
		padding: 0;
		margin: 0;
		border-radius: 8px;
		overflow: hidden;
		aspect-ratio: 1;
		cursor: pointer;
		position: relative;
		transition: transform 0.2s;
	}

	.gallery-item:hover {
		transform: scale(1.02);
		border-color: var(--primary);
	}

	.gallery-item img {
		width: 100%;
		height: 100%;
		display: block;
	}

	.mini-count {
		position: absolute;
		bottom: 4px;
		right: 4px;
		background: rgba(0, 0, 0, 0.6);
		color: white;
		font-size: 0.7rem;
		padding: 2px 6px;
		border-radius: 4px;
		font-weight: 700;
	}

	.placeholder {
		height: 400px;
		display: flex;
		align-items: center;
		justify-content: center;
		color: var(--subtext);
	}

	.pet-meta {
		margin-bottom: 2rem;
	}

	.type-tag {
		background: var(--primary);
		color: white;
		font-size: 0.75rem;
		font-weight: 800;
		padding: 4px 10px;
		border-radius: 6px;
		text-transform: uppercase;
		display: inline-block;
		margin-bottom: 0.5rem;
	}

	.name {
		margin: 0;
		font-size: 2.5rem;
		font-weight: 900;
	}

	.upvote-btn {
		display: flex;
		align-items: center;
		gap: 12px;
		background: #ffffff;
		color: #000000;
		border: none;
		padding: 0.8rem 1.5rem;
		border-radius: 99px;
		font-weight: 700;
		cursor: pointer;
		transition:
			transform 0.2s,
			background 0.2s;
		width: 100%;
		justify-content: center;
		margin-bottom: 2rem;
	}

	.upvote-btn:hover:not(:disabled) {
		transform: scale(1.02);
		background: #f0f0f0;
	}

	.upvote-btn.voted {
		background: var(--border);
		color: var(--subtext);
		cursor: default;
	}

	.count {
		background: var(--primary);
		color: white;
		padding: 2px 8px;
		border-radius: 99px;
		font-size: 0.9rem;
	}

	.full-bio {
		font-size: 1.1rem;
		line-height: 1.6;
		color: var(--text);
		margin-bottom: 3rem;
	}

	@media (max-width: 900px) {
		.layout {
			grid-template-columns: 1fr;
		}
	}
</style>
