import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import styles from '../styles/components/ExperienceBar.module.scss';

export const ExperienceBar = () => {
  const { currentExperience, experienceToNextLevel } = useContext(
    ChallengesContext
  );

  const percentToNextLevel = Math.round(
    (currentExperience * 100) / experienceToNextLevel
  );

  return (
    <header className={styles.experienceBar}>
      <span>0 xp</span>
      <div className={styles.experienceBackBar}>
        <div
          className={styles.experienceFrontBar}
          style={{ width: `${percentToNextLevel}%` }}
        >
          <i></i>
        </div>
        <span
          className={styles.currentExperience}
          style={{ left: `${percentToNextLevel}%` }}
        >
          {currentExperience} xp
        </span>
      </div>
      <span>{experienceToNextLevel} xp</span>
    </header>
  );
};
