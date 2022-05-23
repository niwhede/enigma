import { Enigma } from "../Enigma";
import { Reflector } from "../Reflector";
import { Rotor } from "../Rotor";

describe("I II III", () => {
  let enigma: Enigma;
  beforeEach(() => {
    enigma = new Enigma(
      [
        new Rotor(Rotor.ROTOR.I, 1, 1),
        new Rotor(Rotor.ROTOR.II, 1, 1),
        new Rotor(Rotor.ROTOR.III, 1, 1),
      ],
      new Reflector(Reflector.CYPHER.B)
    );
  });
  test("should encode one char ", () => {
    const result = enigma.encodeChar("A");
    expect(result).toEqual("F");
    console.log("what", enigma.getRotorPositions());
  });
  test("should encode two chars", () => {
    expect(enigma.encodeChar("A")).toEqual("N");
    expect(enigma.encodeChar("B")).toEqual("W");
    expect(enigma.getRotorPositions()).toEqual([2, 1, 1]);
  });
});
