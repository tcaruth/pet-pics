<script>
	let { petId, initialComments } = $props();

	let comments = $state(initialComments);
	let newAuthor = $state('');
	let newText = $state('');
	let isSubmitting = $state(false);
	let message = $state('');

	async function handleSubmit(e) {
		e.preventDefault();
		if (isSubmitting || !newText.trim()) return;

		isSubmitting = true;
		message = 'Submitting for approval...';

		try {
			const response = await fetch('/api/interact', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					petId,
					type: 'comment',
					author: newAuthor || 'Anonymous',
					text: newText
				})
			});

			if (!response.ok) throw new Error('Failed to post');

			newText = '';
			newAuthor = '';
			message = 'Your comment has been submitted and is awaiting moderation!';

			// We don't optimistically show since it needs approval
		} catch (err) {
			message = 'Error posting comment. Please try again.';
		} finally {
			isSubmitting = false;
		}
	}
</script>

<div class="comment-section">
	<form onsubmit={handleSubmit} class="comment-form">
		<div class="row">
			<input
				type="text"
				bind:value={newAuthor}
				placeholder="Your display name (optional)"
				maxlength="30"
			/>
		</div>
		<div class="row">
			<textarea
				bind:value={newText}
				placeholder="Say something nice about these beans..."
				required
				maxlength="500"
			></textarea>
		</div>
		<button type="submit" disabled={isSubmitting}>
			{isSubmitting ? 'Sending...' : 'Post Comment'}
		</button>
		{#if message}
			<p class="form-message">{message}</p>
		{/if}
	</form>

	<div class="list">
		{#each comments as comment (comment._id)}
			<div class="comment-item">
				<div class="meta">
					<strong>{comment.author}</strong>
					<span class="date">{new Date(comment.timestamp).toLocaleDateString()}</span>
				</div>
				<p class="text">{comment.text}</p>
			</div>
		{:else}
			<p class="no-comments">No approved comments yet. Be the first!</p>
		{/each}
	</div>
</div>

<style>
	.comment-form {
		background: var(--card-bg);
		padding: 1.5rem;
		border-radius: 12px;
		border: 1px solid var(--border);
		margin-bottom: 2rem;
	}

	.row {
		margin-bottom: 1rem;
	}

	input,
	textarea {
		width: 100%;
		background: var(--bg);
		border: 1px solid var(--border);
		color: white;
		padding: 0.8rem;
		border-radius: 8px;
		font-family: inherit;
	}

	textarea {
		resize: vertical;
		min-height: 80px;
	}

	button {
		background: var(--primary);
		color: white;
		border: none;
		padding: 0.8rem 1.5rem;
		border-radius: 8px;
		font-weight: 600;
		cursor: pointer;
	}

	button:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}

	.form-message {
		font-size: 0.8rem;
		margin-top: 1rem;
		color: var(--primary);
	}

	.list {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
	}

	.comment-item {
		padding-bottom: 1rem;
		border-bottom: 1px solid var(--border);
	}

	.meta {
		display: flex;
		justify-content: space-between;
		font-size: 0.9rem;
		margin-bottom: 0.4rem;
	}

	.date {
		color: var(--subtext);
	}

	.text {
		margin: 0;
		line-height: 1.5;
		color: var(--text);
	}

	.no-comments {
		color: var(--subtext);
		text-align: center;
		padding: 2rem;
	}
</style>
