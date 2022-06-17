import { Enigma } from "../Enigma/Enigma";
import { Plugboard } from "../Enigma/Plugboard";
import { Reflector } from "../Enigma/Reflector";
import { Rotor } from "../Enigma/Rotor";

export class Bombe {
  static ALPHA = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  deductions: string[];
  checkedPlugboardSettings: string[];

  constructor() {
    this.deductions = [];
    this.checkedPlugboardSettings = [];
  }

  decode(message: string, crib: string) {
    const start = message.length - crib.length;
    const end = start + crib.length;
    const match = message.slice(message.length - crib.length, end);
    const encodedLetters = crib
      .split("")
      .map((c, i) => ({ output: match[i], input: c }));
    // const result = this.encode(mostUsedLetter.input, plugboardAssumption); // TODO start should be first occurance of most used letter
    do {
      const mostUsedLetter = { input: "A", output: "Z" };
      const plugboardAssumption = "AT";
      this.deductions.push(plugboardAssumption);
      const rotorEncryption = this.encode("T", this.deductions.join(" "));
      console.log("rotorEncryption", rotorEncryption);
      this.deductions.push(`${rotorEncryption}${mostUsedLetter.output}`);
    } while (
      this.findContradictions().length === 0 ||
      this.deductions.length === 10
    );

    console.log("this.deductions", this.deductions);
    this.checkedPlugboardSettings = [
      ...this.checkedPlugboardSettings,
      ...this.deductions,
    ];
    console.log("this.checkedPlugboardSettings", this.checkedPlugboardSettings);
  }

  encode(char: string, plugboardAssumption?: string) {
    const enigma = new Enigma(
      [
        new Rotor(Rotor.ROTOR.I, 1, 1),
        new Rotor(Rotor.ROTOR.II, 1, 1),
        new Rotor(Rotor.ROTOR.V, 1, 1),
      ],
      new Reflector(Reflector.CYPHER.B),
      new Plugboard(plugboardAssumption)
    );
    return enigma.encode(char);
  }

  findDuplicates(array: string[]) {
    return array.filter((item, index) => array.indexOf(item) !== index);
  }

  findContradictions() {
    const sorted = this.deductions.map((deduction) => {
      return deduction
        .split("")
        .sort((a, b) => a.localeCompare(b))
        .join("");
    });
    return this.findDuplicates(sorted);
  }
}
