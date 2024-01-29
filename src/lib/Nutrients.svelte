<script>
  import { elementsFood, error } from "./my-store.js"

function deleteIndex(index) {
    $elementsFood.splice(index, 1)
    $elementsFood = [...$elementsFood]
}

let add_name = '';
let add_malMin = 50;
let add_malMax = 50;

let add_tar = 50;
let add_tarCap = 50;

function addElement() {

    if(add_name.length === 0) {
        $error = 'Name can not be empty'
        return
    }

    $elementsFood = [...$elementsFood, {
        name: add_name,
        malnourishmentMin: add_malMin,
        malnourishmentMax: add_malMax,
        target: add_tar,
        targetCap: add_tarCap,
    }]
}

</script>

<div class="container">
  <h2>List</h2>  
        <figure>
            <table>
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Name</th>
                  <th scope="col">Malnourishment Min</th>
                  <th scope="col">Malnourishment Max</th>
                  <th scope="col">Target</th>
                  <th scope="col">Target Cap</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              
              <tbody>
                  {#each $elementsFood as $e, index}
                      <tr>
                          <th scope="row">{index}</th>
                          <td>{$e.name}</td>
                          <td>{$e.malnourishmentMin}</td>
                          <td>{$e.malnourishmentMax}</td>
                          <td>{$e.target}</td>
                          <td>{$e.targetCap}</td>
                          <td><a href="#" on:click={() => deleteIndex(index)} role="button" class="outline">Delete</a></td>
                      </tr>
                  {/each}
              </tbody>
            </table>
          </figure>

        <h2>Add Nutrient</h2>  
        <div>

          <!-- Grid -->
          <div class="grid">
        
            <!-- Markup example 1: input is inside label -->
            <label for="name">
              Name
              <input bind:value={add_name} type="text" id="name" name="name" placeholder="Name" required>
            </label>
        
          </div>
      
          <div class="grid">
                <!-- Range slider -->
                <label for="range">Malnourishment Min
                  <input bind:value={add_malMin} type="range" min="0" max="100" id="range" name="range">
              </label>
              <!-- Range slider -->
              <label for="range">Malnourishment Max
                  <input bind:value={add_malMax} type="range" min="0" max="100" id="range" name="range">
              </label>
          </div>

          <div class="grid">
              <!-- Range slider -->
              <label for="range">Target
                  <input bind:value={add_tar} type="range" min="0" max="100" id="range" name="range">
              </label>
              <!-- Range slider -->
              <label for="range">Target Cap
                  <input bind:value={add_tarCap} type="range" min="0" max="100" id="range" name="range">
              </label>
          </div>

            <!-- Button -->
            <a href="#" on:click={addElement} role="button" class="outline">Add</a>
        </div>
</div>


