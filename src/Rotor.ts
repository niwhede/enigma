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
    super(Rotor.CYPHER[rotorName]);
    this.notchPosition =
      Rotor.CYPHER[rotorName].indexOf(Rotor.NOTCH_POSITION[rotorName]) + 1;
    this.ringPosition = ringPosition;
    this.position = position;
    this.rotorName = rotorName;

    this.rotateCypher(position - 1);
  }

  rotateCypher(steps: number) {
    const n = steps % this.cypher.length;
    this.cypher = this.cypher.slice(n) + this.cypher.slice(0, n);
  }

  rotate(steps: number) {
    this.rotateCypher(steps);
    this.position = this.position + 1;

    if (this.position > 26) {
      this.position = 1;
    }
  }

  getPosition() {
    return this.position;
  }

  getName() {
    return this.rotorName;
  }
}
