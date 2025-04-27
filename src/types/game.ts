
export interface Player {
  id: string;
  name: string;
  color: string;
  position: number;
  money: number;
  properties: string[];
}

export interface BoardSpace {
  id: number;
  name: string;
  type: 'property' | 'chance' | 'tax' | 'go' | 'jail' | 'free' | 'goto' | 'worldtour' | 'funevent' | 'airport' | 'lottery' | 'busstation';
  color?: string;
  price?: number;
  rent?: number[];
  owner?: string | null;
  description?: string;
}

export interface GameState {
  players: Player[];
  currentPlayerIndex: number;
  spaces: BoardSpace[];
  gameStarted: boolean;
  diceValue: number | null;
  canRollDice: boolean;
  canEndTurn: boolean;
}

// Constants for board configuration
export const BOARD_SIZE = 32; // Total spaces on the board
export const BOARD_SIDE_LENGTH = 8; // Number of spaces on each side

export const CITY_COLORS = {
  BROWN: '#8B4513',
  LIGHT_BLUE: '#87CEEB',
  PINK: '#FF69B4',
  ORANGE: '#FFA500',
  RED: '#FF0000',
  YELLOW: '#FFD700',
  GREEN: '#008000',
  BLUE: '#0000FF'
} as const;
