<script>
	import { urlFor } from '$lib/sanity';
	let { data } = $props();
</script>

<svelte:head>
	<title>Top Beans Leaderboard | ForbinFeet</title>
</svelte:head>

<div class="premium-container leaderboard-view">
	<div class="hero-mini">
		<h1>Top Beans</h1>
		<p>The most popular paws on the platform, ranked by you.</p>
	</div>

	<div class="grid">
		{#each data.images as item, i}
			<div class="rank-wrapper">
				<div class="rank-badge">#{i + 1}</div>
				<div class="image-card">
					<a href="/pet/{item.petSlug}">
						<div class="image-container">
							<img src={urlFor(item.asset).width(400).height(500).url()} alt={item.petName} />
							<div class="overlay">
								<span class="pet-type">{item.petType}</span>
							</div>
						</div>
						<div class="content">
							<div class="header">
								<h3 class="name">{item.petName}</h3>
								<div class="upvotes">
									<span class="icon"
										>{item.petType === 'cat' ? '🐈' : item.petType === 'dog' ? '🐕' : '🐾'}</span
									>
									<span class="count">{item.upvotes}</span>
								</div>
							</div>
							<p class="tagline">Ranked among the elite.</p>
						</div>
					</a>
				</div>
			</div>
		{:else}
			<p class="empty">No ranks established yet. Go touch some beans!</p>
		{/each}
	</div>
</div>

<style>
	.leaderboard-view {
		padding: 3rem 1rem;
	}

	.hero-mini {
		text-align: center;
		margin-bottom: 4rem;
	}

	.hero-mini h1 {
		font-size: 3rem;
		font-weight: 900;
		margin-bottom: 0.5rem;
	}

	.grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
		gap: 3rem;
	}

	.rank-wrapper {
		position: relative;
	}

	.rank-badge {
		position: absolute;
		top: -15px;
		left: -15px;
		background: var(--primary);
		color: white;
		width: 40px;
		height: 40px;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 50%;
		font-weight: 900;
		z-index: 10;
		box-shadow: 0 4px 12px rgba(0, 143, 204, 0.4);
		border: 3px solid var(--bg);
	}

	.image-card {
		background: var(--card-bg);
		border-radius: 12px;
		overflow: hidden;
		border: 1px solid var(--border);
		transition:
			transform 0.2s,
			border-color 0.2s;
	}

	.image-card:hover {
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

	.tagline {
		margin: 0;
		font-size: 0.85rem;
		color: var(--subtext);
		line-height: 1.4;
	}

	.empty {
		grid-column: 1 / -1;
		text-align: center;
		color: var(--subtext);
		padding: 4rem;
	}
</style>
