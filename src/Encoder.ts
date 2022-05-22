export abstract class Encoder {
  static ALPHA = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
  ];

  cypher: string;

  constructor(cypher: string) {
    this.cypher = cypher;
  }

  encode(char: string, direction: "forwards" | "backwards" = "forwards") {
    if (direction === "forwards") {
      const index = Encoder.ALPHA.indexOf(char);
      return this.cypher[index];
    } else {
      const index = this.cypher.indexOf(char);
      return Encoder.ALPHA[index];
    }
  }
}
