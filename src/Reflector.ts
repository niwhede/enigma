import { Cypher } from "./Cypher";

export class Reflector extends Cypher {
  static CYPHER = {
    A: "EJMZALYXVBWFCRQUONTSPIKHGD",
    B: "YRUHQSLDPXNGOKMIEBFZCWVJAT",
    C: "FVPJIAOYEDRZXWGCTKUQSBNMHL",
  };

  constructor(cypher: string) {
    super(cypher, "Reflector");
  }
}
