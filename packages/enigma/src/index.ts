#!/usr/bin/env node

import { Enigma } from "./Enigma";
import { Plugboard } from "./Plugboard";
import { Reflector } from "./Reflector";
import { Rotor, RotorName } from "./Rotor";
import { Command } from "commander";

const program = new Command();

export const getSettings = (input: string) => {
  const rotors = input.split(" ");
  return rotors.map((r) => {
    const [rotor, positions] = r.split(":") as [RotorName, string];
    const [pos, ringPos] = positions.split("-").map(Number);
    return new Rotor(Rotor.ROTOR[rotor], pos, ringPos);
  });
};

const print = (input: string, output: string) => {
  console.log(`
\n
Input: 
--------------------------------------------------
${input.match(/.{1,50}/g)?.join("\n")}
\n
Output: 
--------------------------------------------------
${output.match(/.{1,50}/g)?.join("\n")}
--------------------------------------------------
  `);
};

program.name("Enigma").description("CLI Enigma machine").version("1.0.0");

program
  .command("encode")
  .description("encode a message")
  .argument("<string>", "the message to encode")
  .option("-r --rotors <string>", "rotor settings, e.g III:1-1 II:1-1 I:1-1")
  .option(
    "-p, --plugboard <string>",
    "plugboard settings, e.g AB FC KL MN PE RT VH JX QW GD"
  )
  .option("-v --verbose", "Verbose output")
  .action((str, options) => {
    const message = str.toUpperCase().replace(/ /g, "");
    const rotors = getSettings(options.rotors);
    const plugboard = options.plugboard;
    const enigma = new Enigma(
      rotors,
      new Reflector(Reflector.CYPHER.B),
      new Plugboard(plugboard)
    );
    const encoded = enigma.encode(message);
    if (options.verbose) {
      print(message, encoded);
    } else {
      console.log(encoded);
    }
  });

program.parse();
