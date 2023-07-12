import { writable } from "svelte/store";

import type { Point } from "../types";

export const initialPositionStore = writable<Point>();