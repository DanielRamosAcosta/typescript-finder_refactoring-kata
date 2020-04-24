import { Person } from "./Person"
import { FinderCriteria } from "./FinderCriteria"
import { PersonPair } from "./PersonPair"

export class Finder {
  private allPossiblePairs: PersonPair[]
  private sortedPairs: PersonPair[]

  constructor(people: Person[]) {
    this.allPossiblePairs = this.computeAllPossiblePairs(people)
    this.sortedPairs = this.sortPairs(this.allPossiblePairs)
  }

  find(finderType: FinderCriteria): PersonPair {
    if (this.allPossiblePairs.length < 1) {
      return new PersonPair()
    }

    switch (finderType) {
      case FinderCriteria.CLOSEST:
        return this.sortedPairs[0]
      case FinderCriteria.FURTHEST:
        return this.sortedPairs[this.sortedPairs.length - 1]
    }

    return new PersonPair()
  }

  private sortPairs(personPairs: PersonPair[]) {
    return [...personPairs].sort(
      (a, b) => a.birthDateDistanceInMs - b.birthDateDistanceInMs,
    )
  }

  private computeAllPossiblePairs(people: Person[]) {
    let personPairs: PersonPair[] = []

    for (let i = 0; i < people.length - 1; i++) {
      for (let j = i + 1; j < people.length; j++) {
        let r = new PersonPair()
        if (people[i].birthDate.getTime() < people[j].birthDate.getTime()) {
          r.firstPerson = people[i]
          r.secondPerson = people[j]
        } else {
          r.firstPerson = people[j]
          r.secondPerson = people[i]
        }
        r.birthDateDistanceInMs =
          r.secondPerson.birthDate.getTime() - r.firstPerson.birthDate.getTime()
        personPairs.push(r)
      }
    }
    return personPairs
  }
}
