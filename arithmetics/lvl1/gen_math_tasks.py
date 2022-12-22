from datetime import date
import random

LIMIT = 100
ITERATIONS = 14
COLUMNS = 12

random.seed()

def random_first():
    return random.randint(1, LIMIT)

def random_sign():
        return random.randint(0,1)

def random_second(first, sign):
    if sign:
        return random.randint(1, first)
    else:
        return random.randint(1, LIMIT - first)

for column in range(1, COLUMNS + 1):
    for task in range(1, ITERATIONS + 1):
        first, sign = random_first(), random_sign()
        second = random_second(first, sign)
        printedSign = "-" if sign else "+"
        print(f'{task:{2}}.  {first} {printedSign} {second}')
    print('')
