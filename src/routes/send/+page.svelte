<script>
	let name = '';
	let msg = '';
	function send() {
		if (!msg) return;
		fetch('https://ntfy.yande.dev/gay', {
			method: 'POST',
			headers: {
				'Content-Type': 'text/plain'
			},
			body: `${name ? `${name}: ` : ''}${msg}`
		})
			.then((response) => {
				if (response.ok) {
					alert('Message sent successfully!');
				} else {
					alert('Failed to send message.');
				}
			})
			.catch((error) => {
				console.error('Error:', error);
				alert('An error occurred while sending the message.');
			});
	}
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<center
	><br /><br /><br />
	<h1>Send a message to yande!</h1>
	<small>Im sure i wont regret this!</small>
	<p>
		Send a message to me! <br />every message appears as a notification on my phone and my computer!
	</p>
	<div class="horiz">
		<input type="text" placeholder="Name (optional)" bind:value={name} />
		<input type="text" placeholder="message" bind:value={msg} />
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<div on:click={send}>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				height="24px"
				viewBox="0 -960 960 960"
				width="24px"
				fill="#e8eaed"
				><path
					d="M120-160v-640l760 320-760 320Zm80-120 474-200-474-200v140l240 60-240 60v140Zm0 0v-400 400Z"
				/></svg
			>
		</div>
	</div>
	{#if msg}
		<p>Preview:</p>
		<p>
			{name}{#if name}
				:
			{/if}{msg}
		</p>
	{/if}
</center>

<style>
	.horiz {
		display: flex;
		flex-direction: row;

		align-items: center;
	}
	center {
		margin-top: 60px;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	input {
		box-sizing: border-box;
		border: 2px solid rgba(255, 255, 255, 0.473);
		border-radius: 4px;
        background-color: rgba(0, 0, 0, 0);
        color:white;
		background: hsla(0, 0, 0, 0);
	}
</style>
