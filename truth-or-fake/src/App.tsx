import { useEffect, useState } from "react";
import {
  Button,
  Card,
  Center,
  Container,
  Group,
  Text,
  Title,
  Transition,
} from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import fakeAdvices from "./data/fakeAdvices.json";

type Advice = {
  text: string;
  isReal: boolean;
};

function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}

const App = () => {
  const [advice, setAdvice] = useState<Advice | null>(null);
  const [score, setScore] = useState(10);
  const [gameOver, setGameOver] = useState(false);
  const [showCard, setShowCard] = useState(false);

  const getAdvice = async () => {
    setShowCard(false);
    const isReal = Math.random() > 0.5;
    if (isReal) {
      const res = await fetch("https://api.adviceslip.com/advice");
      const data = await res.json();
      setAdvice({ text: data.slip.advice, isReal: true });
    } else {
      const fake = fakeAdvices[getRandomInt(fakeAdvices.length)];
      setAdvice({ text: fake, isReal: false });
    }
    setTimeout(() => setShowCard(true), 100);
  };

  const handleAnswer = (guess: boolean) => {
    if (!advice) return;
    const correct = guess === advice.isReal;
    const newScore = score + (correct ? 1 : -1);
    setScore(newScore);

    showNotification({
      title: correct ? "Bonne réponse !" : "Mauvaise réponse !",
      message: correct ? "Tu gagnes 1 point." : "Tu perds 1 point.",
      color: correct ? "green" : "red",
     
      autoClose: 1500,
    });

    if (newScore >= 20 || newScore <= 0) {
      setTimeout(() => setGameOver(true), 1000);
    } else {
      setTimeout(() => getAdvice(), 1500);
    }
  };

  const restart = () => {
    setScore(10);
    setGameOver(false);
    getAdvice();
  };

  useEffect(() => {
    getAdvice();
  }, []);

  return (
    <Container size="sm" pt="xl">
      <Title align="center" mb="xs" fw={700}>
        Truth or Fake
      </Title>
      <Text align="center" size="lg" mt="sm" mb="md" c="gray">
        Score : <b>{score}</b>
      </Text>

      <Transition mounted={showCard && !gameOver} transition="fade" duration={300} timingFunction="ease" >
        {(styles) =>
          advice ? (
            <Card
              style={styles}
              shadow="md"
              padding="lg"
              radius="lg"
              withBorder
              mt="md"
              bg="gray.0"
            >
              <Text size="xl" ta="center" fw={500} mb="lg">
                “{advice.text}”
              </Text>
              <Group justify="center" >
                <Button size="md" color="green" onClick={() => handleAnswer(true)}>
                Vrai
                </Button>
                <Button size="md" color="red" onClick={() => handleAnswer(false)}>
                  Faux
                </Button>
              </Group>
            </Card>
          ) : null
        }
      </Transition>
      {gameOver && (
        <Center mt="xl">
          <Card shadow="xl" padding="xl" radius="lg" withBorder bg="blue.0">
            <Title align="center" order={2}>
              {score >= 20 ? "Bravo, tu as gagné !" : "Oops, tu as perdu..."}
            </Title>
            <Button fullWidth mt="lg" onClick={restart}>
              Rejouer
            </Button>
          </Card>
        </Center>
      )}
    </Container>
  );
};

export default App;
