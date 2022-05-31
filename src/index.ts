import { Bombe } from "./Bombe";
import { Enigma } from "./Enigma";
import { Plugboard } from "./Plugboard";
import { Reflector } from "./Reflector";
import { Rotor } from "./Rotor";
import { testData } from "./testData";

console.clear();
const i = parseInt(process.argv[2], 10);
const test = testData[i];
const enigma = new Enigma(
  test.rotors.map((r) => new Rotor(r.rotor, r.startPos, r.ringPos)),
  new Reflector(test.reflector),
  new Plugboard(test.plugboard)
);

const bombe = new Bombe();

console.log("Rotor start position", enigma.getRotorPositions());
const result = enigma.encode(test.input);
console.log("");
console.log("enc:", result);
console.log("act:", test.output);
console.log("Rotor end position", enigma.getRotorPositions());
console.log(`---------------------`);
console.log("Decrypted:");
// console.log(bombe.decrypt(result, test.phrase as string));
