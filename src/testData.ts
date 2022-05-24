import { Reflector } from "./Reflector";
import { Rotor } from "./Rotor";

const RotorIII = {
  rotor: Rotor.ROTOR.III,
  startPos: 1,
  ringPos: 1,
};

const RotorIIIAtNotch = {
  rotor: Rotor.ROTOR.III,
  startPos: 1,
  ringPos: 21,
};

const RotorII = {
  rotor: Rotor.ROTOR.II,
  startPos: 1,
  ringPos: 1,
};
const RotorI = {
  rotor: Rotor.ROTOR.I,
  startPos: 1,
  ringPos: 1,
};

export const testData = [
  {
    rotors: [RotorIII, RotorII, RotorI],
    reflector: Reflector.CYPHER.B,
    input: "A",
    output: "B",
  },
  {
    rotors: [RotorIII, RotorII, RotorI],
    reflector: Reflector.CYPHER.B,
    input: "JOHAN",
    output: "SITGC",
  },
  {
    rotors: [RotorIII, RotorII, RotorIIIAtNotch],
    reflector: Reflector.CYPHER.B,
    input: "A",
    output: "U",
  },
];
