<script>
	// @ts-nocheck

	/**
	 * @type {any}
	 */
	export let segments = [];

	export let total 

	export let vertical = false

	let max = [["",0],["",0],["",0],["",0],["",0],["",0],["",0],["",0],["",0],["",0],["",0],["",0],["",0],["",0],["",0]]

</script>

<div class="segmented-bar" style="{vertical ? "flex-direction: column;":""}">
	{#each [...max.slice(0,(max.length - segments.length)/2),...segments,...max.slice(0,(max.length - segments.length)/2)] as segment}
		<div
			style="{vertical ? "height" : "width"}: {(segment[1] / total ) * 100}%; background-color: {segment[0]};"
		></div>
	{/each}
</div>

<style>
	.segmented-bar {
		display: flex;
		width: 100%;
		height: 100%;
		
	}
	.segmented-bar > div {
		transition: all 0.5s;
		height: 100%;
	}
/* 
	.segmented-bar > div:first-child {
		border-radius: 2px 0px 0px 2px;
	}

	.segmented-bar > div:last-child {
		border-radius: 0px 2px 2px 0px;
		
	}

	.segmented-bar > div:only-child {
		border-radius: 2px 2px 2px 2px;
	} */
</style>
