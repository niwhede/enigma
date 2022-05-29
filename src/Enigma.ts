import { Plugboard } from "./Plugboard";
import { Reflector } from "./Reflector";
import { Rotor } from "./Rotor";

export class Enigma {
  rotors: Rotor[];
  reflector: Reflector;
  plugboard: Plugboard;

  constructor(rotors: Rotor[], reflector: Reflector, plugboard: Plugboard) {
    this.rotors = rotors;
    this.reflector = reflector;
    this.plugboard = plugboard;
  }

  getEncodingChain() {
    return [...this.rotors, this.reflector, ...this.rotors.slice().reverse()];
  }

  encodeChar(char: string) {
    const plugboardEncryption = this.plugboard.encode(char);
    const rotors = this.getEncodingChain();
    const res = rotors.reduce((encoded, rotor, i) => {
      if (rotor instanceof Rotor) {
        if (i < 4) {
          return rotor.encode(encoded, "f");
        } else {
          return rotor.encode(encoded, "b");
        }
      } else {
        // reflector
        return rotor.encode(encoded, "f");
      }
    }, plugboardEncryption);
    return this.plugboard.encode(res);
  }

  rotateRotors() {
    let mvFirts = 1;
    let mvSecond = 0;
    let mvThird = 0;

    const [firstRotor, secondRotor, thirdRotor] = this.rotors;
    mvFirts = 1;

    if (firstRotor.getNotchPosition() === firstRotor.getPosition()) {
      mvSecond = mvSecond + 1;
    }
    if (secondRotor.getNotchPosition() === secondRotor.getPosition()) {
      mvSecond = mvSecond + 1;
      mvThird = mvThird + 1;
    }

    firstRotor.rotate(mvFirts);
    secondRotor.rotate(mvSecond);
    thirdRotor.rotate(mvThird);
  }

  encode(message: string) {
    return message
      .split("")
      .map((char) => {
        this.rotateRotors();
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
