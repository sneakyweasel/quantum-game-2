import { Elem, PolEnum, DirEnum } from '@/engine/interfaces';

/**
 * Pick a random index of an array according to weights.
 * @param weights An array of weights. By default they should sum up to 1.
 * @param normalize If to normalize array.
 * @returns A number [0, ..., weights.length -1].
 */
export function weightedRandomInt(weights: number[], normalize = true): number {
  let r = Math.random();
  if (normalize) {
    r *= weights.reduce((a, b) => a + b, 0);
  }
  let cumSum = 0;
  for (let i = 0; i < weights.length; i += 1) {
    cumSum += weights[i];
    if (cumSum > r) {
      return i;
    }
  }
  return -1;
}

/**
 * Convert a string in camelCase to dash-case
 * @param str string to convert
 */
export function camelCaseToDash(str: string): string {
  return str
    .replace(/[^a-zA-Z0-9]+/g, '-')
    .replace(/([A-Z]+)([A-Z][a-z])/g, '$1-$2')
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/([0-9])([^0-9])/g, '$1-$2')
    .replace(/([^0-9])([0-9])/g, '$1-$2')
    .replace(/-+/g, '-')
    .toLowerCase();
}

/**
 * Convert angles to unicode arrow symbols
 * https://en.wikipedia.org/wiki/Template:Unicode_chart_Arrows
 * @param angle included in [0, 45, 90, 135, 180, 225, 270, 315]
 */
export function angleToSymbol(angle: number): string {
  switch (angle) {
    case 0:
      return '→';
    case 45:
      return '↗';
    case 90:
      return '↑';
    case 135:
      return '↖';
    case 180:
      return '←';
    case 225:
      return '↙';
    case 270:
      return '↓';
    case 315:
      return '↘';
    default:
      throw new Error(`Something is wrong with provided angle: ${angle}°`);
  }
}

/**
 * Convert unicode arrow symbols to angles in degrees
 * https://en.wikipedia.org/wiki/Template:Unicode_chart_Arrows
 * @param direction an arrow
 * @returns angle included in [0, 45, 90, 135, 180, 225, 270, 315]
 */
export function symbolToAngle(direction: string): number {
  switch (direction) {
    case '→':
      return 0;
    case '↗':
      return 45;
    case '↑':
      return 90;
    case '↖':
      return 135;
    case '←':
      return 180;
    case '↙':
      return 225;
    case '↓':
      return 270;
    case '↘':
      return 315;
    default:
      throw new Error('Something is wrong with provided direction string.');
  }
}

/**
 * Output an enum describing laser starting polarization
 */
export function startingPolarization(polarization: number): PolEnum {
  switch (polarization) {
    case 0:
    case 180:
      return PolEnum.H;
    case 90:
    case 270:
      return PolEnum.V;
    default:
      throw new Error(`Wrong starting polarization: ${polarization}`);
  }
}

/**
 * Output an enum describing laser starting polarization
 */
export function startingDirection(rotation: number): DirEnum {
  switch (rotation) {
    case 0:
      return DirEnum['>'];
    case 90:
      return DirEnum['^'];
    case 180:
      return DirEnum['<'];
    case 270:
      return DirEnum.v;
    default:
      throw new Error(`Wrong starting direction: ${rotation}`);
  }
}

/**
 * Flatten an array
 * @param arr Array to flatten
 */
export function flatDeep(arr: Array<any>): Array<any> {
  return arr.reduce((acc, val) => acc.concat(Array.isArray(val) ? flatDeep(val) : val), []);
}

/**
 * Format percentage
 * @param value number from 0 to 1
 * @returns percentage string
 */
export function toPercent(value: number): string {
  return `${(value * 100).toFixed(2)}%`;
}

/**
 * Display text in HTML in ROTjs mode
 * @param elementId HTML element to use
 * @param text string to display
 */
export function displayText(elementId: string, text: string): void {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  // document.getElementById(elementId)!.textContent = text;
  console.debug(`Log #${elementId}: ${text}`);
}

/**
 * Convert V1 names to V2
 * @param classic name used in Quantum Game 1
 * @returns v2 name
 */
export function convertFromClassicNames(classic: string): string {
  switch (classic) {
    // Source
    case 'Source':
      return Elem.Laser;
    // Direction
    case 'ThinMirror':
      return Elem.Mirror;
    case 'ThinSplitter':
      return Elem.BeamSplitter;
    case 'PolarizingSplitter':
      return Elem.PolarizingBeamSplitter;
    case 'ThinSplitterCoated':
      return Elem.CoatedBeamSplitter;
    case 'CornerCube':
      return Elem.CornerCube;
    // Absorption
    case 'Detector':
      return Elem.Detector;
    case 'Rock':
      return Elem.Rock;
    case 'Mine':
      return Elem.Mine;
    case 'Absorber':
      return Elem.Absorber;
    case 'DetectorFour':
      return Elem.DetectorFour;
    // Polarization
    case 'PolarizerNS':
      return Elem.Polarizer;
    case 'PolarizerWE':
      return Elem.Polarizer;
    case 'QuarterWavePlateNS':
      return Elem.QuarterWavePlate;
    case 'QuarterWavePlateWE':
      return Elem.QuarterWavePlate;
    case 'SugarSolution':
      return Elem.SugarSolution;
    case 'FaradayRotator':
      return Elem.FaradayRotator;
    // Phase
    case 'Glass':
      return Elem.Glass;
    case 'VacuumJar':
      return Elem.VacuumJar;
    default:
      throw new Error(`Error converting name from classic: ${classic}`);
  }
}
