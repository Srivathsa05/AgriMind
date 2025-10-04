import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// Placeholder data for equipment
const equipmentData = [
  {
    name: "Tractor",
    image: "https://placehold.co/600x400/22c55e/ffffff?text=Tractor",
    type: "Rental / Buy",
    priceRent: "$150/day",
    priceBuy: "$25,000",
    description: "Heavy-duty tractor for plowing and tilling large fields.",
  },
  {
    name: "Combine Harvester",
    image: "https://placehold.co/600x400/22c55e/ffffff?text=Harvester",
    type: "Rental",
    priceRent: "$300/day",
    description: "Efficiently harvest crops like wheat, corn, and rice.",
  },
  {
    name: "Seed Drill",
    image: "https://placehold.co/600x400/22c55e/ffffff?text=Seed+Drill",
    type: "Rental / Buy",
    priceRent: "$80/day",
    priceBuy: "$5,000",
    description: "Automated seed planter for precise and uniform sowing.",
  },
  {
    name: "Irrigation Sprinkler",
    image: "https://placehold.co/600x400/22c55e/ffffff?text=Sprinkler",
    type: "Buy",
    priceBuy: "$1,200",
    description: "Automated sprinkler system for efficient field irrigation.",
  },
  {
    name: "Pesticide Sprayer",
    image: "https://placehold.co/600x400/22c55e/ffffff?text=Sprayer",
    type: "Rental",
    priceRent: "$50/day",
    description: "Portable sprayer for applying pesticides and fertilizers.",
  },
  {
    name: "Rotary Tiller",
    image: "https://placehold.co/600x400/22c55e/ffffff?text=Tiller",
    type: "Rental / Buy",
    priceRent: "$70/day",
    priceBuy: "$2,500",
    description: "Prepares the soil for planting by breaking up hard ground.",
  },
];

const EquipmentPage = () => {
  return (
    <div className="min-h-screen bg-background pt-24">
      <div className="container mx-auto px-4 pb-12">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Equipment Rentals & Sales
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Find the right tools for your farm. Rent for a season or buy for a lifetime.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {equipmentData.map((item, index) => (
            <Card key={index} className="overflow-hidden flex flex-col hover:shadow-lg transition-shadow">
              <CardHeader className="p-0">
                <img src={item.image} alt={item.name} className="w-full h-48 object-cover" />
              </CardHeader>
              <CardContent className="p-6 flex-grow">
                <Badge variant="secondary" className="mb-2">{item.type}</Badge>
                <CardTitle className="text-2xl mb-2">{item.name}</CardTitle>
                <p className="text-muted-foreground text-sm">{item.description}</p>
                <div className="mt-4 font-semibold text-foreground">
                  {item.priceRent && <span>Rent: {item.priceRent}</span>}
                  {item.priceRent && item.priceBuy && <span className="mx-2">|</span>}
                  {item.priceBuy && <span>Buy: {item.priceBuy}</span>}
                </div>
              </CardContent>
              <CardFooter className="p-6 bg-muted/30 flex gap-4 mt-auto">
                {item.priceBuy && <Button className="w-full">Buy Now</Button>}
                {item.priceRent && <Button variant="outline" className="w-full">Rent Now</Button>}
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EquipmentPage;

