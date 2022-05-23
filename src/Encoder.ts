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
    if (direction === "f") {
      let index = Encoder.ALPHA.indexOf(char) + offset; // Where char is in rotated alpahet
      result = this.cypher[index - offset]; // The char it encodes to
      index = Encoder.ALPHA.indexOf(result) - offset; // The index of that char in rotated alphabet
      result = Encoder.ALPHA[index]; // The char at that index in the alphabet
    } else {
      let index = Encoder.ALPHA.indexOf(char) + offset;
      let charAtIndex = Encoder.ALPHA[index];
      let indexInCypher = this.cypher.indexOf(charAtIndex);
      let testResult = Encoder.ALPHA[indexInCypher];
      result = testResult;
    }
    console.log(char, this.cypher, result);
    return result;
  }
}
