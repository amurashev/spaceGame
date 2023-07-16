import { BackgroundStar, Planet, Star } from "objects";

import { getRandomInteger } from "utils/random";

class System {
  radius: number = 0;
  planets: Planet[] = [];
  star: Star;
  backgroundStars: BackgroundStar[] = [];

  constructor(radius: number) {
    this.radius = radius;

    this.star = new Star();

    for (let i = 1; i <= getRandomInteger(1, 2); i++) {
      this.planets.push(new Planet());
    }

    for (let i = 1; i <= getRandomInteger(200, 400); i++) {
      this.backgroundStars.push(new BackgroundStar(radius));
    }
  }

  getBackgroundStars() {
    return this.backgroundStars;
  }

  getPlanets() {
    return this.planets;
  }

  getStar() {
    return this.star;
  }
}

export default System;
