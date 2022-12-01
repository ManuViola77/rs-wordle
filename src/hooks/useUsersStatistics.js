import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { collection, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { toPairs } from 'lodash';

import { MAX_ATTEMPTS } from 'constants/constants';
import { USERS_STATISTICS } from 'firebase/collections';
import firebaseData from 'firebase/firebase';
import { setUserStatistics } from 'state/actions/statisticsActions';

import useAuth from './useAuth';

const { firebaseDb } = firebaseData;
const statisticsRef = collection(firebaseDb, USERS_STATISTICS);

const useUserStatistics = () => {
  const { statistics } = useSelector(({ statistics: { statistics } }) => ({
    statistics,
  }));

  const dispatch = useDispatch();

  const {
    user: { email: currentUser },
  } = useAuth();

  useEffect(() => {
    const getStatistics = async () => {
      try {
        let currentStatistics = {
          totalGames: 0,
          totalWins: 0,
          totalAttempts: Array(MAX_ATTEMPTS + 1).fill(0),
          currentStreak: 0,
          longestStreak: 0,
          attemptedWords: {},
        };
        const docRef = doc(firebaseDb, USERS_STATISTICS, currentUser);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const {
            totalGames,
            totalWins,
            totalAttempts,
            currentStreak,
            longestStreak,
            attemptedWords,
          } = docSnap.data();
          currentStatistics = {
            totalGames,
            totalWins,
            totalAttempts,
            currentStreak,
            longestStreak,
            attemptedWords,
          };
        } else {
          await setDoc(doc(statisticsRef, currentUser), currentStatistics);
        }
        await dispatch(setUserStatistics({ statistics: currentStatistics }));
      } catch (err) {
        console.error(err);
      }
    };

    if (Object.keys(statistics).length === 0) {
      getStatistics();
    }
  }, [currentUser, dispatch, statistics]);

  const updateStatistics = async newStatistics => {
    await updateDoc(doc(statisticsRef, currentUser), newStatistics);
    await dispatch(setUserStatistics({ statistics: newStatistics }));
  };

  const maxAttemptsRound = useMemo(
    () => Math.max(...(statistics.totalAttempts ?? [])),
    [statistics.totalAttempts]
  );

  const topAttemptedWords = useMemo(() => {
    const attemptedWordsArray = toPairs(statistics.attemptedWords).sort((a, b) => b[1] - a[1]);
    return attemptedWordsArray.slice(0, MAX_ATTEMPTS + 1);
  }, [statistics.attemptedWords]);

  return {
    statistics,
    updateStatistics,
    maxAttemptsRound,
    topAttemptedWords,
  };
};

export default useUserStatistics;
