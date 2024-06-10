


const foodWithCalories = [
    { foodName: "tomato", calories: 20 },
    { foodName: "bread", calories: 30 },
    { foodName: "water", calories: 0 },
    { foodName: "mayonaise", calories: 200 },
    { foodName: "orange", calories: 80 }
];

const deepClone = <T>(arrToClone: T[]): T[] => JSON.parse(JSON.stringify(arrToClone));

type OnlyNumberProperties<T> = {
    [K in keyof T]: T[K] extends number ? K : never
}[keyof T]

function selectionSort<T>(unorderedArray: T[] = [], orderBy: OnlyNumberProperties<T>) {

    let temporalArray = deepClone(unorderedArray);

    function findSmallest(inputArray, keyToCompare) {
        let smallest = inputArray[0];
        let smallestIndex = 0;
        inputArray.forEach((element, index) => {
            if (element[keyToCompare] < smallest[keyToCompare]) {
                smallest = element;
                smallestIndex = index;
            }
        });
        return [smallest, smallestIndex];
    }

    const sortedArray: T[] = [];
    while (temporalArray.length) {
        let [currentSmallest, smallestIndex] = findSmallest(temporalArray, orderBy);
        sortedArray.push(currentSmallest);
        temporalArray.splice(smallestIndex, 1);
    }
    return sortedArray;
}

const result = selectionSort(foodWithCalories, "calories");

console.log('#######', JSON.stringify(result, null, 2))