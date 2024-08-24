<script lang="ts">
	//@ts-nocheck
	import Cw from '$lib/components/CW.svelte';
	const allmemes = (async () => {
		const m = await fetch('/api/memes').then((a) => a.json());
		const cats = Object.entries(m);
		let all = [];
		cats.forEach((c) => {
			c[1].forEach((url) => {
				all.push({ category: c[0], imageUrl: url });
			});
		});
		return splitArrayIntoSections(
			all.toSorted(() => 0.5 - Math.random()),
			4
		);
	})();

	function splitArrayIntoSections<T>(array: T[], sections: number): T[][] {
		const result: T[][] = [];
		const sectionSize = Math.ceil(array.length / sections);

		for (let i = 0; i < sections; i++) {
			const start = i * sectionSize;
			const end = start + sectionSize;
			result.push(array.slice(start, end));
		}

		return result;
	}
</script>

{#await allmemes}
	fetcjng
{:then p}
	<div class="container">
		{#each p as m}
			<div class="line">
				{#each m as img}
					<div class="image">
						<Cw category={img.category} imageUrl={img.imageUrl}></Cw>
					</div>
				{/each}
			</div>
		{/each}
	</div>
{/await}

<style>
	.image {
		max-width: 200px;
		margin: 20px
	}
	.container {
		display: flex;
        flex-direction: row;
		width: 100%;
		justify-content: center;
		margin-top: 50px;
	}
    .line {
        display: flex;
        flex-direction: column  ;
		/* margin: 10px			 */
    }
</style>
