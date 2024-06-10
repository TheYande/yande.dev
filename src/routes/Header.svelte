<script>
	import logo from '$lib/images/svelte-logo.svg';
	import github from '$lib/images/github.svg';
	import yande from '$lib/images/yande.svg';
	// import Load from '$lib/components/Load.svelte';
	import { page, navigating } from '$app/stores';
	import { onMount } from 'svelte';
	import FlagBar from '$lib/components/FlagBar.svelte';

let scrolled = false;

onMount(() => {
  window.addEventListener('scroll', handleScroll);
});

function handleScroll() {
  scrolled = window.scrollY > 50; // Change 100 to the scroll position where you want the effect to trigger
}
	/**
 * @type {any}
 */
	let colors = []; 
		

	let colorIndex = -1;
/**
 * @type {any}
 */
	const allColors = [
		[
			['Homosexual'],
			['#e40207', 1],
			['#ff8c00', 1],
			['#ffed00', 1],
			['#017f27', 1],
			['#004eff', 1],
			['#760788', 1]
		],
		[['Transgender'],
			['#5acefb', 1],
			['#f5a9b9', 1],
			['#ffffff', 1],
			['#f5a9b9', 1],
			['#5acefb', 1]
		],
		[['Pansexual'],
			['#f12193', 1],
			['#ffd00d', 1],
			['#0096ff', 1]
		],
		[['Bisexual'],
			['#fe0066', 2],
			['#a915cf', 1],
			['#3302cb', 2],
		],[['Nonbinairy'],
			['#fbe700', 1],
			['#ffffff', 1],
			['#9646cf', 1],
			['#2d2d2d', 1],
		],[['Asexual'],
			['#000000', 1],
			['#a5a5a5', 1],
			['#ffffff', 1],
			['#800980', 1],
		],[['Lesbian'],
			['#d42c02', 1],
			['#ed7621', 1],
			['#ff9a56', 1],
			['#fefefe', 1],
			['#d162a4', 1],
			['#b4568f', 1],
			['#a20061', 1]
		],[['Demiboy'],
			['#7f7f7f', 1],
			['#c4c4c4', 1],
			['#9ad9eb', 1],
			['#ffffff', 1],
			['#9ad9eb', 1],
			['#c4c4c4', 1],
			['#7f7f7f', 1]
		],[['Demigender'],
			['#7f7f7f', 1],
			['#c4c4c4', 1],
			['#fbfe74', 1],
			['#ffffff', 1],
			['#fbfe74', 1],
			['#c4c4c4', 1],
			['#7f7f7f', 1]
		],[['Demigirl'],
			['#7f7f7f', 1],
			['#c4c4c4', 1],
			['#ffaec9', 1],
			['#ffffff', 1],
			['#ffaec9', 1],
			['#c4c4c4', 1],
			['#7f7f7f', 1]
		],[['Demitrans'],
			['#7f7f7f', 1],
			['#c4c4c4', 1],
			['#9ad9eb', 1],
			['#ffaec9', 1],
			['#ffffff', 1],
			['#ffaec9', 1],
			['#9ad9eb', 1],
			['#c4c4c4', 1],
			['#7f7f7f', 1]
		],[['Aboy'],
			['#111111', 2],
			['#6fa8dc', 1],
			['#111111', 2],
		],[['Agirl'],
			['#111111', 2],
			['#ffc0cb', 1],
			['#111111', 2],
		],[['Agender'],
			['#000000', 1],
			['#bcc4c6', 1],
			['#ffffff', 1],
			['#b6f583', 1],
			['#ffffff', 1],
			['#bcc4c6', 1],
			['#000000', 1],
		],[['Transmasc'],
			['#ff8abd', 1],
			['#ccf5fe', 1],
			['#99eaff', 1],
			['#74dfff', 1],
			['#99eafd', 1],
			['#cdf5fe', 1],
			['#ff8abd', 1],
		],[['Transfem'],
			['#75dfff', 1],
			['#fee1ed', 1],
			['#ffb5d7', 1],
			['#fe8dbf', 1],
			['#ffb4d7', 1],
			['#fee1ed', 1],
			['#74dfff', 1],
		]
	];

	/**
	 * @param {any[]} array
	 */
	

	setInterval(() => {
		colorIndex++;
		colorIndex %= allColors.length;
		colors = allColors[colorIndex].slice(1);
	}, 2000);
</script>

<header>
	<nav class:hidden={!scrolled} class="sticky-nav">
		<svg style="transform: translateX(1px);" viewBox="0 0 2 3" aria-hidden="true">
			<path d="M0,0 L1,2 C1.5,3 1.5,3 2,3 L2,0 Z" />
		</svg>
		<div class="vert">
			{#if $navigating}
				<ul >
					<li class="corner">
						<div class="t">
							<div class="loader"></div>
							<p>navigating to {$navigating.to?.url.pathname}</p>
						</div>
					</li>
				</ul>	
			{:else}
			<!-- <div class="pride" style="position:relative; transform: translateY(100%);"><FlagBar segments={colors} total={colors.reduce((/** @type {any} */ p, /** @type {any[]} */ c) => p + c[1],0)}></FlagBar></div> -->
				<ul>
					<li class="corner">
						<a href="/">
							<img src={yande} alt="Yande.dev" />
						</a>
					</li>
					<li aria-current={$page.url.pathname === '/about' ? 'page' : undefined}>
						<a href="/about">About</a>
					</li>
					<li aria-current={$page.url.pathname === '/blog' ? 'page' : undefined}>
						<a href="/blog">Posts</a>
					</li>
					<li aria-current={$page.url.pathname === '/bots' ? 'page' : undefined}>
						<a href="/bots">Bots</a>
					</li>
					<li class="corner">
						<a href="https://github.com/theyande/">
							<img src={github} alt="GitHub" />
						</a>
					</li>
					<li class="corner">
						<a href="https://kit.svelte.dev">
							<img src={logo} alt="SvelteKit" />
						</a>
					</li>
				</ul>
				
				
			{/if}
			<div class="pride" style="transform: translateY(-50%);"><FlagBar segments={colors} total={colors.reduce((/** @type {any} */ p, /** @type {any[]} */ c) => p + c[1],0)}></FlagBar></div>
		</div>
		<svg style="transform: translateX(-1px);" viewBox="0 0 2 3" aria-hidden="true">
			<path d="M0,0 L0,3 C0.5,3 0.5,3 1,2 L2,0 Z" />
		</svg>
	</nav>
	<nav class="vert top-nav">
		{#if $navigating}
			<ul >
				<li class="corner">
					<div class="t">
						<div class="loader"></div>
						<p>navigating to {$navigating.to?.url.pathname}</p>
					</div>
				</li>
			</ul>	
		{:else}
		<!-- <div class="pride" style="position:relative; transform: translateY(100%);"><FlagBar segments={colors} total={colors.reduce((/** @type {any} */ p, /** @type {any[]} */ c) => p + c[1],0)}></FlagBar></div> -->
			<ul>
				<li class="corner">
					<a href="/">
						<img src={yande} alt="Yande.dev" />
					</a>
				</li>
				<li aria-current={$page.url.pathname === '/about' ? 'page' : undefined}>
					<a href="/about">About</a>
				</li>
				<li aria-current={$page.url.pathname === '/blog' ? 'page' : undefined}>
					<a href="/blog">Posts</a>
				</li>
				<li aria-current={$page.url.pathname === '/bots' ? 'page' : undefined}>
					<a href="/bots">Bots</a>
				</li>
				<li class="corner">
					<a href="https://github.com/theyande/">
						<img src={github} alt="GitHub" />
					</a>
				</li>
				<li class="corner">
					<a href="https://kit.svelte.dev">
						<img src={logo} alt="SvelteKit" />
					</a>
				</li>
			</ul>
			
			
		{/if}
		<div class="pridebig" style="transform: translateY(-50%);"><FlagBar segments={colors} total={colors.reduce((/** @type {any} */ p, /** @type {any[]} */ c) => p + c[1],0)} tooltip={allColors[colorIndex]?.[0]}></FlagBar></div>
		</nav>


</header>

<style>
	.top-nav {
		width:100%;
	}
	.pride {
		width:calc(100% - 0px);
		margin-left: 0px;
		height: 10px;
		overflow:hidden;
		display: flex;
		justify-content: center;
		z-index: 1000;
		overflow: hidden;
		border-radius: 5px;
	}
	.pridebig {
		width:calc(100% - 1000px);
		margin-left: 500px;
		height: 10px;
		overflow:hidden;
		display: flex;
		justify-content: center;
		z-index: 1000;
		overflow: hidden;
		border-radius: 5px;
	}
	.vert {
		display: flex;
		flex-direction: column;
		/* transform: translateY(-5px); */
	}

	.loader {
		width: 20px;
		aspect-ratio: 1.154;
		--g: no-repeat radial-gradient(farthest-side, #ffffff 90%, #ffffff00);
		background:
			var(--g) 50% 0,
			var(--g) 0 100%,
			var(--g) 100% 100%;
		background-size: 35% calc(35% * 1.154);
		animation: l16 1s infinite;
	}
	@keyframes l16 {
		50%,
		100% {
			background-position:
				100% 100%,
				50% 0,
				0 100%;
		}
	}
	header {
		display: flex;
		justify-content: center;
	}

	/* .corner a {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100%;
	} */

	.corner img {
		width: 2em;
		height: 2em;
		object-fit: contain;
	}

	nav {
		display: flex;
		justify-content: center;
		--background: rgb(81, 81, 81);
		
		z-index: 10000;
		transition: all 500ms;
	}
	.sticky-nav {
		position:fixed;
		
	}
	.hidden{
		transform: translateY(-100%);
	}

	svg {
		width: 2em;
		height: 3em;
		display: block;
	}

	path {
		fill: var(--background);
	}

	ul {
		position: relative;
		padding: 0px;
		margin: 0;
		height: 3em;
		display: flex;
		justify-content: center;
		align-items: center;
		list-style: none;
		background:var(--background) 50px;
		/* opacity: 0.5; */
		background-size: contain;
	}

	li {
		position: relative;
		height: 100%;
	}

	li[aria-current='page']::before {
		content: '';
		position: absolute;
		left: 50%;
		right: 0;
		border-radius: 2px;
		bottom: 10px; /* Adjust this value to control the distance of the underline from the text */
		height: 2px; /* Thickness of the underline */
		background-color: #ffffff; /* Color of the underline */
		width: 0; /* Initial width of the pseudo-element */
		/* transition: width 0.5s ease; */
		animation: growUnderline 0.5s ease forwards;
	}
	@keyframes growUnderline {
		to {
			left: 0%;
			width: 100%;
		}
	}
	nav a,
	nav .t {
		display: flex;
		height: 100%;
		align-items: center;
		padding: 0 0.5rem;
		color: white;
		font-weight: 700;
		font-size: 0.8rem;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		text-decoration: none;
		transition: color 0.2s linear;
		flex-direction: row;
	}

	a:hover {
		color: var(--color-theme-1);
	}
</style>
