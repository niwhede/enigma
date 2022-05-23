import { Enigma } from "./Enigma";
import { Reflector } from "./Reflector";
import { Rotor } from "./Rotor";

const enigma = new Enigma(
  [
    new Rotor(Rotor.ROTOR.III, 1, 26),
    new Rotor(Rotor.ROTOR.II, 1, 1),
    new Rotor(Rotor.ROTOR.I, 1, 1),
  ],
  new Reflector(Reflector.CYPHER.B)
);

const result = enigma.encode("A");
console.log("result", result);
