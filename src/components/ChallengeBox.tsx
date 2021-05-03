import { useContext } from 'react';

import { ChallengesContext } from '../contexts/ChallengesContext';
import { CountdownContext } from '../contexts/CountdownContext';

import styles from '../styles/components/ChallengeBox.module.scss';

export const ChallengeBox = () => {
  const { activeChallenge, completeChallenge, resetChallente } = useContext(
    ChallengesContext
  );
  const { resetCountdown } = useContext(CountdownContext);

  const handleChallengeSucceeded = () => {
    new Audio('/completed.mp3').play();
    completeChallenge();
    resetCountdown();
  };

  const handleChallengeFailed = () => {
    new Audio('/failure.mp3').play();
    resetChallente();
    resetCountdown();
  };

  return (
    <div className={styles.challengeBoxContainer}>
      {activeChallenge ? (
        <div className={styles.challengeActive}>
          <header>Ganhe {activeChallenge.amount} xp</header>

          <main>
            <img
              src={`icons/${activeChallenge.type}.svg`}
              alt={activeChallenge.type}
            />
            <strong>Novo desafio</strong>
            <p>{activeChallenge.description}</p>
          </main>

          <footer>
            <button
              type="button"
              className={styles.challengeFailedButton}
              onClick={handleChallengeFailed}
            >
              Falhei
            </button>
            <button
              type="button"
              className={styles.challengeSucceededButton}
              onClick={handleChallengeSucceeded}
            >
              Completei
            </button>
          </footer>
        </div>
      ) : (
        <div className={styles.challengeNotActive}>
          <strong>Finalize um ciclo para receber um desafio</strong>
          <p>
            <img src="icons/level-up.svg" alt="Level Up" />
            Avance de level completando desafios
          </p>
        </div>
      )}
    </div>
  );
};
