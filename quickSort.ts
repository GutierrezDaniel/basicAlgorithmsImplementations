
const quickSort = (valuesToSort: number[] = []) => {
    if (valuesToSort.length <= 1) return valuesToSort

    const [pivot, ...restOfValues] = valuesToSort;
    const less: number[] = [];
    const greater: number[] = [];

    restOfValues.forEach(currentValue => currentValue <= pivot ? less.push(currentValue) : greater.push(currentValue));

    return [
        ...quickSort(less),
        pivot,
        ...quickSort(greater)
    ]
}


const result = quickSort([27, 3, 5, 7, 1, 56, 4, 23, 8, 9, 9, 10]);

console.log(result);