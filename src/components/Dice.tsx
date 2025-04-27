
import { useState } from 'react';
import { Button } from "@/components/ui/button";

interface DiceProps {
  onRoll: (value: number) => void;
  disabled?: boolean;
}

const Dice = ({ onRoll, disabled = false }: DiceProps) => {
  const [diceValue, setDiceValue] = useState(1);
  const [rolling, setRolling] = useState(false);
  
  const rollDice = () => {
    if (rolling) return;
    
    setRolling(true);
    
    // Visual rolling animation
    const rolls = 10; // Number of visual rolls
    let count = 0;
    
    const rollInterval = setInterval(() => {
      const newValue = Math.floor(Math.random() * 6) + 1;
      setDiceValue(newValue);
      count++;
      
      if (count >= rolls) {
        clearInterval(rollInterval);
        setRolling(false);
        onRoll(newValue);
      }
    }, 100);
  };

  return (
    <div className="flex flex-col items-center">
      <div 
        className={`w-20 h-20 bg-white rounded-xl border-2 border-game-primary flex items-center justify-center text-4xl font-bold shadow-lg mb-4
          ${rolling ? 'animate-dice-roll' : 'animate-bounce-in'}`}
      >
        {diceValue}
      </div>
      <Button 
        onClick={rollDice} 
        disabled={rolling || disabled} 
        variant="default" 
        className="bg-game-primary hover:bg-game-secondary transition-colors"
      >
        {rolling ? "Rolling..." : "Roll Dice"}
      </Button>
    </div>
  );
};

export default Dice;
