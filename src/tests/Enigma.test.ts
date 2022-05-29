import { Enigma } from "../Enigma";
import { Plugboard } from "../Plugboard";
import { Reflector } from "../Reflector";
import { Rotor, RotorName } from "../Rotor";

const s = "thequickbrownfoxjumpsoverthelazydog".toUpperCase();

const getSettings = (input: string) => {
  const rotors = input.split(" ");
  return rotors.map((r) => {
    const [rotor, positions] = r.split(":") as [RotorName, string];
    const [pos, ringPos] = positions.split("-").map(Number);
    return new Rotor(Rotor.ROTOR[rotor], pos, ringPos);
  });
};

describe("Only rotors", () => {
  test.each([
    { settings: "III:1-1 II:1-1 I:1-1", input: "A", output: "B" },
    { settings: "III:1-1 II:1-1 I:1-1", input: "JOHAN", output: "SITGC" },
    { settings: "III:1-1 II:1-1 I:1-1", input: "THEQUICKBROWNFOXJUMPSOVERTHELAZYDOG", output: "OPCILLAZFXLQTDNLGGLEKDIZOKQKGXIEZKD" }, // prettier-ignore
    { settings: "IV:1-1 II:1-1 I:1-1", input: "THEQUICKBROWNFOXJUMPSOVERTHELAZYDOG", output: "ZKGBVBNDXSIIWQSCBWHWXPMUMPYWRQFEZWP" }, // prettier-ignore
    { settings: "III:4-1 II:22-1 I:10-1", input: "THEQUICKBROWNFOXJUMPSOVERTHELAZYDOG", output: "FDKYDJEMXSKHHNFKODQYJRYWLKVURWDLSHS" }, // prettier-ignore
    { settings: "III:1-1 II:1-1 I:1-1", input: "ANDALLMYDAYSARETRANCESANDALLMYNIGHTLYDREAMSAREWHERETHYGREYEYEGLANCESANDWHERETHYFOOTSTEPGLEAMSINWHATETHEREALDANCESBYWHATETERNALSTREAMS", output: "BQJGUIOERTZABMSWPLYIYIQQVXMOINFXQSXAWBFTXDYIHTSAALZVVFOHCOBFMBITXVYAOYMVJQOHWKPCTRORESIVQUIXKRCZSEYBNZGHPJFLZDAVIKZSKXJLURTWBTTJPMJND" }, // prettier-ignore
    { settings: "III:21-1 II:4-1 I:1-1", input: "JOHAN", output: "MNFBV" }, // prettier-ignore
  ])("$settings: $input -> $output", ({ settings, input, output }) => {
    const result = new Enigma(
      getSettings(settings),
      new Reflector(Reflector.CYPHER.B),
      new Plugboard()
    ).encode(input);
    expect(result).toEqual(output);
  });
});

describe("Only rotors", () => {
  test.each([
    {
      settings: "III:1-1 II:1-1 I:1-1",
      input: "AAA",
      output: "BJL",
      plugboard: "AB",
    },
    {
      settings: "III:1-1 II:1-1 I:1-1",
      input: "THEQUICKBROWNFOXJUMPSOVERTHELAZYDOG",
      output: "HUSPKKGDKBKQJOMUWDYELGOSLXXFULIPWLD",
      plugboard: "AB FC KL MN PE RT VH JX QW GD",
    },
  ])(
    "$settings: $input -> $output",
    ({ settings, input, output, plugboard }) => {
      const result = new Enigma(
        getSettings(settings),
        new Reflector(Reflector.CYPHER.B),
        new Plugboard(plugboard)
      ).encode(input);
      expect(result).toEqual(output);
    }
  );
});
