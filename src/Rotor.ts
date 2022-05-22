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
  }

  getPosition() {
    return this.position;
  }
}
