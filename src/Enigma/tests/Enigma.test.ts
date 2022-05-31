import { getSettings } from "..";
import { Enigma } from "../Enigma";
import { Plugboard } from "../Plugboard";
import { Reflector } from "../Reflector";
import { Rotor, RotorName } from "../Rotor";

type Settings = {
  rotors: string;
  plugboard?: string;
};

const encode = (settings: Settings, input: string, output: string) => {
  expect(
    new Enigma(
      getSettings(settings.rotors),
      new Reflector(Reflector.CYPHER.B),
      new Plugboard(settings.plugboard || undefined)
    ).encode(input)
  ).toEqual(output);
};

describe("Encode using only rotors", () => {
  test("should encode one character", () => {
    encode({ rotors: "III:1-1 II:1-1 I:1-1" }, "A", "B");
  });

  test("should encode multiple characters", () => {
    encode({ rotors: "III:1-1 II:1-1 I:1-1" }, "AAAAA", "BDZGO");
  });

  test("should encode with rotors III-II-I", () => {
    encode(
      { rotors: "III:1-1 II:1-1 I:1-1" },
      "THEQUICKBROWNFOXJUMPSOVERTHELAZYDOG",
      "OPCILLAZFXLQTDNLGGLEKDIZOKQKGXIEZKD"
    );
  });
});

describe("Encode using different rotors", () => {
  test("should encode with rotors IV-II-I", () => {
    encode(
      { rotors: "I:1-1 IV:1-1 V:1-1" },
      "THEQUICKBROWNFOXJUMPSOVERTHELAZYDOG",
      "QNZFLVXFNSSXYJLZMTWUCPCGKFTMQBMVGMQ"
    );
  });
});

describe("Encode with starting positions", () => {
  test("should encode with rotors III-II-I in starting positions 4-22-10", () => {
    encode(
      { rotors: "III:4-1 II:22-1 I:10-1" },
      "THEQUICKBROWNFOXJUMPSOVERTHELAZYDOG",
      "FDKYDJEMXSKHHNFKODQYJRYWLKVURWDLSHS"
    );
  });
});

describe("Encode with rotation of all rotors", () => {
  test("should test that all rotors rotate correctly ", () => {
    encode({ rotors: "III:21-1 II:4-1 I:1-1" }, "JOHAN", "MNFBV");
  });

  test("should test that all rotors rotate correctly with long string in start position 1-1-1", () => {
    encode(
      { rotors: "III:1-1 II:1-1 I:1-1" },
      "ANDALLMYDAYSARETRANCESANDALLMYNIGHTLYDREAMSAREWHERETHYGREYEYEGLANCESANDWHERETHYFOOTSTEPGLEAMSINWHATETHEREALDANCESBYWHATETERNALSTREAMS",
      "BQJGUIOERTZABMSWPLYIYIQQVXMOINFXQSXAWBFTXDYIHTSAALZVVFOHCOBFMBITXVYAOYMVJQOHWKPCTRORESIVQUIXKRCZSEYBNZGHPJFLZDAVIKZSKXJLURTWBTTJPMJND"
    );
  });
});

describe("Encode with plugboard", () => {
  test("should encode with one plug", () => {
    encode({ rotors: "III:1-1 II:1-1 I:1-1", plugboard: "AB" }, "AAA", "BJL");
  });

  test("should encode with all plugs", () => {
    encode(
      {
        rotors: "III:1-1 II:1-1 I:1-1",
        plugboard: "AB FC KL MN PE RT VH JX QW GD",
      },
      "THEQUICKBROWNFOXJUMPSOVERTHELAZYDOG",
      "HUSPKKGDKBKQJOMUWDYELGOSLXXFULIPWLD"
    );
  });
});

describe("Encode with ring positions", () => {
  test("should encode with ring positions", () => {
    encode({ rotors: "III:1-2 II:1-1 I:1-1" }, "AAA", "UBD");
  });
  test("should encode longer string with ring position", () => {
    encode(
      { rotors: "III:1-2 II:1-1 I:1-1" },
      "THEQUICKBROWNFOXJUMPSOVERTHELAZYDOG",
      "FILVRDMEIDSCMKCJUSDATINTGKUXOCHSKLT"
    );
  });

  test("should encode long string with NO changed ring positions", () => {
    encode(
      { rotors: "III:1-1 II:1-1 I:1-1" },
      "IBELIEVETHATATTHEENDOFTHECENTURYTHEUSEOFWORDSANDGENERALEDUCATEDOPINIONWILLHAVEALTEREDSOMUCHTHATONEWILLBEABLETOSPEAKOFMACHINESTHINKINGWITHOUTEXPECTINGTOBECONTRADICTED",
      "HJCDDNSYHNKEBAUGTZYGLCEVCMXFPCCESSZXEQDHEFIUZNEOIVGHKQBXXPWCJMJZMQBQAYPDPRGFXXDIOBBGUERHJFTHIWUXMAOUXXUOFKFKXPBZYFCELCQAZGPKKLEHXUOMHVJGVRKMYYLUEAJBQMANJMJQUVYJSBZZU"
    );
  });

  test("should encode long string with ONE changed ring positions", () => {
    encode(
      { rotors: "III:1-2 II:1-1 I:1-1" },
      "IBELIEVETHATATTHEENDOFTHECENTURYTHEUSEOFWORDSANDGENERALEDUCATEDOPINIONWILLHAVEALTEREDSOMUCHTHATONEWILLBEABLETOSPEAKOFMACHINESTHINKINGWITHOUTEXPECTINGTOBECONTRADICTED",
      "WALBQRDKRTTMSNABNTSIJXXOZEZZGKMSONXCJSFRSJVWQUAFJAYZKPRYCRJHRMPWKGWUCGVKMVMTUBOFXKOHHPPQKYGHTGVLMQFVQXAGGCECIEHTVPBEXUXXSATBOSFYSIOEWRLQCJPWCZIIBQPFMJVTKSKCPCYPKYDFQ"
    );
  });

  test("should encode long string with TWO changed ring positions", () => {
    encode(
      { rotors: "III:1-3 II:1-2 I:1-1" },
      "IBELIEVETHATATTHEENDOFTHECENTURYTHEUSEOFWORDSANDGENERALEDUCATEDOPINIONWILLHAVEALTEREDSOMUCHTHATONEWILLBEABLETOSPEAKOFMACHINESTHINKINGWITHOUTEXPECTINGTOBECONTRADICTED",
      "TTUTOCOBETNUGSZMXZDAGLUVAFGKOVXVXJKDKCLBDCGSULYYRPZZOXMKNCRGSXGBHCEYJTDAGMJHYVRSXXZXXQTZNZXARSCCGUPNKEJBEPWUXIVVBOUTXVPTBARVGQLCTCJWQIGISPKJYTQOIKBRSNXQGZCSVGJYPHQJT"
    );
  });

  test("should encode long string with ALL ring positions changed", () => {
    encode(
      { rotors: "III:1-4 II:1-3 I:1-2" },
      "IBELIEVETHATATTHEENDOFTHECENTURYTHEUSEOFWORDSANDGENERALEDUCATEDOPINIONWILLHAVEALTEREDSOMUCHTHATONEWILLBEABLETOSPEAKOFMACHINESTHINKINGWITHOUTEXPECTINGTOBECONTRADICTED",
      "CZYCSYYHUXGPWXWBMGHBROATPPRCPYPANWKIGVYSTFGTWHYRIKEWCPEJIDULQAYGVJJTEBPAQZQJHYZEFSSZLGASFWLYPBQPZGLETVZDFEFMXTPLGXWREDXFTHOPTGPVOLXZUZOYLAPFINEGAOQAZEENDLKWYZSYVVXKT"
    );
  });
});

describe("All settings", () => {
  test("should encode with a combination of all settings", () => {
    encode(
      {
        rotors: "V:10-4 IV:4-3 I:18-2",
        plugboard: "AB FC KL MN PE RT VH JX QW GD",
      },
      "IBELIEVETHATATTHEENDOFTHECENTURYTHEUSEOFWORDSANDGENERALEDUCATEDOPINIONWILLHAVEALTEREDSOMUCHTHATONEWILLBEABLETOSPEAKOFMACHINESTHINKINGWITHOUTEXPECTINGTOBECONTRADICTED",
      "GAQYUDKJCPLFLJJJOPSZJZVPVRRYFPBNFKDLCMVPXRCXWHOKNMFYJTUBRXEHHLULFJDSBSKYZPATLARFATTPIBPFZLXLEZAEOPCCKZTROTXFFWXHNQOFHPJHYBXMFZUBGEFZOYGYNZJOZTSMKIXAJQGIAYVZRFXXCZZAV"
    );
  });
});
