import React from "react";
import { Subject } from "rxjs";

type HeroProps = {
  healthPoints: number;
};

const heroSubject = new Subject<HeroProps>();

const initialHeroProps: HeroProps = {
  healthPoints: 100
};

export const Test = () => {
  const [hero, setHero] = React.useState<HeroProps>(initialHeroProps);
  React.useEffect(() => {
    heroSubject.subscribe(hero => setHero(hero));
  }, []);

  const { healthPoints } = hero;

  return (
    <div>
      <div>
        <h1>Hero</h1>
        <ul>
          <li>Helth points: {healthPoints}</li>
        </ul>
      </div>
    </div>
  );
};
