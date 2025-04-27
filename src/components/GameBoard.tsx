
import { useState, useEffect } from 'react';
import { IndianRupee, Plane, Bus, Dice3, Castle, Ticket, PartyPopper } from 'lucide-react';
import { BOARD_SIZE, BOARD_SIDE_LENGTH, BoardSpace, Player } from '@/types/game';

interface GameBoardProps {
  players: Player[];
  currentPlayer: string;
  onLandedSpace: (space: BoardSpace) => void;
}

const GameBoard = ({ players, currentPlayer, onLandedSpace }: GameBoardProps) => {
  const [spaces, setSpaces] = useState<BoardSpace[]>([
    // Bottom row (starting from bottom-left corner)
    { id: 0, name: "વિશ્વયાત્રા", type: "worldtour" as const, description: "World Tour" },
    { 
      id: 1, 
      name: "કચ્છ", 
      type: "property" as const, 
      color: '#8B4513', 
      price: 30400, 
      rent: [3040, 6080, 9120, 15200],
      owner: null 
    },
    { 
      id: 2, 
      name: "ભુજ", 
      type: "property" as const, 
      color: '#8B4513', 
      price: 30000, 
      rent: [3000, 6000, 9000, 15000],
      owner: null 
    },
    { id: 3, name: "એરપોર્ટ", type: "airport" as const, description: "Airport" },
    { 
      id: 4, 
      name: "રાજકોટ", 
      type: "property" as const, 
      color: '#87CEEB', 
      price: 26000, 
      rent: [2600, 5200, 7800, 13000],
      owner: null 
    },
    { 
      id: 5, 
      name: "જામનગર", 
      type: "property" as const, 
      color: '#87CEEB', 
      price: 26400, 
      rent: [2640, 5280, 7920, 13200],
      owner: null 
    },
    { id: 6, name: "મોજ મજા", type: "funevent" as const, description: "Win ₹1000" },
    { 
      id: 7, 
      name: "જૂનાગઢ", 
      type: "property" as const, 
      color: '#FF69B4', 
      price: 22000, 
      rent: [2200, 4400, 6600, 11000],
      owner: null 
    },
    { 
      id: 8, 
      name: "સોમનાથ", 
      type: "property" as const, 
      color: '#FF69B4', 
      price: 22400, 
      rent: [2240, 4480, 6720, 11200],
      owner: null 
    },
    // Right side (bottom to top)
    { id: 9, name: "લોટરી", type: "lottery" as const, description: "Lottery" },
    { id: 10, name: "બસ સ્ટેશન", type: "busstation" as const, description: "Bus Station" },
    { 
      id: 11, 
      name: "ભાવનગર", 
      type: "property" as const, 
      color: '#FFA500', 
      price: 20400, 
      rent: [2040, 4080, 6120, 10200],
      owner: null 
    },
    { 
      id: 12, 
      name: "સુરત", 
      type: "property" as const, 
      color: '#FFA500', 
      price: 20000, 
      rent: [2000, 4000, 6000, 10000],
      owner: null 
    },
    { id: 13, name: "જેલ", type: "jail" as const, description: "Jail" },
    { id: 14, name: "મોજ મજા", type: "funevent" as const, description: "Pay ₹1000" },
    { 
      id: 15, 
      name: "વલસાડ", 
      type: "property" as const, 
      color: '#FF0000', 
      price: 18400, 
      rent: [1840, 3680, 5520, 9200],
      owner: null 
    },
    { 
      id: 16, 
      name: "દમણ", 
      type: "property" as const, 
      color: '#FF0000', 
      price: 18000, 
      rent: [1800, 3600, 5400, 9000],
      owner: null 
    },
    // Top row (right to left)
    { id: 17, name: "મોજ મજા", type: "funevent" as const, description: "Win ₹5000" },
    { 
      id: 18, 
      name: "મુંબઈ", 
      type: "property" as const, 
      color: '#FFD700', 
      price: 50000, 
      rent: [5000, 10000, 15000, 25000],
      owner: null 
    },
    { 
      id: 19, 
      name: "મુંબઈ સબર્બન", 
      type: "property" as const, 
      color: '#FFD700', 
      price: 48000, 
      rent: [4800, 9600, 14400, 24000],
      owner: null 
    },
    { id: 20, name: "ચાન્સ", type: "chance" as const, description: "Chance" },
    { 
      id: 21, 
      name: "પુણે", 
      type: "property" as const, 
      color: '#008000', 
      price: 44000, 
      rent: [4400, 8800, 13200, 22000],
      owner: null 
    },
    { 
      id: 22, 
      name: "નાસિક", 
      type: "property" as const, 
      color: '#008000', 
      price: 42000, 
      rent: [4200, 8400, 12600, 21000],
      owner: null 
    },
    { id: 23, name: "વિશ્વયાત્રા", type: "worldtour" as const, description: "World Tour" },
    // Left side (top to bottom)
    { id: 24, name: "ચાન્સ", type: "chance" as const, description: "Chance" },
    { 
      id: 25, 
      name: "નાગપુર", 
      type: "property" as const, 
      color: '#0000FF', 
      price: 36400, 
      rent: [3640, 7280, 10920, 18200],
      owner: null 
    },
    { 
      id: 26, 
      name: "સત્તાર્ડા", 
      type: "property" as const, 
      color: '#0000FF', 
      price: 36000, 
      rent: [3600, 7200, 10800, 18000],
      owner: null 
    },
    { id: 27, name: "લોટરી", type: "lottery" as const, description: "Lottery Booth" },
    { 
      id: 28, 
      name: "નર્મદા", 
      type: "property" as const, 
      color: '#8B4513', 
      price: 32400, 
      rent: [3240, 6480, 9720, 16200],
      owner: null 
    },
    { 
      id: 29, 
      name: "અંકલેશ્વર", 
      type: "property" as const, 
      color: '#8B4513', 
      price: 32000, 
      rent: [3200, 6400, 9600, 16000],
      owner: null 
    },
    // Add two more spaces to make it 32 total
    { id: 30, name: "મોજ મજા", type: "funevent" as const, description: "Fun Event" },
    { id: 31, name: "ચાન્સ", type: "chance" as const, description: "Chance" },
  ]);

  useEffect(() => {
    const player = players.find(p => p.id === currentPlayer);
    if (player) {
      const currentSpace = spaces[player.position % BOARD_SIZE];
      onLandedSpace(currentSpace);
    }
  }, [players, currentPlayer, spaces, onLandedSpace]);

  const getPositionStyle = (position: number) => {
    const sideLength = BOARD_SIDE_LENGTH;
    if (position < sideLength) { // Bottom row
      return { bottom: 0, left: `${(position / sideLength) * 100}%` };
    } else if (position < sideLength * 2) { // Right side
      return { right: 0, bottom: `${((position - sideLength) / sideLength) * 100}%` };
    } else if (position < sideLength * 3) { // Top row
      return { top: 0, right: `${((position - sideLength * 2) / sideLength) * 100}%` };
    } else { // Left side
      return { left: 0, top: `${((position - sideLength * 3) / sideLength) * 100}%` };
    }
  };

  const getSpaceIcon = (type: string) => {
    switch (type) {
      case 'airport':
        return <Plane className="w-3 h-3" />;
      case 'busstation':
        return <Bus className="w-3 h-3" />;
      case 'chance':
        return <Dice3 className="w-3 h-3" />;
      case 'worldtour':
        return <Castle className="w-3 h-3" />;
      case 'lottery':
        return <Ticket className="w-3 h-3" />;
      case 'funevent':
        return <PartyPopper className="w-3 h-3" />;
      default:
        return null;
    }
  };

  return (
    <div className="relative w-full max-w-3xl aspect-square bg-game-light rounded-lg shadow-xl border-4 border-game-primary overflow-hidden">
      {/* Absolute-positioned property cards around the board edges */}
      {spaces.map((space, index) => {
        // Board is a square, so divide spaces equally among 4 sides
        const sideLength = BOARD_SIDE_LENGTH;
        let style: React.CSSProperties = {
          position: 'absolute',
          width: `calc(100% / ${sideLength} - 4px)`, // leave space for border
          height: `calc(100% / ${sideLength} - 4px)`
        };
        let rotate = 0;
        // Bottom side: left to right
        if (index < sideLength) {
          style.left = `calc(${(index / sideLength) * 100}% )`;
          style.bottom = 0;
        } 
        // Right side: bottom to top
        else if (index < sideLength * 2) {
          style.right = 0;
          style.bottom = `calc(${((index - sideLength) / sideLength) * 100}% )`;
          rotate = 90;
        } 
        // Top side: right to left
        else if (index < sideLength * 3) {
          style.right = `calc(${((index - sideLength * 2) / sideLength) * 100}% )`;
          style.top = 0;
          rotate = 180;
        } 
        // Left side: top to bottom
        else {
          style.left = 0;
          style.top = `calc(${((index - sideLength * 3) / sideLength) * 100}% )`;
          rotate = 270;
        }
        style.transform = `rotate(${rotate}deg)`;
        style.transformOrigin = 'center center';
        style.display = 'flex';
        style.alignItems = 'center';
        style.justifyContent = 'center';
        style.padding = '2px';
        style.boxSizing = 'border-box';
        style.zIndex = 2;
        style.backgroundColor = space.type === 'property' ? space.color : 'white';
        style.color = space.type === 'property' ? 'white' : 'black';
        style.border = '1px solid #e5e7eb';
        style.fontSize = '0.7rem';
        return (
          <div
            key={space.id}
            style={style}
            className={`game-space ${space.type !== 'property' ? 'bg-white text-black' : 'text-white'}`}
          >
            <div style={{ width: '100%', textAlign: 'center', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {space.name}
              {space.description && (
                <div style={{ fontSize: '0.5rem', opacity: 0.75 }}>{space.description}</div>
              )}
              {getSpaceIcon(space.type)}
              {space.price && (
                <div style={{ fontSize: '0.6rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '2px' }}>
                  <IndianRupee className="w-2 h-2" />
                  {space.price}
                </div>
              )}
            </div>
          </div>
        );
      })}

      {/* Player tokens */}
      {players.map((player, index) => (
        <div 
          key={player.id}
          className="absolute w-6 h-6 rounded-full border-2 border-white shadow-md transition-all duration-500 ease-in-out flex items-center justify-center text-xs font-bold text-white"
          style={{ 
            backgroundColor: player.color,
            ...getPositionStyle(player.position),
            transform: player.id === currentPlayer ? 'scale(1.2)' : 'scale(1)',
            zIndex: player.id === currentPlayer ? 10 : 5,
          }}
        >
          {player.name.charAt(0)}
        </div>
      ))}
    </div>
  );
};
export default GameBoard;
