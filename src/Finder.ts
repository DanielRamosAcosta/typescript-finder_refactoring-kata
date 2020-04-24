import { Person } from "./Person"
import { FinderCriteria } from "./FinderCriteria"
import { PersonPair } from "./PersonPair"

export class Finder {
  private people: Person[]

  constructor(people: Person[]) {
    this.people = people
  }

  Find(finderType: FinderCriteria): PersonPair {
    let personPairs: PersonPair[] = []

    for (let i = 0; i < this.people.length - 1; i++) {
      for (let j = i + 1; j < this.people.length; j++) {
        let r = new PersonPair()
        if (this.people[i].birthDate.getTime() < this.people[j].birthDate.getTime()) {
          r.P1 = this.people[i]
          r.P2 = this.people[j]
        } else {
          r.P1 = this.people[j]
          r.P2 = this.people[i]
        }
        r.D = r.P2.birthDate.getTime() - r.P1.birthDate.getTime()
        personPairs.push(r)
      }
    }

    if (personPairs.length < 1) {
      return new PersonPair()
    }

    let answer = personPairs[0]

    for (const result of personPairs) {
      switch (finderType) {
        case FinderCriteria.CLOSEST:
          if (result.D < answer.D) {
            answer = result
          }
          break

        case FinderCriteria.FURTHEST:
          if (result.D > answer.D) {
            answer = result
          }
          break
      }
    }

    return answer
  }
}
