import { Cypher } from "./Cypher";

type Connection = Record<string, string>;

export class Plugboard {
  settings: Connection;

  constructor(settings?: string) {
    this.settings = settings
      ? this.createMapping(settings)
      : this.createDefaultMapping();
  }

  createMapping(settings: string): Connection {
    return settings.split(" ").reduce((acc, pair) => {
      const [k, v] = pair.split("");
      return {
        ...acc,
        [k]: v,
        [v]: k,
      };
    }, this.createDefaultMapping());
  }

  createDefaultMapping(): Connection {
    return Cypher.ALPHA.split("").reduce((acc, pair) => {
      return {
        ...acc,
        [pair]: pair,
      };
    }, {});
  }

  encode(char: string): string {
    return this.settings[char];
  }
}
