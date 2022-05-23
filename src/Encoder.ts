export abstract class Encoder {
  // this can be string?
  static ALPHA = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  cypher: string;

  constructor(cypher: string) {
    this.cypher = cypher;
  }

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
