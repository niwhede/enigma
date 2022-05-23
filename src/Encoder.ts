export abstract class Encoder {
  // this can be string?
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

  // getInvertedCypher() {
  //   const result = Encoder.ALPHA.map((letter) => {
  //     return {};
  //   });
  //   return result;
  // }

  encode(char: string, direction: "f" | "b" = "f") {
    let result: string;
    if (direction === "f") {
      const index = Encoder.ALPHA.indexOf(char);
      result = this.cypher[index];
    } else {
      const index = this.cypher.indexOf(char);
      result = Encoder.ALPHA[index];
    }
    console.log(char, this.cypher, result);
    return result;
  }
}
