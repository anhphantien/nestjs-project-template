const usaStates = require('usa-states').UsaStates;

export const listOfStatesAndTerritoriesOfUSA = () => {
  const statesAndTerritoriesOfUSA = [];
  for (const stateOrTerritoryOfUSA of new usaStates().states) {
    statesAndTerritoriesOfUSA.push({
      name: stateOrTerritoryOfUSA.name,
      abbreviation: stateOrTerritoryOfUSA.abbreviation,
    });
  }
  return statesAndTerritoriesOfUSA;
}
