import { Bombe } from "../Bombe";

test("should find phrase match", () => {
  const bombe = new Bombe();
  const message =
    "VGSVGURQGNIKBNDOTLKGKCLVWSLXVFBPPCSJPHGJACEJZTKXQCSAJECQXEXLKGRZRWJWBAXGPJLYWSFDHSOOYPTKXFQMRDVJMFAUWFNSFXTCHEAHBLRPIDINLDKKLBUVAROMSUXEVTLMTTIGSQXDHSBZDDXAFMMYSTWNSZPWCDSTQUF";
  // const message = "IBELIEVETHATATTHEEND";
  const phrase = "ALANTURING";
  const result = bombe.decode(message, phrase);
});
