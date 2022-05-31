export abstract class Cypher {
  static ALPHA = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  name: string;
  input: string;
  cypher: string;

  constructor(cypher: string, name: string) {
    this.input = Cypher.ALPHA;
    this.cypher = cypher;
    this.name = name;
  }

  rotateCypher(cypher: string, steps: number) {
    const n = steps % cypher.length;
    return cypher.slice(n) + cypher.slice(0, n);
  }

  encode(char: string, direction: "f" | "b" = "f") {
    let result: string;

    if (direction === "f") {
      const indexInAlpha = Cypher.ALPHA.indexOf(char);
      const charInCypher = this.cypher[indexInAlpha];
      const indexOfCharInAlpha = this.input.indexOf(charInCypher);
      result = Cypher.ALPHA[indexOfCharInAlpha];
    } else {
      const indexInAlpha = Cypher.ALPHA.indexOf(char);
      const charInInput = this.input[indexInAlpha];
      const indexInCypher = this.cypher.indexOf(charInInput);
      result = Cypher.ALPHA[indexInCypher];
    }
    // console.log(char, this.cypher, result);
    return result;
  }
}
