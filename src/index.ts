import { Enigma } from "./Enigma";
import { Reflector } from "./Reflector";
import { Rotor } from "./Rotor";

const enigma = new Enigma(
  [
    new Rotor(Rotor.ROTOR.III, 1, 1),
    new Rotor(Rotor.ROTOR.II, 1, 1),
    new Rotor(Rotor.ROTOR.I, 1, 1),
  ],
  new Reflector(Reflector.CYPHER.B)
);
console.clear();
console.log("Rotor start position", enigma.getRotorPositions());
const result = enigma.encode("JOHAN");
console.log("");
console.log("encoded:", result);
console.log("actual:", "SITGC");
console.log("Rotor end position", enigma.getRotorPositions());

console.log(`---------------------`);
console.log(`Expected path:`);
console.log(`Plugboard Encryption: A
Wheel 3 Encryption: C
Wheel 2 Encryption: D
Wheel 1 Encryption: F
Reflector Encryption: S
Wheel 1 Encryption: S
Wheel 2 Encryption: E
Wheel 3 Encryption: B`);
