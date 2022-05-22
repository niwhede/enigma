import { Enigma } from "./Enigma";
import { Rotor } from "./Rotor";

const enigma = new Enigma([
  new Rotor(Rotor.CYPHER.I, 1, 1),
  new Rotor(Rotor.CYPHER.II, 1, 1),
  new Rotor(Rotor.CYPHER.III, 1, 1),
]);

const result = enigma.encode("A");
console.log("result", result);
