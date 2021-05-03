import { createContext, useState, useEffect, ReactNode } from 'react';
import Cookies from 'js-cookie';
import challenges from '../../challenges.json';
import { LevelUpModal } from '../components/LevelUpModal';

interface Challenge {
  type: 'body' | 'eye';
  description: string;
  amount: number;
}

interface ChallengesContextData {
  activeChallenge: Challenge;
  challengesCompleted: number;
  currentExperience: number;
  experienceToNextLevel: number;
  level: number;
  closeLevelUpModal: () => void;
  completeChallenge: () => void;
  levelUp: () => void;
  resetChallente: () => void;
  startNewChallenge: () => void;
}

interface ChallengesProviderProps {
  children: ReactNode;
  level: number;
  currentExperience: number;
  challengesCompleted: number;
}

enum levelDifficult {
  easy = 3,
  medium = 4,
  hard = 5,
}

export const ChallengesContext = createContext({} as ChallengesContextData);
export const ChallengesProvider = ({
  children,
  ...rest
}: ChallengesProviderProps) => {
  const [level, setLevel] = useState(rest.level ?? 1);
  const [currentExperience, setCurrentExperience] = useState(
    rest.currentExperience ?? 0
  );
  const [challengesCompleted, setChallengesCompleted] = useState(
    rest.challengesCompleted ?? 0
  );
  const [activeChallenge, setActiveChallenge] = useState(null);
  const [isLevelUpModalOpen, setIsLevelModalOpen] = useState(false);
  const experienceToNextLevel = Math.pow((level + 1) * levelDifficult.hard, 2);

  useEffect(() => {
    Notification.requestPermission();
  }, []);

  useEffect(() => {
    Cookies.set('level', String(level));
    Cookies.set('currentExperience', String(currentExperience));
    Cookies.set('challengesCompleted', String(challengesCompleted));
  }, [level, currentExperience, challengesCompleted]);

  const levelUp = () => {
    setLevel(level + 1);
    setIsLevelModalOpen(true);
  };

  const closeLevelUpModal = () => {
    setIsLevelModalOpen(false);
  };

  const startNewChallenge = () => {
    const ramdomChallengeIndex = Math.floor(Math.random() * challenges.length);
    const challenge = challenges[ramdomChallengeIndex];
    setActiveChallenge(challenge);

    new Audio('/bell.mp3').play();
    if (Notification.permission === 'granted') {
      new Notification('Novo desafio 🎉', {
        body: `Valendo ${challenge.amount}xp!`,
      });
    }
  };

  const resetChallente = () => {
    setActiveChallenge(null);
  };

  const completeChallenge = () => {
    if (!activeChallenge) {
      return;
    }

    const { amount } = activeChallenge;
    let finalExperience = currentExperience + amount;

    if (finalExperience >= experienceToNextLevel) {
      finalExperience -= experienceToNextLevel;
      levelUp();
    }

    setCurrentExperience(finalExperience);
    setActiveChallenge(null);
    setChallengesCompleted(challengesCompleted + 1);
  };

  return (
    <ChallengesContext.Provider
      value={{
        activeChallenge,
        challengesCompleted,
        currentExperience,
        experienceToNextLevel,
        level,
        closeLevelUpModal,
        completeChallenge,
        levelUp,
        resetChallente,
        startNewChallenge,
      }}
    >
      {children}
      {isLevelUpModalOpen && <LevelUpModal />}
    </ChallengesContext.Provider>
  );
};
