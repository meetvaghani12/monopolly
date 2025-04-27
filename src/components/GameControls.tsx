
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { toast } from 'sonner';

interface GameControlsProps {
  onStartGame: (players: { name: string, color: string }[]) => void;
  onEndTurn: () => void;
  canEndTurn: boolean;
  gameStarted: boolean;
}

const PLAYER_COLORS = [
  "#F97316", // orange
  "#0EA5E9", // blue
  "#10B981", // green
  "#EF4444"  // red
];

const GameControls = ({ onStartGame, onEndTurn, canEndTurn, gameStarted }: GameControlsProps) => {
  const [showNewGameDialog, setShowNewGameDialog] = useState(false);
  const [playerCount, setPlayerCount] = useState(2);
  const [playerNames, setPlayerNames] = useState<string[]>(["Player 1", "Player 2"]);

  const handleStartGame = () => {
    // Validate player names
    const validNames = playerNames.filter(name => name.trim() !== "");
    if (validNames.length < 2) {
      toast.error("Please enter at least 2 player names");
      return;
    }

    // Create players with names and colors
    const players = validNames.map((name, index) => ({
      name,
      color: PLAYER_COLORS[index % PLAYER_COLORS.length]
    }));

    onStartGame(players);
    setShowNewGameDialog(false);
    toast.success("Game started successfully!");
  };

  const handlePlayerNameChange = (index: number, name: string) => {
    const newPlayerNames = [...playerNames];
    newPlayerNames[index] = name;
    setPlayerNames(newPlayerNames);
  };

  const updatePlayerCount = (count: number) => {
    const newCount = Math.min(Math.max(2, count), 4); // Between 2 and 4 players
    setPlayerCount(newCount);
    
    // Adjust player names array
    if (newCount > playerNames.length) {
      // Add new players
      setPlayerNames([
        ...playerNames,
        ...Array(newCount - playerNames.length).fill("").map((_, i) => `Player ${playerNames.length + i + 1}`)
      ]);
    } else if (newCount < playerNames.length) {
      // Remove excess players
      setPlayerNames(playerNames.slice(0, newCount));
    }
  };

  return (
    <div className="space-y-4">
      {!gameStarted ? (
        <Button onClick={() => setShowNewGameDialog(true)} className="w-full bg-game-primary hover:bg-game-secondary">
          New Game
        </Button>
      ) : (
        <div className="space-y-2">
          <Button 
            onClick={onEndTurn} 
            disabled={!canEndTurn} 
            className="w-full bg-game-primary hover:bg-game-secondary disabled:bg-gray-300"
          >
            End Turn
          </Button>
          <Button 
            variant="outline"
            onClick={() => setShowNewGameDialog(true)} 
            className="w-full border-game-primary text-game-primary hover:bg-game-primary hover:text-white"
          >
            Restart Game
          </Button>
        </div>
      )}

      <Dialog open={showNewGameDialog} onOpenChange={setShowNewGameDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Start New Game</DialogTitle>
            <DialogDescription>
              Enter player names and select the number of players
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4 space-y-4">
            <div className="flex items-center justify-between">
              <span>Number of Players:</span>
              <div className="flex items-center space-x-2">
                <Button 
                  variant="outline" 
                  size="icon" 
                  onClick={() => updatePlayerCount(playerCount - 1)} 
                  disabled={playerCount <= 2}
                >
                  -
                </Button>
                <span className="w-8 text-center">{playerCount}</span>
                <Button 
                  variant="outline" 
                  size="icon" 
                  onClick={() => updatePlayerCount(playerCount + 1)} 
                  disabled={playerCount >= 4}
                >
                  +
                </Button>
              </div>
            </div>
            
            <div className="space-y-3">
              {Array.from({ length: playerCount }).map((_, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <div 
                    className="w-6 h-6 rounded-full flex-shrink-0"
                    style={{ backgroundColor: PLAYER_COLORS[index % PLAYER_COLORS.length] }}
                  ></div>
                  <Input 
                    value={playerNames[index] || ""}
                    onChange={(e) => handlePlayerNameChange(index, e.target.value)}
                    placeholder={`Player ${index + 1}`}
                  />
                </div>
              ))}
            </div>
            
            <div className="flex justify-end space-x-2 pt-2">
              <Button variant="outline" onClick={() => setShowNewGameDialog(false)}>
                Cancel
              </Button>
              <Button onClick={handleStartGame} className="bg-game-primary hover:bg-game-secondary">
                Start Game
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default GameControls;
