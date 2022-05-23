import { Enigma } from "../Enigma";
import { Reflector } from "../Reflector";
import { Rotor } from "../Rotor";

describe("I II III", () => {
  let enigma: Enigma;
  beforeEach(() => {
    enigma = new Enigma(
      [
        new Rotor(Rotor.CYPHER.I, 1, 1),
        new Rotor(Rotor.CYPHER.II, 1, 1),
        new Rotor(Rotor.CYPHER.III, 1, 1),
      ],
      new Reflector(Reflector.CYPHER.B)
    );
  });
  test("should encode one char ", () => {
    const result = enigma.encode("A");
    expect(result).toEqual("F");
    console.log("what", enigma.getRotorPositions());
  });
  test("should encode two chars", () => {
    expect(enigma.encode("A")).toEqual("N");
    expect(enigma.encode("B")).toEqual("W");
    expect(enigma.getRotorPositions()).toEqual([2, 1, 1]);
  });
});
