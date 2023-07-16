import { writable } from "svelte/store";

type Screen = "space" | "planet" | "porting";

export const zoomStore = writable<number>(1);
export const timeStore = writable<number>(0);
export const screenStore = writable<Screen>("space");
export const isMovementStore = writable<boolean>(false);
export const angleStore = writable<number>(0);
export const povStore = writable<Point>({
  x: 0,
  y: 0,
});
