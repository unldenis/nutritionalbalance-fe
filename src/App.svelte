<script>
  import '@picocss/pico'
  import Nutrients from './lib/Nutrients.svelte';
  import Edibles from './lib/Edibles.svelte';
  import { elementsFood, food, error } from "./lib/my-store.js"
  import axios from 'axios';
    import { onMount } from 'svelte';


  let resultReq = undefined
  onMount(() => {
    axios.get('http://localhost:7070/api/v1/conf') 
    .then(value => {
      $elementsFood = value.data.nutrients.elements
      $food = value.data.edibles.food
      resultReq = "Loaded plugin config files"
    })
    .catch(e => $error = "Can not get config files from server " + e.message)
  })

  function build(reload) {
    let foods = {food: $food}
    let nutrients = {
      elements: $elementsFood
      .map(it => {
        delete it.checked
        return it
      })
    }

    let body = {
      nutrients,
      edibles: foods
    }

    axios.post("http://localhost:7070/api/v1/build?reload=" + (reload ? "true" : "false"), body)
    .then(value => resultReq = value.data)
    .catch(e => $error = e.message)
  }


</script>


<main class="container">


  <header> 
     <h1>NutritionalBalance Setup</h1>
  </header>

  <!-- Secondary -->
  <details>
    <summary role="button" class="secondary">Edibles</summary>
    <Edibles />
  </details>

  <!-- Contrast -->
  <details>
    <summary role="button" class="contrast">Nutrients</summary>
    <Nutrients/>
  </details>

  <div style="    float: right">
    <a href="#" on:click={() => build(false)} role="button" class="outline">Build</a>
    <a href="#" on:click={() => build(true)} role="button">Build and Reload</a>

  </div>

  <footer>
    Made by <a href="https://github.com/unldenis">unldenis</a>
  </footer>

  {#if $error}
  <!-- Modal -->
  <dialog open>
      <article>
        <h3>Oops... Something went wrong</h3>
        <p>
          {$error}
        </p>
        <footer>
          <a href="#cancel" role="button" class="secondary" on:click={() => $error = undefined}>Ok</a>
        </footer>
      </article>
    </dialog>
  {/if}

  {#if resultReq}
    <dialog open>
      <article>
        <header>
          <a on:click={() => resultReq = undefined}  href="#close" aria-label="Close" class="close"></a>
          Response
        </header>
        <p>
          {resultReq}
        </p>
      </article>
    </dialog>
  {/if}

</main>
<style>

:root {
  --primary: #c0ca33;
}

footer {
  padding-top: 0.5em;
}
</style>
