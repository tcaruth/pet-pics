<script>
	import { urlFor } from '$lib/sanity';
	let { pet } = $props();
</script>

<div class="pet-card">
	<a href="/pet/{pet.slug.current}">
		<div class="image-container">
			{#if pet.image}
				<img src={urlFor(pet.image).width(400).height(500).url()} alt={pet.name} />
			{:else if pet.gallery && pet.gallery.length > 0}
				<img src={urlFor(pet.gallery[0]).width(400).height(500).url()} alt={pet.name} />
			{:else}
				<div class="placeholder">🐾 No Beans yet</div>
			{/if}
			<div class="overlay">
				<span class="pet-type">{pet.petType}</span>
			</div>
		</div>
		<div class="content">
			<div class="header">
				<h3 class="name">{pet.name}</h3>
				<div class="upvotes">
					<span class="icon"
						>{pet.petType === 'cat' ? '🐈' : pet.petType === 'dog' ? '🐕' : '🐾'}</span
					>
					<span class="count">{pet.upvotes || 0}</span>
				</div>
			</div>
			<p class="bio">{pet.bio ? pet.bio.substring(0, 60) + '...' : 'Unlock these beans...'}</p>
		</div>
	</a>
</div>

<style>
	.pet-card {
		background: var(--card-bg);
		border-radius: 12px;
		overflow: hidden;
		border: 1px solid var(--border);
		transition:
			transform 0.2s,
			border-color 0.2s;
	}

	.pet-card:hover {
		transform: translateY(-4px);
		border-color: var(--primary);
	}

	.image-container {
		aspect-ratio: 4/5;
		background: #1a1c1e;
		position: relative;
		overflow: hidden;
	}

	img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.placeholder {
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		color: var(--subtext);
		font-size: 1.2rem;
	}

	.overlay {
		position: absolute;
		bottom: 0px;
		left: 0px;
		right: 0px;
		background: linear-gradient(transparent, rgba(0, 0, 0, 0.8));
		padding: 1rem;
	}

	.pet-type {
		background: var(--primary);
		color: white;
		font-size: 0.7rem;
		font-weight: 700;
		padding: 2px 8px;
		border-radius: 4px;
		text-transform: uppercase;
	}

	.content {
		padding: 1rem;
	}

	.header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 0.5rem;
	}

	.name {
		margin: 0;
		font-size: 1.1rem;
		font-weight: 700;
	}

	.upvotes {
		display: flex;
		align-items: center;
		gap: 4px;
		font-weight: 600;
		color: var(--primary);
	}

	.bio {
		margin: 0;
		font-size: 0.85rem;
		color: var(--subtext);
		line-height: 1.4;
	}
</style>
