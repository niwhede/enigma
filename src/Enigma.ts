import { Reflector } from "./Reflector";
import { Rotor } from "./Rotor";

export class Enigma {
  rotors: Rotor[];
  reflector: Reflector;

  constructor(rotors: Rotor[], reflector: Reflector) {
    this.rotors = rotors;
    this.reflector = reflector;
  }

  encode(char: string) {
    const forward = [
      ...this.rotors,
      this.reflector,
      ...this.rotors.reverse(),
    ].reduce((encoded, rotor, i) => {
      encoded = rotor.encode(encoded, i > 3 ? "backwards" : "forwards");
      console.log(`Step: ${i + 1} -> ${encoded}`);
      return encoded;
    }, char);
    return forward;
  }
}
