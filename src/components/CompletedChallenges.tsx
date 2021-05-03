import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import styles from '../styles/components/CompletedChallenges.module.scss';

export const CompletedChallenges = () => {
  const { challengesCompleted } = useContext(ChallengesContext);
  return (
    <div className={styles.completedChallenges}>
      <span>Desafios completos</span>
      <span>{challengesCompleted}</span>
    </div>
  );
};
