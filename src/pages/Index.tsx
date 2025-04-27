import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'sonner';

import Dice from "@/components/Dice";
import  GameBoard from "@/components/GameBoard";
import PropertyCard from "@/components/PropertyCard";
import PlayerDashboard from "@/components/PlayerDashboard";
import GameControls from "@/components/GameControls";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

import { Player, BoardSpace } from '@/types/game';

const Index = () => {
  // Game state
  const [players, setPlayers] = useState<Player[]>([]);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [canRollDice, setCanRollDice] = useState(false);
  const [canEndTurn, setCanEndTurn] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<BoardSpace | null>(null);
  
  // Define board spaces with properties and their details
  const [spaces, setSpaces] = useState<BoardSpace[]>([
    { id: 0, name: "વિશ્વયાત્રા", type: "worldtour" as const, description: "World Tour" },
    { id: 1, name: "કચ્છ", type: "property" as const, color: '#8B4513', price: 30400, rent: [3040, 6080, 9120, 15200], owner: null },
    { id: 2, name: "ભુજ", type: "property" as const, color: '#8B4513', price: 30000, rent: [3000, 6000, 9000, 15000], owner: null },
    { id: 3, name: "એરપોર્ટ", type: "airport" as const, description: "Airport" },
    { id: 4, name: "રાજકોટ", type: "property" as const, color: '#87CEEB', price: 26000, rent: [2600, 5200, 7800, 13000], owner: null },
    { id: 5, name: "જામનગર", type: "property" as const, color: '#87CEEB', price: 26400, rent: [2640, 5280, 7920, 13200], owner: null },
    { id: 6, name: "મોજ મજા", type: "funevent" as const, description: "Win ₹1000" },
    { id: 7, name: "જૂનાગઢ", type: "property" as const, color: '#FF69B4', price: 22000, rent: [2200, 4400, 6600, 11000], owner: null },
    { id: 8, name: "સોમનાથ", type: "property" as const, color: '#FF69B4', price: 22400, rent: [2240, 4480, 6720, 11200], owner: null },
    { id: 9, name: "લોટરી", type: "lottery" as const, description: "Lottery" },
    { id: 10, name: "બસ સ્ટેશન", type: "busstation" as const, description: "Bus Station" },
    { id: 11, name: "ભાવનગર", type: "property" as const, color: '#FFA500', price: 20400, rent: [2040, 4080, 6120, 10200], owner: null },
    { id: 12, name: "સુરત", type: "property" as const, color: '#FFA500', price: 20000, rent: [2000, 4000, 6000, 10000], owner: null },
    { id: 13, name: "જેલ", type: "jail" as const, description: "Jail" },
    { id: 14, name: "મોજ મજા", type: "funevent" as const, description: "Pay ₹1000" },
    { id: 15, name: "વલસાડ", type: "property" as const, color: '#FF0000', price: 18400, rent: [1840, 3680, 5520, 9200], owner: null },
    { id: 16, name: "દમણ", type: "property" as const, color: '#FF0000', price: 18000, rent: [1800, 3600, 5400, 9000], owner: null },
    { id: 17, name: "મોજ મજા", type: "funevent" as const, description: "Win ₹5000" },
    { id: 18, name: "મુંબઈ", type: "property" as const, color: '#FFD700', price: 50000, rent: [5000, 10000, 15000, 25000], owner: null },
    { id: 19, name: "મુંબઈ સબર્બન", type: "property" as const, color: '#FFD700', price: 48000, rent: [4800, 9600, 14400, 24000], owner: null },
    { id: 20, name: "ચાન્સ", type: "chance" as const, description: "Chance" },
    { id: 21, name: "પુણે", type: "property" as const, color: '#008000', price: 44000, rent: [4400, 8800, 13200, 22000], owner: null },
    { id: 22, name: "નાસિક", type: "property" as const, color: '#008000', price: 42000, rent: [4200, 8400, 12600, 21000], owner: null },
    { id: 23, name: "વિશ્વયાત્રા", type: "worldtour" as const, description: "World Tour" },
    { id: 24, name: "ચાન્સ", type: "chance" as const, description: "Chance" },
    { id: 25, name: "નાગપુર", type: "property" as const, color: '#0000FF', price: 36400, rent: [3640, 7280, 10920, 18200], owner: null },
    { id: 26, name: "સત્તાર્ડા", type: "property" as const, color: '#0000FF', price: 36000, rent: [3600, 7200, 10800, 18000], owner: null },
    { id: 27, name: "લોટરી", type: "lottery" as const, description: "Lottery Booth" },
    // Only 28 property cards included, extra property cards have been removed as requested.
  ]);

  const startGame = (newPlayers: { name: string, color: string }[]) => {
    // Initialize players with starting money and position
    const initializedPlayers = newPlayers.map(player => ({
      id: uuidv4(),
      name: player.name,
      color: player.color,
      position: 0,
      money: 100000, // Starting money
      properties: []
    }));
    
    setPlayers(initializedPlayers);
    setCurrentPlayerIndex(0);
    setGameStarted(true);
    setCanRollDice(true);
    setCanEndTurn(false);
    
    // Reset board spaces
    setSpaces(spaces.map(space => ({
      ...space,
      owner: null
    })));

    toast.success("Game started! Roll the dice to begin.");
  };

  const handleDiceRoll = (value: number) => {
    if (!canRollDice) return;
    
    // Move current player (use functional update to avoid stale state)
    // Calculate new player position and update state
    let newPlayer: Player;
    let newPosition: number;
    setPlayers(prevPlayers => {
      const updatedPlayers = [...prevPlayers];
      const currentPlayer = { ...updatedPlayers[currentPlayerIndex] };
      newPosition = (currentPlayer.position + value) % spaces.length;
      currentPlayer.position = newPosition;
      updatedPlayers[currentPlayerIndex] = currentPlayer;
      newPlayer = currentPlayer;
      return updatedPlayers;
    });
    setCanRollDice(false);
    // Don't end turn yet, wait for property buy decision if possible
    
    // Handle landing on a space (use newPosition and newPlayer)
    const landedSpace = spaces[newPosition];
    handleLandedSpace(landedSpace, newPlayer);
    
    toast.success(`${newPlayer.name} rolled a ${value} and moved to ${landedSpace.name}!`);

    // If the landed space is a property and can be bought, allow buy action and wait for player
    if (landedSpace.type === 'property' && landedSpace.owner === null && newPlayer.money >= (landedSpace.price || 0)) {
      setCanEndTurn(true); // Show buy button
      // Do not end turn automatically
      return;
    }

    // Otherwise, end turn automatically after a short delay
    setTimeout(() => {
      endTurnAndReset();
    }, 1200);
  };

  // Helper to end turn
  const endTurnAndReset = () => {
    const nextPlayerIndex = (currentPlayerIndex + 1) % players.length;
    setCurrentPlayerIndex(nextPlayerIndex);
    setCanRollDice(true);
    setCanEndTurn(false);
    setSelectedProperty(null);
    toast.info(`It's now ${players[nextPlayerIndex].name}'s turn`);
  };

  const handleLandedSpace = (space: BoardSpace, player: Player) => {
    // Always show property card if landed on property
    if (space.type === 'property') {
      setSelectedProperty(space);
      
      // If property is not owned, allow purchase
      // No toast for property purchase prompt; Buy button is shown in the UI only
      // if (space.owner === null && player.money >= (space.price || 0)) {
      //   toast("Would you like to buy this property?", {
      //     action: {
      //       label: "Buy",
      //       onClick: () => handleBuyProperty(space.id, player.id),
      //     },
      //   });
      // }
      
      // If owned by someone else, pay rent (simplified)
      if (space.owner !== null && space.owner !== player.id) {
        const owner = players.find(p => p.id === space.owner);
        if (owner && space.rent) {
          const rentAmount = space.rent[0]; // Base rent for simplicity
          
          // Pay rent (simplified implementation)
          const updatedPlayers = players.map(p => {
            if (p.id === player.id) {
              return { ...p, money: p.money - rentAmount };
            }
            if (p.id === owner.id) {
              return { ...p, money: p.money + rentAmount };
            }
            return p;
          });
          
          setPlayers(updatedPlayers);
          toast.info(`${player.name} paid $${rentAmount} rent to ${owner.name}`);
        }
      }
    }
    
    // Handle other space types (simplified)
    else if (space.type === 'tax') {
      const taxAmount = 100; // Simplified tax amount
      const updatedPlayers = players.map(p => {
        if (p.id === player.id) {
          return { ...p, money: p.money - taxAmount };
        }
        return p;
      });
      
      setPlayers(updatedPlayers);
      toast.info(`${player.name} paid $${taxAmount} in taxes`);
    }
    else if (space.type === 'chance') {
      toast.info(`${player.name} landed on ${space.name}. Drawing a card...`);
      // Simplified chance card - just get some money
      const amount = Math.floor(Math.random() * 5) * 50 + 50; // 50-250
      const updatedPlayers = players.map(p => {
        if (p.id === player.id) {
          return { ...p, money: p.money + amount };
        }
        return p;
      });
      
      setPlayers(updatedPlayers);
      toast.success(`${player.name} received $${amount} from the bank!`);
    }
  };

  const handleBuyProperty = (spaceId: number, playerId: string) => {
    // Find the property space
    const propertySpace = spaces.find(space => space.id === spaceId);
    if (!propertySpace || propertySpace.owner !== null || !propertySpace.price) return;
    
    // Find the player
    const player = players.find(p => p.id === playerId);
    if (!player || player.money < propertySpace.price) return;
    
    // Update property ownership
    const updatedSpaces = spaces.map(space => {
      if (space.id === spaceId) {
        return { ...space, owner: playerId };
      }
      return space;
    });
    
    // Update player money and properties
    const updatedPlayers = players.map(p => {
      if (p.id === playerId) {
        return { 
          ...p, 
          money: p.money - propertySpace.price,
          properties: [...p.properties, propertySpace.name]
        };
      }
      return p;
    });
    
    setSpaces(updatedSpaces);
    setPlayers(updatedPlayers);
    setSelectedProperty({ ...propertySpace, owner: playerId });
    setCanEndTurn(false);
    toast.success(`${player.name} purchased ${propertySpace.name} for $${propertySpace.price}!`);

    // End turn after buying
    setTimeout(() => {
      endTurnAndReset();
    }, 1000);
  };

  const handleEndTurn = () => {
    // Move to next player
    const nextPlayerIndex = (currentPlayerIndex + 1) % players.length;
    setCurrentPlayerIndex(nextPlayerIndex);
    setCanRollDice(true);
    setCanEndTurn(false);
    setSelectedProperty(null);
    
    toast.info(`It's now ${players[nextPlayerIndex].name}'s turn`);
  };

  useEffect(() => {
    // This would handle game initialization, saved state loading, etc.
    // For demo purposes, we'll show instructions on first load
    setTimeout(() => {
      toast("Welcome to Navo Vepar! Click on 'New Game' to start playing.");
    }, 1000);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-game-light to-white">
      <div className="container mx-auto py-8 px-4 sm:px-6">
        <h1 className="text-4xl font-bold text-center mb-8 text-game-dark">Navo Vepar</h1>
        
        {gameStarted ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left column - Player dashboards */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold mb-2">Players</h2>
              {players.map((player, index) => (
                <PlayerDashboard 
                  key={player.id} 
                  player={player} 
                  isCurrentPlayer={index === currentPlayerIndex}
                />
              ))}
              
              <Separator className="my-4" />
                            {/* Hide End Turn button since turn ends after dice roll */}
                 <GameControls 
                  onStartGame={startGame} 
                  onEndTurn={() => {}} 
                  canEndTurn={false} 
                  gameStarted={gameStarted}
               />
            </div>
            
            {/* Middle column - Game board */}
            <div className="lg:col-span-1 flex justify-center items-start space-y-4 flex-col">
              <GameBoard 
                players={players} 
                currentPlayer={players[currentPlayerIndex]?.id} 
                onLandedSpace={(space) => handleLandedSpace(space, players[currentPlayerIndex])} 
              />
              
              <div className="flex justify-center w-full mt-4">
                 <Dice onRoll={handleDiceRoll} disabled={!canRollDice} />
              </div>
            </div>
            
            {/* Right column - Selected property & actions */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Current Property</h2>
              
              {selectedProperty ? (
                <div className="flex flex-col items-center space-y-4">
                  <PropertyCard 
                    name={selectedProperty.name}
                    price={selectedProperty.price || 0}
                    color={selectedProperty.color || "#000000"}
                    rent={selectedProperty.rent || [0, 0, 0, 0]}
                    owned={selectedProperty.owner !== null}
                    owner={selectedProperty.owner ? 
                      players.find(p => p.id === selectedProperty.owner)?.name || "" : ""}
                  />
                  
                  {selectedProperty.owner === null && selectedProperty.price && 
                   players[currentPlayerIndex]?.money >= selectedProperty.price && canEndTurn && (
                    <Button 
                      onClick={() => handleBuyProperty(selectedProperty.id, players[currentPlayerIndex].id)}
                      className="w-full bg-game-primary hover:bg-game-secondary"
                    >
                      Buy for ₹{selectedProperty.price}
                    </Button>
                  )}
                </div>
              ) : (
                <Card>
                  <CardContent className="p-6 text-center text-gray-500">
                    No property selected. Land on a property to see details.
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        ) : (
          <div className="max-w-md mx-auto text-center">
            <Card className="shadow-lg">
              <CardContent className="p-6 flex flex-col items-center space-y-6">
                <div className="text-2xl font-bold text-game-primary">Welcome to Navo Vepar!</div>
                <p className="text-gray-600">
                  Buy properties, collect rent, and become the wealthiest player to win!
                </p>
                <GameControls 
                  onStartGame={startGame} 
                  onEndTurn={() => {}} 
                  canEndTurn={false} 
                  gameStarted={false}
                />
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
