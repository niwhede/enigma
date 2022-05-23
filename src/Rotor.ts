import { Encoder } from "./Encoder";

export class Rotor extends Encoder {
  static CYPHER = {
    I: "EKMFLGDQVZNTOWYHXUSPAIBRCJ",
    II: "AJDKSIRUXBLHWTMCQGZNPYFVOE",
    III: "BDFHJLCPRTXVZNYEIWGAKMUSQO",
    IV: "ESOVPZJAYQUIRHXLNFTGKDCMWB",
    V: "VZBRGITYUPSDNHLXAWMJQOFECK",
  };

  private ringPosition: number;
  private position: number;

  constructor(cypher: string, ringPosition: number, position: number) {
    super(cypher);
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
