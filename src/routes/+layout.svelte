<script>
	import FlagBar from '$lib/components/FlagBar.svelte';
	import Header from './Header.svelte';
	import './styles.css';

	/**
	 * @type {any[]}
	 */
	let colors = [];

	let colorIndex = -1;
	/**
	 * @type {any}
	 */
	const allColors = [
		[
			['#FFFFFF', 2],
			['#7C0070', 1],
			['#D2D2D2', 2]
		],
		[
			['#6E018C', 1],
			['#AEB1AA', 1],
			['#FFFFFF', 1],
			['#AEB1AA', 1],
			['#6E018C', 1]
		],
		[
			['#7F7F7F', 1],
			['#C4C4C4', 1],
			['#FFAEC9', 1],
			['#FFFFFF', 1],
			['#FFAEC9', 1],
			['#C4C4C4', 1],
			['#7F7F7F', 1]
		],

		[
			['#FF9BCD', 1],
			['#FF54BE', 1],
			['#250046', 1],
			['#665EFF', 1],
			['#8BA4FF', 1],
		],
		[
			['#74DFFF', 1],
			['#FEE1ED', 1],
			['#EFAACA', 1],
			['#FE8DBF', 1],
			['#EFAACA', 1],
			['#FEE1ED', 1],
			['#74DFFF', 1]
		],
		[
			['#FE8CA9', 1],
			['#FFFFFF', 1],
			['#FE8CA9', 1]
		]
	];

	/**
	 * @param {any[]} array
	 */
	setInterval(() => {
		colorIndex++;
		colorIndex %= allColors.length;
		colors = allColors[colorIndex];
	}, 2000);
</script>

<div class="app">
	<Header />

	<main><slot /></main>

	<footer>
		<p>yes yes very website</p>
		<div class="pride">
			<FlagBar
				segments={colors}
				total={colors.reduce((/** @type {any} */ p, /** @type {any[]} */ c) => p + c[1], 0)}
				vertical={true}
			></FlagBar>
		</div>
	</footer>
</div>

<style>
	.pride {
		margin-left: 10px;
		aspect-ratio: 6 / 3;
		height: 20px;
		border-radius: 5px;
		overflow: hidden;
	}
	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		/* padding: 1rem; */
		width: 100%;
		/* max-width: 64rem; */
		margin: 0 auto;
		box-sizing: border-box;
	}

	footer {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		padding: 12px;
	}

	@media (min-width: 480px) {
		footer {
			padding: 12px 0;
		}
	}
</style>
