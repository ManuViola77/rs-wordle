import Confetti from 'react-confetti';

import Button from 'components/common/Button';
import LetterInput from 'components/common/LetterInput';
import Loading from 'components/common/Loading';
import Keyboard from 'components/Keyboard';
import { LETTER_STATUS } from 'constants/types';
import useUsersAttempts from 'hooks/useUsersAttempts';
import useWordDb from 'hooks/useWordDb';

import './styles.css';

const Home = () => {
  const { letters, word, loading, setLoading } = useWordDb();

  const {
    currentRound,
    usersAttempts,
    roundsResults,
    gameEnded,
    gameStatus,
    error,
    keyboardLetters,
    letterIndex,
    onKeyPress,
    wordProcessing,
    setLetterIndex,
    shareResults,
    confettiExtraParams,
    customMessage,
    won,
  } = useUsersAttempts({
    wordLength: word.length,
    correctWord: word,
    letters,
    setLoading,
  });

  if (loading) return <Loading />;

  return (
    <div className="home-container">
      <div className="word-container">
        {usersAttempts.map((attempt, round) => (
          <div className="word" key={`word-attempt-${round}`}>
            <>
              {attempt.map((c, index) => (
                <LetterInput
                  key={`${c}-${round}-${index}`}
                  value={usersAttempts[round][index]}
                  style={{
                    backgroundColor:
                      round !== currentRound || gameEnded
                        ? LETTER_STATUS[roundsResults[round][index]].color
                        : LETTER_STATUS.nothing.color,
                  }}
                  isSelected={index === letterIndex && round === currentRound}
                  onClick={() => setLetterIndex(index)}
                  disabled={round !== currentRound || gameEnded}
                />
              ))}
            </>
          </div>
        ))}
        {!!error && <p className="error-message">{error}</p>}
      </div>
      {wordProcessing && <Loading />}
      {gameEnded && (
        <>
          <p className="game-status">You {gameStatus.toUpperCase()}</p>
          <p className="game-status">The word was {word}</p>
          <p className="game-status">{customMessage}</p>
          <div className="share-results-button">
            <Button handleClick={shareResults}>Share Results</Button>
          </div>
          {won && (
            <Confetti
              recycle={false}
              numberOfPieces={1000}
              tweenDuration={7000}
              {...confettiExtraParams}
            />
          )}
        </>
      )}
      <Keyboard
        keyboardLetters={keyboardLetters}
        onKeyPress={onKeyPress}
        disabled={wordProcessing || gameEnded}
      />
    </div>
  );
};

export default Home;
