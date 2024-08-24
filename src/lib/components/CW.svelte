<script>
    export let category = "";
    export let imageUrl = "";
    let showImage = !category.startsWith("CW:");
    let isFullscreen = false;
  
    function toggleImageVisibility() {
      if (showImage) {
        isFullscreen = !isFullscreen;
      } else {
        showImage = true;
      }
    }
  </script>
  
  <div class="image-container" class:blurred={!showImage} class:fullscreen={isFullscreen}>
    <!-- Original Image -->
    <img src={imageUrl} alt={category} class:visible={showImage} on:click={toggleImageVisibility} />
    
    <!-- Fullscreen Image -->
    {#if isFullscreen}
      <div class="blur-mask" on:click={toggleImageVisibility}></div>
      <img src={imageUrl} alt={category} class="fullscreen-image" />
    {/if}
  
    <button 
      on:click={toggleImageVisibility} 
      class="reveal-button" 
      class:top-left={showImage && !isFullscreen}
    >
        {category}
    </button>
  </div>
  
  <style>
    .image-container {
      position: relative;
      width: 100%;
      overflow: hidden;
      display: inline-block;
    }
  
    img {
      max-width: 100%;
      height: auto;
      display: block;
      transition: filter 0.3s ease;
      cursor: pointer;
    }
  
    .blurred img {
      filter: blur(50px);
    }
  
    .fullscreen {
      position: relative;
    }
  
    .fullscreen .blur-mask {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.7);
      filter: blur(10px);
      z-index: 999;
    }
  
    .fullscreen .fullscreen-image {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%) scale(1.5);
      width: 20%;
      max-width: 90%;
      max-height: 90%;
      z-index: 1000;
    }
  
    .reveal-button {
      position: absolute;
      padding: 10px 20px;
      cursor: pointer;
      background-color: rgba(0, 0, 0, 0.7);
      color: white;
      border: none;
      /* transition: all 0.3s ease; */
      border-radius: 50px;
    }
  
    .reveal-button.top-left {
  
      opacity: 0;
    }
  
    :global(.blurred .reveal-button) {
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  </style>
  