/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, CardContent } from "@/components/ui/card";

const StateCard = ({ title, value, icon: Icon, color }: any) => (
  <Card
    className="border-0 shadow-lg overflow-hidden relative"
    style={{
      background: `linear-gradient(135deg, ${color} 0%, ${color}dd 100%)`,
    }}
  >
    <CardContent className="p-6">
      <div className="flex items-center justify-between relative z-10">
        <div>
          <p className="text-white/80 text-sm font-medium">{title}</p>
          <p className="text-3xl font-bold mt-2 text-white">{value}</p>
        </div>
        <div className="p-3 bg-white/20 rounded-lg backdrop-blur-sm">
          <Icon className="h-6 w-6 text-white" />
        </div>
      </div>
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-8 -mt-8" />
    </CardContent>
  </Card>
);
export default StateCard;
