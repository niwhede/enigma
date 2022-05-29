import { Reflector } from "./Reflector";
import { Rotor } from "./Rotor";

const RotorIII = {
  rotor: Rotor.ROTOR.III,
  startPos: 1,
  ringPos: 1,
};

const RotorIIIAtNotch = {
  rotor: Rotor.ROTOR.III,
  startPos: 22,
  ringPos: 1,
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

// ADU
const DoubleRotation = [
  { ...RotorIII, startPos: 21 },
  { ...RotorII, startPos: 4 },
  RotorI,
];

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
    rotors: [RotorIIIAtNotch, RotorII, RotorI],
    reflector: Reflector.CYPHER.B,
    input: "A",
    output: "U",
  },
  {
    rotors: [RotorIII, RotorII, RotorI],
    reflector: Reflector.CYPHER.B,
    input: "J",
    output: "S",
  },
  {
    rotors: [RotorIII, RotorII, RotorI],
    reflector: Reflector.CYPHER.B,
    input: "JOHANSANNALOWEMAXNIWHEDE",
    output: "SITGCXCMVTOHDBACQSDKWPFZ",
  },
  {
    rotors: [RotorIII, RotorII, RotorI],
    reflector: Reflector.CYPHER.B,
    input:
      "ANDALLMYDAYSARETRANCESANDALLMYNIGHTLYDREAMSAREWHERETHYGREYEYEGLANCESANDWHERETHYFOOTSTEPGLEAMSINWHATETHEREALDANCESBYWHATETERNALSTREAMS",
    output:
      "BQJGUIOERTZABMSWPLYIYIQQVXMOINFXQSXAWBFTXDYIHTSAALZVVFOHCOBFMBITXVYAOYMVJQOHWKPCTRORESIVQUIXKRCZSEYBNZGHPJFLZDAVIKZSKXJLURTWBTTJPMJND",
  },
  {
    rotors: DoubleRotation,
    reflector: Reflector.CYPHER.B,
    input: "JOHAN",
    output: "MNFBV",
  },
  {
    rotors: [RotorIII, RotorII, RotorI],
    reflector: Reflector.CYPHER.B,
    plugboard: "AB",
    input: "AAA",
    output: "BJL",
  },
];
