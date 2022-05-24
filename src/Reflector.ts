import { Encoder } from "./Encoder";

export class Reflector extends Encoder {
  static CYPHER = {
    A: "EJMZALYXVBWFCRQUONTSPIKHGD",
    B: "YRUHQSLDPXNGOKMIEBFZCWVJAT",
    C: "FVPJIAOYEDRZXWGCTKUQSBNMHL",
  };

  constructor(cypher: string) {
    super(cypher, "Reflector");
  }
}
