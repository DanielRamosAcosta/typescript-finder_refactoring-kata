import { Person } from "../src/Person"
import { Finder } from "../src/Finder"
import { FinderCriteria } from "../src/FinderCriteria"
import { PersonPair } from "../src/PersonPair"

describe("FinderTests", () => {
  let sue: Person
  let greg: Person
  let sarah: Person
  let mike: Person

  beforeEach(() => {
    sue = new Person()
    greg = new Person()
    sarah = new Person()
    mike = new Person()

    sue.name = "Sue"
    sue.birthDate = new Date(1950, 0, 1)
    greg.name = "Greg"
    greg.birthDate = new Date(1952, 5, 1)
    sarah.name = "Sarah"
    sarah.birthDate = new Date(1982, 0, 1)
    mike.name = "Mike"
    mike.birthDate = new Date(1979, 0, 1)
  })

  it("returns empty results when given empty list", () => {
    const list: Person[] = []
    const finder = new Finder(list)

    const result: PersonPair = finder.find(FinderCriteria.CLOSEST)

    expect(result.firstPerson).toBeUndefined()
    expect(result.secondPerson).toBeUndefined()
  })

  it("returns empty results when given one person", () => {
    const list: Person[] = []
    list.push(sue)

    const finder = new Finder(list)

    const result = finder.find(FinderCriteria.CLOSEST)

    expect(result.firstPerson).toBeUndefined()
    expect(result.secondPerson).toBeUndefined()
  })

  it("returns closest two for two people", () => {
    const list: Person[] = []
    list.push(sue)
    list.push(greg)
    const finder = new Finder(list)

    const result = finder.find(FinderCriteria.CLOSEST)

    expect(result.firstPerson).toEqual(sue)
    expect(result.secondPerson).toEqual(greg)
  })

  it("returns furthest two for two people", () => {
    const list: Person[] = []
    list.push(mike)
    list.push(greg)

    const finder = new Finder(list)

    const result = finder.find(FinderCriteria.FURTHEST)

    expect(result.firstPerson).toEqual(greg)
    expect(result.secondPerson).toEqual(mike)
  })

  it("returns furthest two for four people", () => {
    const list: Person[] = []
    list.push(sue)
    list.push(sarah)
    list.push(mike)
    list.push(greg)
    const finder = new Finder(list)

    const result = finder.find(FinderCriteria.FURTHEST)

    expect(result.firstPerson).toEqual(sue)
    expect(result.secondPerson).toEqual(sarah)
  })

  it("returns closest two for four people", () => {
    const list: Person[] = []
    list.push(sue)
    list.push(sarah)
    list.push(mike)
    list.push(greg)

    const finder = new Finder(list)

    const result = finder.find(FinderCriteria.CLOSEST)

    expect(result.firstPerson).toEqual(sue)
    expect(result.secondPerson).toEqual(greg)
  })
})
