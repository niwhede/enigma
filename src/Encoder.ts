export abstract class Encoder {
  static ALPHA = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  cypher: string;

  constructor(cypher: string) {
    this.cypher = cypher;
  }

  rotateCypher(cypher: string, steps: number) {
    const n = steps % cypher.length;
    return cypher.slice(n) + cypher.slice(0, n);
  }

  encode(char: string, offset: number, direction: "f" | "b" = "f") {
    let result: string;
    const rotatedAlpha = this.rotateCypher(Encoder.ALPHA, offset);
    if (direction === "f") {
      const indexInAlpha = Encoder.ALPHA.indexOf(char);
      const encodedChar = this.cypher[indexInAlpha];
      const indexInRotatedAlpha = rotatedAlpha.indexOf(encodedChar);
      result = Encoder.ALPHA[indexInRotatedAlpha];
    } else {
      const indexInAlpha = Encoder.ALPHA.indexOf(char);
      const charAtIndex = rotatedAlpha[indexInAlpha];
      const indexInCypher = this.cypher.indexOf(charAtIndex);
      result = Encoder.ALPHA[indexInCypher];
    }
    console.log(char, this.cypher, result);
    return result;
  }
}
