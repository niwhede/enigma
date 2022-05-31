import { Command } from "commander";
import { Bombe } from "./Bombe";
const program = new Command();

program
  .name("Bombe")
  .description("Bombe CLI to decrypt Enigma messages")
  .version("1.0.0");

program
  .command("decrypt")
  .description("Decrypt a message encrypted by Enigma")
  .requiredOption("-m --message [string]", "the encrypted message to decrypt")
  .requiredOption(
    "-p --phrase <string>",
    "the known phrase used for decrypting"
  )
  .action((options) => {
    const bombe = new Bombe();
    const result = bombe.decrypt(options.message, options.phrase);
  });

program.parse();
