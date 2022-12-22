const PARTS_COUNT = 4;


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
                result.representation = `${m1} · ${m2}`
                result.value = m1* m2
            } else {
                result.value = Math.floor(Math.random() * (limit - 1)) + 1
                result.representation = `${result.value}`
            }
        }
    } while (result.value > limit)

    return result
}



for(let part_index = 0; part_index <= PARTS_COUNT ; part_index++){
    let n = get_part()
    console.log('◩◩◩◩◩◩ ', JSON.stringify(n));
}