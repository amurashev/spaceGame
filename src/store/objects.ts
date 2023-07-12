import { writable } from "svelte/store";

import type { Star } from "objects/stars";
import type { Planet } from "objects/planets";



export const starsStore = writable<Star[]>();

export const planetsStore = writable<Planet[]>();
