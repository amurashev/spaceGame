import { writable } from "svelte/store";

import type { Point } from "../types";

export type Star = {
  size: number;
  point: Point;
};

export const starsStore = writable<Star[]>();
