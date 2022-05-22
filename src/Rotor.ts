import { Encoder } from "./Encoder";

export class Rotor extends Encoder {
  static CYPHER = {
    I: "EKMFLGDQVZNTOWYHXUSPAIBRCJ",
    II: "AJDKSIRUXBLHWTMCQGZNPYFVOE",
    III: "BDFHJLCPRTXVZNYEIWGAKMUSQO",
    IV: "ESOVPZJAYQUIRHXLNFTGKDCMWB",
    V: "VZBRGITYUPSDNHLXAWMJQOFECK",
  };

  ringPosition: number;
  initialPosition: number;

  constructor(cypher: string, ringPosition: number, initialPosition: number) {
    super(cypher);
    this.ringPosition = ringPosition;
    this.initialPosition = initialPosition;
  }
}
