<script>
	import PetCard from '$lib/components/PetCard.svelte';
	let { data } = $props();
</script>

<svelte:head>
	<title>ForbinFeet | The Premium Pet Feet Experience</title>
</svelte:head>

<section class="hero">
	<div class="premium-container">
		<h1>Welcome to <span class="accent">ForbinFeet</span></h1>
		<p>The exclusive platform for elite pet beans, paws, and claws.</p>
	</div>
</section>

<section class="gallery">
	<div class="premium-container grid">
		{#each data.pets as pet (pet._id)}
			<PetCard {pet} />
		{/each}
	</div>
</section>

<style>
	.hero {
		padding: 4rem 0;
		text-align: center;
		background: var(--hero-bg);
		border-bottom: 1px solid var(--border);
	}

	h1 {
		font-size: 3rem;
		font-weight: 900;
		margin-bottom: 1rem;
		letter-spacing: -1px;
	}

	.accent {
		color: var(--primary);
	}

	p {
		color: var(--subtext);
		font-size: 1.2rem;
		max-width: 600px;
		margin: 0 auto;
	}

	.gallery {
		padding: 2rem 0 4rem;
	}

	.grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
		gap: 1.5rem;
	}

	@media (max-width: 600px) {
		.grid {
			grid-template-columns: 1fr;
		}
		h1 {
			font-size: 2.2rem;
		}
	}
</style>
