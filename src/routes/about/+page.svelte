<script>
	import Load from '$lib/components/Load.svelte';
	import { gracefulFetch } from '$lib/functions';

	let pPage = gracefulFetch('/api/pronounpage');
</script>

<svelte:head>
	<title>About</title>
	<meta name="description" content="About yande" />
	<meta property="og:title" content="abot yande" />
	<meta property="og:image" content="https://cataas.com/cat" />
</svelte:head>
<div class="text-column center">
	<section class="center" style="margin-top: 60px;">
		{#await pPage}
			<h1>Fetching Info...</h1><Load/>
		{:then pPage}
			<h1>About</h1>
			<div class="horiz">
				<img class="pfp" src={pPage.avatar} alt="" />
				<div class="vert center">
					<h2>@{pPage.profiles.en.names[0].value}</h2>
					<div class="horiz">
						<p>({pPage.profiles.en.age})</p>
						{#each pPage.profiles.en.flags as flag}
							<img class="flag" src="https://en.pronouns.page/flags/{flag}.png" alt={flag} tooltip={flag} />
						{/each}
					</div>
					<div class="horiz">
						{#each pPage.profiles.en.pronouns.filter((/** @type {{ opinion: string; }} */ p) => p.opinion == 'yes') as pronoun}
							<p class="pronoun">{pronoun.value}</p>
						{/each}
					</div>
				</div>
			</div>
			<a class="smol" href="https://en.pronouns.page/@yande">data from my pronoun page</a>
		{/await}
<div class="horiz-divider"></div>
		<h2>things i like</h2>
		<div class="left">
			<ul>
				<li>coding</li>
				<li>chatting</li>
				<li>callum</li>
				<li>pizza</li>
				<li>chicken</li>
			</ul>
			<h2>things i dont like</h2>
			<ul>
				<li>java</li>
				<li>python</li>
				<li>onions</li>
				<li>school</li>
				<li>apple (the company)</li>
			</ul>
		</div>
		<!-- <img src="https://cataas.com/cat" style="height: 400px; border-radius:30px" alt="cat" /> -->
		<p>heres what im up to on discord:</p>
		<img
			src="https://lanyard.cnrad.dev/api/1014588310036951120?showDisplayName=true&idleMessage=Not%20doin%20crap"
			alt="discordthing"
		/>

		<p>oh yeah i like cats</p>
		<img src="https://cataas.com/cat" style="height: 400px; border-radius:10px" alt="cat">
	</section>
</div>

<style>
	.horiz-divider {
		height: 5px;
		width: 100%;
		background-color: black;
		margin: 25px 0px;
	}
	.smol {
		font-size: 0.5rem;
	}
	.pronoun {
		margin: 0px 5px;
	}
	.flag {
		height: 20px;
		margin: 0px 5px;
		border-radius: 5px;
	}
	.pfp {
		border-radius: 50%;
		margin: 10px;
	}
	section {
		display: block;
		margin: 0%;
		width: 100%;
	}

	.center {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
	}
	.left {
		display: flex;
		justify-content: left;
		flex-direction: column;
	}
	h1 {
		font-weight: bolder;
		font-size: 50px;
		margin: 0%;
	}
	h2 {
		margin: 0px;
		font-size: 30px;
	}
	p {
		margin: 0px;
	}
	.vert {
		display: flex;
		flex-direction: column;
	}
	.horiz {
		display: flex;
		flex-direction: row;

		margin: 4px 0px;
	}
</style>
