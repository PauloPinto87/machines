// Funções auxiliares para o quiz

// Embaralha array (Fisher-Yates shuffle)
export const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

// Gera uma pergunta aleatória com opções
export const generateQuestion = (allMachines) => {
  // Seleciona máquina correta aleatoriamente
  const correctMachine =
    allMachines[Math.floor(Math.random() * allMachines.length)];

  // Seleciona 2 máquinas incorretas aleatoriamente
  const incorrectMachines = allMachines
    .filter((m) => m.id !== correctMachine.id)
    .sort(() => Math.random() - 0.5)
    .slice(0, 2);

  // Cria array de opções e embaralha
  const options = [correctMachine, ...incorrectMachines];
  const shuffledOptions = shuffleArray(options);

  return {
    correctMachine,
    options: shuffledOptions,
    correctAnswerId: correctMachine.id,
  };
};
