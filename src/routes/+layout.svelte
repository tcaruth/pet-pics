<script>
	import '../app.css';
	import { onMount } from 'svelte';
	let { children } = $props();
	let theme = $state('dark');

	onMount(() => {
		const savedTheme = localStorage.getItem('theme');
		const systemTheme = window.matchMedia('(prefers-color-scheme: light)').matches
			? 'light'
			: 'dark';
		theme = savedTheme || systemTheme;
		document.documentElement.setAttribute('data-theme', theme);
	});

	function toggleTheme() {
		theme = theme === 'dark' ? 'light' : 'dark';
		document.documentElement.setAttribute('data-theme', theme);
		localStorage.setItem('theme', theme);
	}
</script>

<header class="glass">
	<div class="premium-container header-content">
		<a href="/" class="logo">
			<span class="forbin">FORBIN</span><span class="feet">FEET</span>
		</a>
		<nav>
			<a href="/" class="nav-link">Home</a>
			<a href="/top-beans" class="nav-link">Top Beans</a>
			<button class="theme-toggle" onclick={toggleTheme} aria-label="Toggle Theme">
				{theme === 'dark' ? '☀️' : '🌙'}
			</button>
		</nav>
	</div>
</header>

<main>
	{@render children()}
</main>

<footer>
	<div class="premium-container">
		<p>&copy; 2025 ForbinFeet. Parody for the Forbin Dev Group.</p>
	</div>
</footer>

<style>
	.header-content {
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 60px;
	}

	.logo {
		font-size: 1.5rem;
		font-weight: 900;
		letter-spacing: -1px;
		text-transform: uppercase;
	}

	.forbin {
		color: var(--text);
	}

	.feet {
		color: var(--primary);
	}

	.nav-link {
		margin-left: 1.5rem;
		font-size: 0.9rem;
		font-weight: 500;
		color: var(--subtext);
		transition: color 0.2s;
	}

	.nav-link:hover {
		color: var(--text);
	}

	main {
		min-height: calc(100vh - 120px);
	}

	footer {
		padding: 2rem 0;
		border-top: 1px solid var(--border);
		text-align: center;
		color: var(--subtext);
		font-size: 0.8rem;
	}
</style>
