import clipboardy from 'clipboardy';

const EXERSISE_ADD_COUNT = 2;
const EXERSISE_SUBTRACT_COUNT = 4;
const EXERSISE_COUNT = EXERSISE_ADD_COUNT + EXERSISE_SUBTRACT_COUNT;

const EXERSISES_ON_PAGE = 28;
const EXERSISES_IN_COLUMN = 7;

const PROBABILITY_THOUSAND = 0.1;
const PROBABILITY_SIMPLE_SUBTRACT = 0.02;
const PROBABILITY_SIMPLE_ADD = 0.08;

const digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

function choose(choices) {
    let index = Math.floor(Math.random() * choices.length);
    return choices[index];
}


function randomLimited(startIndex = 0, endIndex = 10) {
    let slice = digits.slice(startIndex, endIndex + 1);
    return choose(slice);
}

function randomNumber_1000(shift = 1) {
    return Math.floor(Math.random() * 10000) % ( (10 - shift) * 100) + shift * 100;
}


function get_exercise_block(){
    // additions
    let parts = [];

    for(let i = 0 ; i < EXERSISE_ADD_COUNT; i++) {
        let first_number = 0;
        let second_number = 0;
        first_number = randomNumber_1000();
        let temp_number = first_number;
        const divider = 10;
        let iteration = 0;
        while (temp_number > 10) {
            let digit = 0;
            let chunk = temp_number % divider;
            temp_number = Math.floor(temp_number / divider);
            if (Math.random() <= PROBABILITY_SIMPLE_ADD){
                digit = randomLimited(0, 10 - chunk);
            } else {
                let limit = chunk == 0 ? 0 : 9 - chunk;
                digit = randomLimited(limit);
            }

            second_number = second_number + digit * Math.floor(Math.pow(divider, iteration));
            iteration++;
        }
        let hundreds = randomLimited(0, 10 - temp_number - 1);
        if(hundreds){
            second_number += hundreds * 100;
        }

        parts.push(
            {
                representation: `${first_number} + ${second_number}`
            }
        );


    }


    for(let i = 0 ; i < EXERSISE_SUBTRACT_COUNT; i++) {
        let first_number = 0;
        let second_number = 0;
        if(Math.random() <= PROBABILITY_THOUSAND){
            first_number =  1000;
            second_number = randomNumber_1000(randomLimited(0,10));
        } else {
            first_number = randomNumber_1000(randomLimited(1,10));

            let temp_number = first_number;
            const divider = 10;
            let iteration = 0;
            while (temp_number > 10) {
                let digit = 0;
                let chunk = temp_number % divider;
                temp_number = Math.floor(temp_number / divider);
                if (Math.random() <= PROBABILITY_SIMPLE_SUBTRACT){
                    if(chunk == 0){
                        digit = 0;
                    } else {
                        digit = randomLimited(0, chunk);
                    }
                } else {
                    if(chunk == 0) {
                        digit = randomLimited(0, 10);
                    } else {
                        digit = randomLimited(chunk);
                    }
                }

                second_number = second_number + digit * Math.floor(Math.pow(divider, iteration));
                iteration++;
            }
            let hundreds = randomLimited(1, temp_number - 1);
            if(hundreds){
                second_number += hundreds * 100;
            } else {
                if(first_number > 199){
                    second_number += 100;
                }
            }


        }

        parts.push(
            {
                representation: `${first_number} - ${second_number}`
            }
        );



    }

    return parts;
}

let block = '';

for(let exercise_block_index = 0; exercise_block_index < EXERSISES_ON_PAGE; exercise_block_index++){
    let exersize_block = get_exercise_block();
    for(let exercise_index = 0; exercise_index < EXERSISE_COUNT; exercise_index++){
        let exercise_string = (exersize_block  && exersize_block[exercise_index] && exersize_block[exercise_index].representation) || '';
        block = block + `${exercise_index + 1}. ${exercise_string}\n`;
    }
    block = block + '\n';
    if((exercise_block_index + 1) % EXERSISES_IN_COLUMN == 0){
        block = block + '\n\n';
    }
}

clipboardy.writeSync(block);