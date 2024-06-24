
function binarySearch<T extends { name: string }>(list: T[], nameToSearch: T["name"]) {
    let lowBorder = 0;
    let highBorder = list.length - 1;
    while (lowBorder <= highBorder) {
        let middleElement = Math.round(lowBorder + highBorder / 2);
        let guess = list[middleElement];
        if (guess.name === nameToSearch) {
            return guess;
        }
        (guess.name > nameToSearch) ?
            highBorder = middleElement - 1 : lowBorder = middleElement + 1;
    }
    return null;
}

const exampleArray = [{ name: "AAAA", id: 1 }, { name: "BBBB", id: 8 }, { name: "MMMM", id: 9 }, { name: "YYYY", id: 10 }, { name: "CCCC", id: 3 }, { name: "NNNN", id: 6 }];

function sortByName<T extends { name: string }>(a: T, b: T) {
    return a.name > b.name ? 1 : -1
}

const sortedArray = exampleArray.sort(sortByName);

const binarySearchResult = binarySearch(sortedArray, "BBBB");

console.log('check', JSON.stringify({ sortedArray, result }, null, 2));