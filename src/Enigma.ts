import { Rotor } from "./Rotor";

export class Enigma {
  rotors: Rotor[];

  constructor(rotors: Rotor[]) {
    this.rotors = rotors;
  }

  encode(char: string) {
    return this.rotors.reduce((encoded, rotor) => {
      encoded = rotor.encode(encoded);
      return encoded;
    }, char);
  }
}
