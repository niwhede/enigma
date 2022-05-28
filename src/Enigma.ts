import { Reflector } from "./Reflector";
import { Rotor } from "./Rotor";

export class Enigma {
  rotors: Rotor[];
  reflector: Reflector;

  constructor(rotors: Rotor[], reflector: Reflector) {
    this.rotors = rotors;
    this.reflector = reflector;
  }

  getEncodingChain() {
    return [...this.rotors, this.reflector, ...this.rotors.slice().reverse()];
  }

  encodeChar(char: string) {
    const rotors = this.getEncodingChain();
    const res = rotors.reduce((encoded, rotor, i) => {
      if (rotor instanceof Rotor) {
        if (i === 0) {
          rotor.rotate(1);
          if (rotor.getNotchPosition() === rotor.getPosition() - 1) {
            (rotors[i + 1] as Rotor).rotate(1);
          }
          return rotor.encode(encoded, "f");
        } else if (i < 4) {
          return rotor.encode(encoded, "f");
        } else {
          return rotor.encode(encoded, "b");
        }
      } else {
        // at reflector
        return rotor.encode(encoded, "f");
      }
    }, char);
    this.printRotorPosition();
    return res;
  }

  encode(message: string) {
    return message
      .split("")
      .map((char) => {
        console.log("--------------------------------------");
        return this.encodeChar(char);
      })
      .join("");
  }

  getRotorPositions() {
    return this.rotors.map((r) => r.getPosition());
  }

  printRotorPosition() {
    console.log(this.rotors.map((r) => `${r.getName()}: ${r.getPosition()}`));
  }
}
