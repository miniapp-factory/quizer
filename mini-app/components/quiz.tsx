"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Share } from "@/components/share";
import { url } from "@/lib/metadata";

type Animal = "cat" | "dog" | "fox" | "hamster" | "horse";

interface Question {
  text: string;
  options: { text: string; animal: Animal }[];
}

const questions: Question[] = [
  {
    text: "What is your favorite type of activity?",
    options: [
      { text: "Chasing toys", animal: "cat" },
      { text: "Playing fetch", animal: "dog" },
      { text: "Exploring forests", animal: "fox" },
      { text: "Nibbling on seeds", animal: "hamster" },
      { text: "Galloping in fields", animal: "horse" },
    ],
  },
  {
    text: "How would you describe your personality?",
    options: [
      { text: "Independent", animal: "cat" },
      { text: "Friendly", animal: "dog" },
      { text: "Curious", animal: "fox" },
      { text: "Energetic", animal: "hamster" },
      { text: "Strong", animal: "horse" },
    ],
  },
  {
    text: "What’s your ideal environment?",
    options: [
      { text: "Cozy indoors", animal: "cat" },
      { text: "Open parks", animal: "dog" },
      { text: "Dense woods", animal: "fox" },
      { text: "Small cages", animal: "hamster" },
      { text: "Wide open plains", animal: "horse" },
    ],
  },
  {
    text: "How do you handle challenges?",
    options: [
      { text: "Solve quietly", animal: "cat" },
      { text: "Ask for help", animal: "dog" },
      { text: "Find a clever way", animal: "fox" },
      { text: "Keep moving", animal: "hamster" },
      { text: "Charge forward", animal: "horse" },
    ],
  },
  {
    text: "What’s your favorite snack?",
    options: [
      { text: "Fish", animal: "cat" },
      { text: "Bones", animal: "dog" },
      { text: "Berries", animal: "fox" },
      { text: "Seeds", animal: "hamster" },
      { text: "Meat", animal: "horse" },
    ],
  },
];

function shuffle<T>(array: T[]): T[] {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export function Quiz() {
  const [current, setCurrent] = useState(0);
  const [scores, setScores] = useState<Record<Animal, number>>({
    cat: 0,
    dog: 0,
    fox: 0,
    hamster: 0,
    horse: 0,
  });
  const [finished, setFinished] = useState(false);

  const handleAnswer = (animal: Animal) => {
    setScores((prev) => ({ ...prev, [animal]: prev[animal] + 1 }));
    if (current + 1 < questions.length) {
      setCurrent(current + 1);
    } else {
      setFinished(true);
    }
  };

  const resetQuiz = () => {
    setCurrent(0);
    setScores({
      cat: 0,
      dog: 0,
      fox: 0,
      hamster: 0,
      horse: 0,
    });
    setFinished(false);
  };

  if (finished) {
    const bestAnimal = Object.entries(scores).reduce((a, b) =>
      b[1] > a[1] ? b : a
    )[0] as Animal;
    const imageMap: Record<Animal, string> = {
      cat: "/cat.png",
      dog: "/dog.png",
      fox: "/fox.png",
      hamster: "/hamster.png",
      horse: "/horse.png",
    };
    return (
      <div className="flex flex-col items-center gap-4">
        <h2 className="text-2xl font-semibold">
          You are most similar to a {bestAnimal}!
        </h2>
        <img
          src={imageMap[bestAnimal]}
          alt={bestAnimal}
          width={512}
          height={512}
          className="rounded-md"
        />
        <Share text={`I am a ${bestAnimal}! ${url}`} />
        <Button onClick={resetQuiz}>Retake Quiz</Button>
      </div>
    );
  }

  const currentQuestion = questions[current];
  const shuffledOptions = shuffle(currentQuestion.options);

  return (
    <div className="flex flex-col items-center gap-4">
      <h2 className="text-xl font-medium">{currentQuestion.text}</h2>
      <div className="flex flex-col gap-2">
        {shuffledOptions.map((opt) => (
          <Button
            key={opt.text}
            onClick={() => handleAnswer(opt.animal)}
            variant="outline"
          >
            {opt.text}
          </Button>
        ))}
      </div>
    </div>
  );
}
