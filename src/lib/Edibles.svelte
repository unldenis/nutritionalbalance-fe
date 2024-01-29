<script>

import { elementsFood, food, error } from "./my-store.js"


const foodType = "APPLE,MUSHROOM_SOUP,BREAD,PORK,GRILLED_PORK,GOLDEN_APPLE,RAW_FISH,COOKED_FISH,COOKIE,MELON,RAW_BEEF,COOKED_BEEF,RAW_CHICKEN,COOKED_CHICKEN,ROTTEN_FLESH,SPIDER_EYE,CARROT_ITEM,POTATO_ITEM,BAKED_POTATO,POISONOUS_POTATO,GOLDEN_CARROT,PUMPKIN_PIE,RABBIT,COOKED_RABBIT,RABBIT_STEW,MUTTON,COOKED_MUTTON,CHORUS_FRUIT,BEETROOT,BEETROOT_SOUP"
    .split(",")
    .map(it => it.toLowerCase())


function handleChangeCheckbox(event, index) {
    if(event.target.checked) {
        $elementsFood[index].checked = true
    } else {
        $elementsFood[index].checked = false
    }
}

let add_foodType = foodType[0]
let add_units = ''

function isNumeric(value) {
    return /^\d+$/.test(value);
}

function addElement() {

    if(add_units.length === 0) {
        $error = 'Units can not be empty'
        return
    }

    if(!isNumeric(add_units)) {
        $error = 'Units is not a valid number'
        return
    }

    const _parsed = $elementsFood
        .filter(it => it.checked === true)
        .map(it => it.name)

    if(_parsed.length === 0) {
        $error = "No nutrients set"
        return 
    }
    
    $food = [...$food, {
        food: add_foodType,
        units: parseInt(add_units),
        nutrients: _parsed
    }]
}

function deleteIndex(index) {
    $food.splice(index, 1)
    $food = [...$food]
}

</script>


<div class="container">
    <h2>List</h2>  

    <figure>
        <table>
            <thead>
                <tr>
                <th scope="col">#</th>
                <th scope="col">Food</th>
                <th scope="col">Units</th>
                <th scope="col">Nutrients</th>
                <th scope="col">Action</th>
                </tr>
            </thead>
            
            <tbody>
                {#each $food as $e, index}
                    <tr>
                        <th scope="row">{index}</th>
                        <td>{$e.food}</td>
                        <td>{$e.units}</td>
                        <td>{$e.nutrients.join(",")}</td>
                        <td><a on:click={() => deleteIndex(index)} href="#" role="button" class="outline">Delete</a></td>
                    </tr>
                {/each}
            </tbody>

        </table>
    </figure>

     <h2>Add Food</h2>
    <div>
        <div class="grid">
            <!-- Markup example 1: input is inside label -->
            <label for="name">
                Name
                <!-- Select -->
                <select on:change={event => add_foodType = event.target.value}>
                    {#each foodType as $e}
                        <option  value={$e}>{$e}</option>
                    {/each}
                </select>

            </label>

            <label for="amount">
                Units (1-100)
                <input bind:value={add_units} type="number" min="1" max="100"/>
            </label>

        </div>

        <!-- Checkboxes -->
        <fieldset>
            {#each $elementsFood as $e, index}
                <label for={$e.name}>
                    <input type="checkbox" on:change={event => handleChangeCheckbox(event, index)} >
                    {$e.name}
                </label>
            {/each}
        </fieldset>

        <!-- Button -->
        <a on:click={addElement} href="#" role="button" class="outline">Add</a>

    </div>
</div>