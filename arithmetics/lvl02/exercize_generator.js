import clipboardy from 'clipboardy'

const PARTS_COUNT = 3;
const EXERSISE_COUNT = 7;
const EXERSISES_ON_PAGE = 24;


function randomNumber_100() {
    return Math.floor(Math.random() * 100)
}

function randomNumber_10() {
    return Math.floor(Math.random() * 10)
}


function multiplier() {
    return Math.floor(Math.random() * 8) + 2
}


function get_part(limit) {
    limit = limit || 100;

    const division = (limit < 10) && randomNumber_100() > 30
    const multiplication = randomNumber_100() > 49
    let result = {
        representation: '',
        value: 0
    }
    do {
        if (division) {
            let division_result = 1
            do {
                division_result = multiplier()
            } while (division_result >= limit)

            let multiplier2 = multiplier()
            result.value = division_result
            result.representation = `${multiplier2 * division_result} ÷ ${multiplier2}`
        } else {
            if(multiplication){
                let m1 = multiplier()
                let m2 = multiplier()
                result.representation = `${m1}·${m2}`
                result.value = m1* m2
            } else {
                result.value = Math.floor(Math.random() * (limit - 1)) + 1
                result.representation = `${result.value}`
            }
        }
    } while (result.value > limit)

    return result
}


function getSign(seed){
    seed = seed ? seed : randomNumber_100() < 50 ? -1 : 1
    return {
        representation: seed > 0 ? "+" : "-",
        value: seed
    }
}
 
function get_exercise(){
    let initial_part = get_part()
    let parts = [initial_part]
    let intermediate_result = initial_part.value

    for(let part_index = 1; part_index <= PARTS_COUNT ; part_index++){
        let current_part = get_part()
        let sign = null
        if(current_part.value > intermediate_result){
            sign = getSign(1)
        } else {
            sign = getSign(randomNumber_100() < 70 ? -1 : 1)
        }

        parts.push(sign)
        parts.push(current_part)

        intermediate_result = intermediate_result + sign.value * current_part.value
    }

    return parts
}

let block = '';

for(let exercise_block_index = 0; exercise_block_index < EXERSISES_ON_PAGE; exercise_block_index++){
    for(let exercise_index = 0; exercise_index < EXERSISE_COUNT; exercise_index++){
        let exercise_string = get_exercise().reduce((acc, part) => acc = acc + " " + part.representation, '')
        block = block + `${exercise_index + 1}. ${exercise_string}\n`;
    }
    block = block + '\n\n';
}

clipboardy.writeSync(block)