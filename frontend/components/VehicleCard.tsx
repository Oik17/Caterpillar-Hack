import { Card } from "@/components/ui/card";
import Image from "next/image";
import { useRouter } from "next/navigation";

type CardProps = React.ComponentProps<typeof Card>;

export function VehicleCard({ className, data, ...props }: CardProps & { data: any }) {
    const router = useRouter();
    const onClick=()=>{
        router.push(`/healthCheck/${data.id}`)
    }
  return (
    <div className="md:w-[300px] w-[200px] h-[300px] bg-slate-400 relative cursor-pointer" onClick={onClick}>
      
      <Image
        src={`/${data.machine}.jpeg`}
        alt={data.machine}
        width={100}
        height={100}
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black opacity-30"></div>
      <div className="absolute bottom-0 left-0 right-0 text-white px-6 py-4">
        <h2 className="text-2xl font-bold mb-2">{data.machine}</h2>
        <div className="flex flex-col items-start">
          <span className="mr-2">Health Score</span>
              <span className="ml-2 mt-2">{data.health_score}</span>
          <div className=" h-3 w-full rounded-full">
            <div 
              className="bg-green-600 h-full" 
              style={{ width: `${data.healthScore}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}