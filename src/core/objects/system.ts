import { Point, type Canvas } from "core/essentials";
import { BackgroundStar, GamePlay, Planet, Star } from "core/objects";

import { getRandomInteger, getRandomGauss } from "utils/random";

class System {
  item: {
    radius: number;
  };
  planets: Planet[] = [];
  star: Star;
  backgroundStars: BackgroundStar[] = [];

  constructor(radius: number) {
    this.item = this.generate();

    this.star = new Star();

    const planetsCount = getRandomInteger(1, radius / 1000);

    for (let i = 1; i <= planetsCount; i++) {
      this.planets.push(new Planet(this, i));
    }

    const diamondSquare = (props: {
      i: number
      maxIt: number
      p11: Point
      p12: Point
      p21: Point
      p22: Point
      cp?: Point
      data?: {
        point: Point
        size: number
      }[]
    }) => {
      const { i, maxIt, data = [] } = props

      const newData = [...data]

      const it = ['p11', 'p12', 'p21', 'p22']

      console.warn('diamondSquare', i, newData)

      if (i === maxIt) {
        return newData
      }

      if (i === 0) {
        it.forEach(j => {
          // Initialize core values
          const size = getRandomInteger(1, 100)
          const p = props[j]
          newData.push({
            point: p,
            size: size,
          })
        })

        diamondSquare({
          ...props,
          i: i + 1,
          maxIt,
          data: newData,
        })
      } else {
        if (i % 2 === 1) {
          const size = getRandomInteger(1, 100)
          const cp = Point.getAveragePoint(props.p11, props.p22)

          newData.push({
            point: cp,
            size: size,
          })

          diamondSquare({
            ...props,
            i: i + 1,
            maxIt,
            cp,
            data: newData,
          })
        }

        if (i % 2 === 0) {
          const np1 = Point.getAveragePoint(props.p11, props.p12)
          const np2 = Point.getAveragePoint(props.p11, props.p21)
          const np3 = Point.getAveragePoint(props.p12, props.p22)
          const np4 = Point.getAveragePoint(props.p21, props.p22)

          ;[np1, np2, np3, np4].forEach(p => {
            // Initialize core values
            const size = getRandomInteger(1, 100)
            newData.push({
              point: p,
              size: size,
            })
          })

          diamondSquare({
            p11: props.p11,
            p12: np1,
            p21: np2,
            p22: props.cp,
            i: i + 1,
            maxIt,
            data: newData,
          })

          diamondSquare({
            p11: np1,
            p12: props.p12,
            p21: props.cp,
            p22: np3,
            i: i + 1,
            maxIt,
            data: newData,
          })

          diamondSquare({
            p11: np2,
            p12: props.cp,
            p21: props.p21,
            p22: np4,
            i: i + 1,
            maxIt,
            data: newData,
          })

          diamondSquare({
            p11: props.cp,
            p12: np3,
            p21: np4,
            p22: props.p22,
            i: i + 1,
            maxIt,
            data: newData,
          })
        }
      }
    }

    const stars = diamondSquare({
      i: 0,
      maxIt: 5,
      p11: { x: 300, y: -300 },
      p12: { x: 900, y: -300 },
      p21: { x: 300, y: 300 },
      p22: { x: 900, y: 300 },
    })

    console.warn(stars)

    // this.backgroundStars = stars.map(item => new BackgroundStar(item.point.x, item.point.y, item.size))

    // this.backgroundStars.push(new BackgroundStar(-300, -300, 50));

    // for (let i = 1; i <= getRandomInteger(600, 1000); i++) {
    //   const x = getRandomInteger(-radius, radius)
    //   const y = getRandomInteger(-radius, radius)
    //   const size = 10
    //   this.backgroundStars.push(new BackgroundStar(x, y, size));
    // }
  }

  generate() {
    const newObject = {
      radius: getRandomInteger(3000, 5000),
    };

    return newObject;
  }

  render(canvas: Canvas, gamePlay: GamePlay) {
    this.backgroundStars.forEach((star) => star.render(canvas, gamePlay));
    this.planets.forEach((planet) => planet.render(canvas, gamePlay));
    this.star.render(canvas, gamePlay);

    const sunPoint = this.getStar().getPoint();
    const screenSunPoint = gamePlay.getPointWithScreenOffset(sunPoint);

    canvas.drawCircleWithDashLine(
      screenSunPoint,
      this.getRadius(),
      1,
      "#777",
      [30, 70]
    );
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

  getPlanetById(id: string) {
    return this.planets.find((item) => item.id === id);
  }

  getRadius() {
    return this.item.radius;
  }

  // static generate() {
  //   const newObject = {
  //     radius: getRandomInteger(3000, 5000),
  //   }

  //   return newObject
  // }
}

export default System;
