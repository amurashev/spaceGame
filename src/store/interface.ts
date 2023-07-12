import { writable } from "svelte/store";

export const zoomStore = writable<number>(0.3);
export const timeStore = writable<number>(0);
export const isMovementStore = writable<boolean>(false);