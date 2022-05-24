import { Encoder } from "./Encoder";

type RotorName = "I" | "II" | "III" | "IV" | "V";

export class Rotor extends Encoder {
  static ROTOR: Record<RotorName, RotorName> = {
    I: "I",
    II: "II",
    III: "III",
    IV: "IV",
    V: "V",
  };

  static CYPHER: Record<RotorName, string> = {
    I: "EKMFLGDQVZNTOWYHXUSPAIBRCJ",
    II: "AJDKSIRUXBLHWTMCQGZNPYFVOE",
    III: "BDFHJLCPRTXVZNYEIWGAKMUSQO",
    IV: "ESOVPZJAYQUIRHXLNFTGKDCMWB",
    V: "VZBRGITYUPSDNHLXAWMJQOFECK",
  };

  static NOTCH_POSITION = {
    I: "Q",
    II: "E",
    III: "V",
    IV: "J",
    V: "Z",
  };

  private ringPosition: number;
  private position: number;
  private notchPosition: number;
  private rotorName: RotorName;

  constructor(rotorName: RotorName, ringPosition: number, position: number) {
    super(Rotor.CYPHER[rotorName], rotorName);
    this.notchPosition =
      Encoder.ALPHA.indexOf(Rotor.NOTCH_POSITION[rotorName]) + 1;
    // this.notchPosition =
    //   Rotor.CYPHER[rotorName].indexOf(Rotor.NOTCH_POSITION[rotorName]) + 1;
    this.ringPosition = ringPosition;
    this.position = position;
    this.rotorName = rotorName;

    this.cypher = this.rotateCypher(this.cypher, position - 1);
  }

  rotate(steps: number) {
    this.cypher = this.rotateCypher(this.cypher, steps);
    this.position = this.position + 1;

    if (this.position > 26) {
      this.position = 1;
    }
    return this.position;
  }

  getPosition() {
    return this.position;
  }

  getName() {
    return this.rotorName;
  }

  getNotchPosition() {
    return this.notchPosition;
  }
}
