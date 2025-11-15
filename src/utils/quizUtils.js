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
export const generateQuestion = (allMachines, excludeIds = []) => {
  // Filtra máquinas disponíveis que não estão na lista de exclusão
  const available = allMachines.filter((m) => !excludeIds.includes(m.id));

  // Se não houver máquinas disponíveis, retorna null para indicar que
  // o chamador deve resetar a lista de usadas
  if (available.length === 0) return null;

  // Seleciona máquina correta aleatoriamente entre as disponíveis
  const correctMachine =
    available[Math.floor(Math.random() * available.length)];

  // Seleciona 2 máquinas incorretas aleatoriamente (a partir do total,
  // ignorando apenas a correta atual)
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
