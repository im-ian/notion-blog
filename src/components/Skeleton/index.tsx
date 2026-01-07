import { Fragment } from "react";

import * as styles from "./index.css";

function getRandomNumber(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const Skeleton = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {Array.from({ length: 15 }, (_, index) => (
          <Fragment key={index}>
            <div
              className={styles.line}
              style={{ width: `${getRandomNumber(80, 100)}%` }}
            />
            {getRandomNumber(0, 5) === 1 && <br />}
          </Fragment>
        ))}
      </div>
    </div>
  );
};
