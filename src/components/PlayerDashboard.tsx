
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Player {
  id: string;
  name: string;
  color: string;
  position: number;
  money: number;
  properties: string[];
}

interface PlayerDashboardProps {
  player: Player;
  isCurrentPlayer: boolean;
}

const PlayerDashboard = ({ player, isCurrentPlayer }: PlayerDashboardProps) => {
  return (
    <Card className={`overflow-hidden transition-all ${isCurrentPlayer ? 'ring-2 ring-game-primary shadow-lg' : ''}`}>
      <div className="h-2" style={{ backgroundColor: player.color }}></div>
      <CardHeader className="p-4 pb-2 flex flex-row items-center justify-between">
        <div className="flex items-center gap-2">
          <div 
            className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold"
            style={{ backgroundColor: player.color }}
          >
            {player.name.charAt(0)}
          </div>
          <h3 className="font-bold">{player.name}</h3>
        </div>
        {isCurrentPlayer && <Badge className="bg-game-primary hover:bg-game-secondary">Current Turn</Badge>}
      </CardHeader>
      
      <CardContent className="p-4 pt-2">
        <div className="space-y-2">
          <div className="flex justify-between">
            <span>Money:</span>
            <span className="font-bold">${player.money}</span>
          </div>
          
          <div>
            <span className="block mb-1">Properties:</span>
            <div className="flex flex-wrap gap-1">
              {player.properties.length > 0 ? (
                player.properties.map((property, index) => (
                  <Badge key={index} variant="outline" className="text-xs bg-gray-100">
                    {property}
                  </Badge>
                ))
              ) : (
                <span className="text-sm text-gray-500">No properties owned</span>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PlayerDashboard;
