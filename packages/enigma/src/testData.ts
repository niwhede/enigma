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
    phrase: "NIWHEDE",
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
  {
    rotors: [{ ...RotorIII, ringPos: 2 }, RotorII, RotorI],
    reflector: Reflector.CYPHER.B,
    input: "AAA",
    output: "UBD",
  },
  {
    rotors: [RotorIII, RotorII, RotorI],
    reflector: Reflector.CYPHER.B,
    input: "OPCILLAZFXLQTDNLGGLEKDIZOKQKGXIEZKD",
    output: "THEQUICKBROWNFOXJUMPSOVERTHELAZYDOG",
  },
  {
    rotors: [RotorI, RotorII, RotorIII],
    reflector: Reflector.CYPHER.B,
    input:
      "I BELIEVE THAT AT THE END OF THE CENTURY THE USE OF WORDS AND GENERAL EDUCATED OPINION WILL HAVE ALTERED SO MUCH THAT ONE WILL BE ABLE TO SPEAK OF MACHINES THINKING WITHOUT EXPECTING TO BE CONTRADICTED",
    output:
      "LUTCSDIKMXJDGCUKOSBNZVGQTHCDUOTVZDTQRSMHCTCBRCYUONFXBPUPTVQRPTRBGFONCUALJSONEXZYPPGXOFAYIOFHADQKSTJOZIVRJOCHRRMJKTERZWGYFRHYHJJGZDYRLNACOVRVULCCJBTLVSWKHDASCFNXBTQJA",
  },
];
