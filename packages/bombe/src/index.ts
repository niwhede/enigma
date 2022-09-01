import { Command } from "commander";
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
  .action((options) => {
    console.log(options);
  });

program.parse();
