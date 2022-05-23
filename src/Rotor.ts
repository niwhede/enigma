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

  constructor(cypher: RotorName, ringPosition: number, position: number) {
    super(Rotor.CYPHER[cypher]);
    this.notchPosition =
      Rotor.CYPHER[cypher].indexOf(Rotor.NOTCH_POSITION[cypher]) + 1;
    this.ringPosition = ringPosition;
    this.position = position;

    if (this.position > 1) {
      this.rotate(position - 1);
    }
  }

  rotate(steps: number = 1) {
    const n = steps % this.cypher.length;
    this.cypher = this.cypher.slice(n) + this.cypher.slice(0, n);
    this.position = this.position + 1;
    if (this.position >= 26) {
      this.position = 1;
    }
  }

  getPosition() {
    return this.position;
  }
}
