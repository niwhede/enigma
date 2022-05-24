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
    const res = this.getEncodingChain().reduce((encoded, rotor, i) => {
      let offset = 0;
      if (rotor instanceof Rotor) {
        if (i === 0) {
          rotor.rotate(1);
          return rotor.encode(encoded, rotor.getPosition() - 1, "f");
        } else if (i < 4) {
          offset = rotor.getPosition() - 1;
          return rotor.encode(encoded, offset, "f");
        } else {
          offset = rotor.getPosition() - 1;
          return rotor.encode(encoded, offset, "b");
        }
      } else {
        // at reflector
        return rotor.encode(encoded, 0, "f");
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
