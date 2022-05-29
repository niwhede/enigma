import { Cypher } from "./Cypher";
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
          return rotor.encode(encoded, "f");
        } else if (i < 4) {
          return rotor.encode(encoded, "f");
        } else {
          return rotor.encode(encoded, "b");
        }
      } else {
        return rotor.encode(encoded, "f");
      }
    }, char);
    return res;
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
    // console.log(this.rotors.map((r) => `${r.getName()}: ${r.getPosition()}`));
    console.log(
      "Rotors Position:",
      this.rotors.map((r) => `${Cypher.ALPHA[r.getPosition() - 1]}`).reverse()
    );
  }
}
