import { Command } from "commander";
import { Bombe } from "./Bombe";
const program = new Command();

program
  .name("Bombe")
  .description("Bombe CLI to decode Enigma messages")
  .version("1.0.0");

program
  .command("decode")
  .description("Decode a message encrypted by Enigma")
  .requiredOption("-m --message [string]", "the encrypted message to decode")
  .requiredOption("-c --crib <string>", "the known phrase used for decoding")
  .option("-p --print", "print progress")
  .action((options) => {
    new Bombe(options.message, options.crib, options.print).decode();
  });

program.parse();
