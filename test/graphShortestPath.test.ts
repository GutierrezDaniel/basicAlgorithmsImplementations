import { expect, test } from 'vitest';
import { updateNextLevelToSearch, countriesOnThisLevel, filterAlredySearched } from "../src/graphShortestPath"


test('returns an object with the inner level connections', () => {
    const remains = { paraguay: {}, colombia: {}, argentina: {}, brasil: {} };
    const searched = ["colombia", "paraguay"];
    const result = filterAlredySearched(searched, remains);
    expect(countriesOnThisLevel(result)).toEqual(["argentina", "brasil"]);
});

test('returns an object with the inner level connections', () => {
    const connectionExample = {
        paraguay: {
            guyana: {
                suriname: {},
                frenchGuiana: {}
            },
        },
        colombia: { suri: {} },
        australia: {}
    }
    const expected = {
        guyana: {
            suriname: {},
            frenchGuiana: {}
        },
        suri: {},
    }
    const currentLevelCountries = ["paraguay", "colombia"];
    const result = updateNextLevelToSearch(connectionExample, currentLevelCountries);
    expect(result).toEqual(expected);
});