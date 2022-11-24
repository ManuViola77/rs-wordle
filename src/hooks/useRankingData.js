import { useEffect, useState } from 'react';
import { collection, getDocs, query, orderBy, where } from 'firebase/firestore';

import { DAILY_RESULTS } from 'firebase/collections';
import firebaseData from 'firebase/firebase';
import { getTodaysDate } from 'utils/helpers';

import useAuth from './useAuth';

const useRankingData = () => {
  const {
    user: { email: currentUser },
  } = useAuth();

  const [dailyResults, setDailyResults] = useState([]);

  const { firebaseDb } = firebaseData;
  const today = getTodaysDate();

  useEffect(() => {
    const getDailyResults = async () => {
      const q = query(
        collection(firebaseDb, DAILY_RESULTS),
        where('formattedDate', '==', today),
        orderBy('attempts'),
        orderBy('date')
      );
      const docs = await getDocs(q);
      const results = [];
      docs.forEach(doc => {
        const { attemptedWords, attempts, formattedDate, status, user } = doc.data();
        results.push({
          attemptedWords,
          attempts,
          formattedDate,
          status,
          user,
        });
      });
      setDailyResults(results);
    };
    getDailyResults();
  }, [firebaseDb, today]);

  return {
    currentUser,
    dailyResults,
  };
};

export default useRankingData;
