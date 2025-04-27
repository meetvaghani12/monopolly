
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { IndianRupee } from "lucide-react";

interface PropertyCardProps {
  name: string;
  price: number;
  color: string;
  rent: number[];
  owned?: boolean;
  owner?: string;
}

const PropertyCard = ({ name, price, color, rent, owned = false, owner = "" }: PropertyCardProps) => {
  return (
    <Card className="w-60 overflow-hidden shadow-lg hover:shadow-xl transition-shadow animate-bounce-in">
      <div 
        className="h-12 w-full" 
        style={{ backgroundColor: color }}
      ></div>
      <CardHeader className="p-3 pb-0">
        <h3 className="font-bold text-lg">{name}</h3>
      </CardHeader>
      <CardContent className="p-3 space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Price:</span>
          <span className="font-bold flex items-center">
            <IndianRupee className="w-4 h-4 mr-1" />
            {price}
          </span>
        </div>
        
        <div className="space-y-1">
          <p className="text-sm text-gray-600">Rent:</p>
          <ul className="text-sm space-y-1">
            <li className="flex justify-between items-center">
              <span>Base rent:</span>
              <span className="flex items-center">
                <IndianRupee className="w-3 h-3 mr-1" />
                {rent[0]}
              </span>
            </li>
            <li className="flex justify-between items-center">
              <span>With 1 house:</span>
              <span className="flex items-center">
                <IndianRupee className="w-3 h-3 mr-1" />
                {rent[1]}
              </span>
            </li>
            <li className="flex justify-between items-center">
              <span>With 2 houses:</span>
              <span className="flex items-center">
                <IndianRupee className="w-3 h-3 mr-1" />
                {rent[2]}
              </span>
            </li>
            <li className="flex justify-between items-center">
              <span>With hotel:</span>
              <span className="flex items-center">
                <IndianRupee className="w-3 h-3 mr-1" />
                {rent[3]}
              </span>
            </li>
          </ul>
        </div>
      </CardContent>
      <CardFooter className="p-3 pt-0 flex justify-between items-center">
        {owned ? (
          <div className="text-sm text-gray-600">
            Owned by: <span className="font-semibold">{owner}</span>
          </div>
        ) : (
          <div className="text-sm text-gray-600">Available for purchase</div>
        )}
      </CardFooter>
    </Card>
  );
};

export default PropertyCard;
