import { Rotor, RotorName } from "enigma/bin/Rotor";

export type EnigmaSettings = {
  rotors: {
    rotorName: RotorName;
    position: number;
    ringPosition: number;
  }[];
};

/**
 * Execution time: three rotors (no contradiction checking)   => 00:03:23
 * Execution time: three rotors remove contraditions          => 00:02:47
 * Execution time: must satisfy all loops                     => 00:02:40
 */
export const getRotorCombinations = () => {
  // const rotors = ["I", "II", "III", "IV", "V"] as RotorName[];
  const rotors = ["I", "II", "III"] as RotorName[];
  let allRotorCombinations: RotorName[][] = [];
  rotors.forEach((r1) => {
    rotors
      .filter((r) => r !== r1)
      .forEach((r2) => {
        rotors
          .filter((r) => r !== r1 && r !== r2)
          .forEach((r3) => {
            allRotorCombinations.push([r1, r2, r3]);
          });
      });
  });
  return allRotorCombinations;
};
