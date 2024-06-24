
type CountryConnections = { [key: string]: CountryConnections | {} };

export const countriesOnThisLevel = (countries: CountryConnections) => Object.keys(countries);

export function filterAlredySearched(searched: string[], remains: CountryConnections) {
    if (!searched.length) return remains;
    const countryConnections: string[] = countriesOnThisLevel(remains);
    const filteredCountries: CountryConnections = {};
    countryConnections.forEach(country => {
        const countryIsIncluded = searched.includes(country);
        if (!countryIsIncluded) {
            filteredCountries[country] = remains[country]
        }
    });    
    return filteredCountries;
}

export function updateNextLevelToSearch(remainsToBeSearched: CountryConnections, currentLevelCountries: string[]) {
    const innerStepBelow: CountryConnections = {}
    currentLevelCountries.forEach(countryToInclude => {
        const innerConnections: CountryConnections = remainsToBeSearched[countryToInclude];
        if (countriesOnThisLevel(innerConnections).length) {
            countriesOnThisLevel(innerConnections).forEach((currentCountry) => {
                if(currentCountry in innerConnections && !innerStepBelow?.currentCountry){
                    innerStepBelow[currentCountry] = innerConnections[currentCountry]
                }
            })
        }
    });    
    return innerStepBelow;
}

function searchGraphShortestPath(graphOfConnections: CountryConnections = {}, country: string) {
    let nested = 0;
    let remainsToBeSearched = graphOfConnections;
    let searched: string[] = [];

    while (countriesOnThisLevel(remainsToBeSearched).length) {
        remainsToBeSearched = filterAlredySearched(searched, remainsToBeSearched);
        const currentLevelCountries = countriesOnThisLevel(remainsToBeSearched);
        const foundCountry = currentLevelCountries.includes(country);
        if (foundCountry) {
            return { found: remainsToBeSearched[country], steps: nested };
        }
        searched = [...searched, ...currentLevelCountries];
        remainsToBeSearched = updateNextLevelToSearch(remainsToBeSearched, currentLevelCountries);
        nested++
    }
    return { found: 'not found' }
}

const usa = {
    hereIs: "here is"
}

const guyana = {
    suriname: {},
    frenchGuiana: {}
}
const paraguay = {
    guyana,
    suri: {},
};

const bolivia = {
    paraguay,
    guyana,
}

const venezuela = {
    bolivia,
};

const peru = {
    ecuador: {},
    venezuela,
    usa,
};

const argentina: CountryConnections = {
    peru,
    bolivia,
}

const brasil = {
    argentina,
    peru,
};

const canada = {
    usa,
    argentina,
};

const colombia: CountryConnections = {
    brasil,
    venezuela,
    canada,
};

const chile: CountryConnections = {
    brasil,
    canada,
};

const nicaragua = {
    honduras: {},
    costaRica: {}
};

const uruguay = {
    nicaragua,
    colombia,
};

export const flightConnections: CountryConnections = {
    paraguay,
    bolivia,
    argentina,
    brasil,
    colombia,
    uruguay
}

const resultGraph = searchGraphShortestPath(flightConnections, 'usa');
console.log(resultGraph)