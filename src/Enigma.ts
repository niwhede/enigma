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

  encode(char: string) {
    return this.getEncodingChain().reduce((encoded, rotor, i) => {
      if (rotor instanceof Rotor) {
        if (i === 0) {
          rotor.rotate();
        }
      }
      encoded = rotor.encode(encoded, i > 3 ? "b" : "f");
      return encoded;
    }, char);
  }

  getRotorPositions() {
    return this.rotors.map((r) => r.getPosition());
  }
}
