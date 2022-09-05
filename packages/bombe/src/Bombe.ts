var Graph = require("graph.js/dist/graph.full.js");
import { Enigma } from "enigma/bin/Enigma";
import { Plugboard } from "enigma/bin/Plugboard";
import { Reflector } from "enigma/bin/Reflector";
import { Rotor, RotorName } from "enigma/bin/Rotor";
import { getRotorCombinations } from "./generateSettings";

type Edge = {
  from: string;
  to: string;
  weight: number;
};

type Loop = Edge[];

const sortStrings = (a: string, b: string) => a.localeCompare(b);

// TODO: Utilize any non pluged letters
// TODO: Investigate throwing away deductionss
// TODO: Refactor and cleanup
// TODO: Test other messages and cribs
// TODO: Test feeding prev deduction into encryption

export class Bombe {
  static ALPHA = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  fullMessage: string;
  message: string;
  crib: string;
  graph: any;
  print?: boolean;
  loops: Loop[];

  constructor(message: string, crib: string, print?: boolean) {
    this.fullMessage = message;
    this.crib = "SASUNARUTOANIMEDATTEBAYOANIME";
    this.message = "ERWEEMGZDQJSTPCPYUAUEFDZOANLN";
    this.graph = new Graph();
    this.loops = [];
    this.print = print;
  }

  findCribMatches() {
    let results = [];
    for (let i = 0; i < this.fullMessage.length; i++) {
      const result = this.cribMatches(i);
      if (result) {
        results.push(result);
      }
    }
    return results.filter((f) => f.length === this.crib.length);
  }

  cribMatches(start: number) {
    for (let i = 0; i < this.crib.length; i++) {
      if (this.crib[i] === this.fullMessage[start + i]) {
        return;
      }
    }
    return this.fullMessage.substring(start, start + this.crib.length);
  }

  decode() {
    const start = new Date().getTime();
    this.createGraph();
    this.findLoops();
    this.removeDuplicates();
    this.testRotorSettings();
    let elapsed = new Date().getTime() - start;
    console.log(new Date(elapsed).toISOString().slice(11, 19));
  }

  bruteForcePlugboard(
    plugboard: string,
    rotors: RotorName[],
    rotorPos: number[]
  ) {
    const remainingPlugs = Bombe.ALPHA.split("").filter(
      (l) => !plugboard.includes(l)
    );
    var remainingCombinations = remainingPlugs.flatMap((v, i) =>
      remainingPlugs.slice(i + 1).map((w) => v + w)
    );
    const numberOfMissingPlugs = 10 - plugboard.split(" ").length;

    const build = (boards: string[], take: number): string[] => {
      if (take === 0) {
        return boards;
      }
      return remainingCombinations.flatMap((r) =>
        build(
          boards.flatMap((b) => b + " " + r),
          take - 1
        )
      );
    };

    const containsContradiction = (pg: string) => {
      const asArray = pg
        .replace(/ /g, "")
        .split("")
        .sort((a, b) => a.localeCompare(b));
      for (let i = 0; i < asArray.length; i++) {
        if (asArray[i + 1] && asArray[i] === asArray[i + 1]) {
          return false;
        }
      }
      return true;
    };

    const allPossiblePlugboards = build(
      [plugboard],
      numberOfMissingPlugs
    ).filter(containsContradiction);

    let correctPlugboard = "";
    allPossiblePlugboards.forEach((plugB) => {
      const encoded = this.encode(this.crib, rotors, rotorPos, plugB);
      if (encoded === this.message) {
        correctPlugboard = plugB;
      }
    });
    return correctPlugboard;
  }

  testRotorSettings() {
    const positions = [...Array(26).keys()];
    const rotorCombinations = getRotorCombinations();
    let itr = 0;
    rotorCombinations.forEach((rotors) => {
      for (let i = 0; i < positions.length; i++) {
        for (let j = 0; j < positions.length; j++) {
          for (let k = 0; k < positions.length; k++) {
            const rotorPos = [
              positions[i] + 1,
              positions[j] + 1,
              positions[k] + 1,
            ];
            if (this.print) {
              console.clear();
              console.log(((itr / (17576 * 6)) * 100).toFixed(3));
              console.log(rotors.join(" "), rotorPos.join(" "));
              // console.log(((itr / (17576 * 60)) * 100).toFixed(3));
            }
            itr++;
            const plugboard = this.findPlugboardSettings(rotors, rotorPos);
            if (plugboard) {
              console.log(rotors, rotorPos, plugboard);
              return;
            }
          }
        }
      }
    });
  }

  findPlugboardSettings(rotors: RotorName[], rotorPos: number[]) {
    const loops = this.loops.sort((a, b) => b.length - a.length).slice(0, 3);

    let plugboard = "";
    for (let i = 0; i < Bombe.ALPHA.length; i++) {
      let result: string[][] = [];

      loops.forEach((loop) => {
        const res = this.guess(loop, Bombe.ALPHA[i], rotors, rotorPos);
        if (res) {
          result.push(res);
        } else {
          return;
        }
      });
      if (result.length !== loops.length) {
        continue;
      }

      const correctDeductions = result
        .map((res) => res.filter((a) => a[0] !== a[1]))
        .flat()
        .map((pair) => pair.split("").sort(sortStrings).join(""))
        .sort(sortStrings);
      const unique = Array.from(new Set(correctDeductions)); // remove duplicates
      let containsContradiction = false;
      for (let i = 0; i < unique.length; i++) {
        for (let j = 0; j < unique.length; j++) {
          containsContradiction =
            i !== j &&
            (unique[i][0] === unique[j][0] ||
              unique[i][1] === unique[j][0] ||
              unique[i][0] === unique[j][1] ||
              unique[i][1] === unique[j][1]);
          if (containsContradiction) {
            break;
          }
        }
        if (containsContradiction) {
          break;
        }
      }
      if (containsContradiction) {
        continue;
      }
      plugboard = unique.join(" ");
    }
    const pLength = plugboard.split(" ").length;
    if (pLength >= 8 && pLength <= 10) {
      return this.bruteForcePlugboard(plugboard, rotors, rotorPos);
    }
    return null;
  }

  guess(loop: Loop, guess: string, rotors: RotorName[], rotorPos: number[]) {
    const deductions = loop.map((edge, i) => ({
      edge,
      guess: i === 0 ? guess : "",
    }));

    deductions.forEach((deduction, i) => {
      const letters = new Array(deduction.edge.weight + 1)
        .fill(deduction.guess)
        .join("");
      const encoded = this.encode(letters, rotors, rotorPos);
      const nextGuess = encoded[encoded.length - 1];
      if (deductions[i + 1]) {
        deductions[i + 1].guess = nextGuess;
      }
    });

    const lastDeduction = deductions[deductions.length - 1];
    const letters = new Array(lastDeduction.edge.weight + 1)
      .fill(lastDeduction.guess)
      .join("");
    const encoded = this.encode(letters, rotors, rotorPos);
    const lastGuess = encoded[encoded.length - 1];

    if (lastGuess === guess) {
      return deductions.map((d) => `${d.edge.from}${d.guess}`);
    }
    return null;
  }

  encode(
    message: string,
    rotors: RotorName[],
    rotorPos: number[],
    plugboard?: string
  ) {
    let enigma = new Enigma(
      rotors.map((r, i) => new Rotor(Rotor.ROTOR[r], rotorPos[i], 1)),
      new Reflector(Reflector.CYPHER.B),
      new Plugboard(plugboard)
    );
    return enigma.encode(message);
  }

  createGraph(): void {
    for (let i = 0; i < this.message.length; i++) {
      this.graph.addVertex(this.message[i]);
    }
    for (let i = 0; i < this.crib.length; i++) {
      this.graph.addVertex(this.crib[i]);
    }

    for (let i = 0; i < this.message.length; i++) {
      this.graph.addEdge(this.message[i], this.crib[i], i);
    }
    for (let i = 0; i < this.crib.length; i++) {
      this.graph.addEdge(this.crib[i], this.message[i], i);
    }
  }

  findLoops() {
    for (let cycle of this.graph.cycles()) {
      if (cycle.length > 2) {
        let loop: Edge[] = [];
        for (let i = 0; i < cycle.length; i++) {
          const v1 = cycle[i];
          const v2 = cycle[i + 1] ? cycle[i + 1] : cycle[0];
          loop.push({
            from: v1,
            to: v2,
            weight: this.graph.edgeValue(v1, v2),
          });
        }
        this.loops.push(loop);
      }
    }
  }

  removeDuplicates() {
    let comparableLoops = this.loops.map((loop) => {
      let compare = loop.map((e) => `${e.from}${e.to}`).join("");
      return {
        compare,
        reverse: compare.split("").reverse().join(""),
        loop,
      };
    });
    let uniqueLopps: string[] = [];
    let result: Loop[] = [];
    comparableLoops.forEach(({ compare, reverse, loop }) => {
      if (!uniqueLopps.includes(compare) && !uniqueLopps.includes(reverse)) {
        uniqueLopps.push(compare);
        result.push(loop);
      }
    });
    this.loops = result;
  }
}
