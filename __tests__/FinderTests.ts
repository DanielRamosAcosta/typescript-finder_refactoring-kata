import { Thing } from "../src/Thing";
import { Finder } from "../src/Finder";
import { FT } from "../src/FT";
import { F } from "../src/F";

describe("FinderTests", () => {
  let sue: Thing
	let greg: Thing
	let sarah: Thing
  let mike: Thing

  beforeEach(() => {
    sue = new Thing();
    greg = new Thing();
    sarah = new Thing();
    mike = new Thing();

    sue.name = "Sue";
		sue.birthDate = new Date(1950, 0, 1);
		greg.name = "Greg";
		greg.birthDate = new Date(1952, 5, 1);
		sarah.name = "Sarah";
		sarah.birthDate = new Date(1982, 0, 1);
		mike.name = "Mike";
		mike.birthDate = new Date(1979, 0, 1);
  })

  it("returns empty results when given empty list", () => {
		const list: Thing[] = [];
		const finder = new Finder(list);

    const result: F = finder.Find(FT.One);
    
    expect(result.P1).toBeUndefined()
    expect(result.P2).toBeUndefined()
  })

  it("returns empty results when given one person", () => {
		const list: Thing[] = [];
		list.push(sue);

		const finder = new Finder(list);

		const result = finder.Find(FT.One);

		expect(result.P1).toBeUndefined()
    expect(result.P2).toBeUndefined()
  })

  it("returns closest two for two people", () => {
		const list: Thing[]  = [];
		list.push(sue);
		list.push(greg);
		const finder = new Finder(list);

		const result = finder.Find(FT.One);

    expect(result.P1).toEqual(sue)
    expect(result.P2).toEqual(greg)
  })
  
  it("returns furthest two for two people", () => {
		const list: Thing[] = [];
		list.push(mike);
		list.push(greg);

		const finder = new Finder(list);

		const result = finder.Find(FT.Two);

    expect(result.P1).toEqual(greg)
    expect(result.P2).toEqual(mike)
  })

  it("returns furthest two for four people", () => {
		const list: Thing[] = []
		list.push(sue);
		list.push(sarah);
		list.push(mike);
		list.push(greg);
		const finder = new Finder(list);

		const result = finder.Find(FT.Two);

    expect(result.P1).toEqual(sue)
    expect(result.P2).toEqual(sarah)
  })
  
  it("returns closest two for four people", () => {
		const list: Thing[] = []
		list.push(sue);
		list.push(sarah);
		list.push(mike);
		list.push(greg);

		const finder = new Finder(list);

		const result = finder.Find(FT.One);

    expect(result.P1).toEqual(sue)
    expect(result.P2).toEqual(greg)
  })
})
