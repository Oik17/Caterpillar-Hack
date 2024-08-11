import { Card } from "@/components/ui/card";
import Image from "next/image";
import { useRouter } from "next/navigation";

type CardProps = React.ComponentProps<typeof Card>;

interface HealthCheck {
  components: Record<string, Record<string, number>>;
  health_score: number;
}

interface VehicleData {
  id: string;
  machine: string;
  health_check: HealthCheck[] | null;
}

export function VehicleCard({ className, data, ...props }: CardProps & { data: VehicleData }) {
  const router = useRouter();

  const onClick = () => {
    router.push(`/healthCheck/${data.id}`);
  };

  // Check if health_check is available and contains data
  const healthScore = data.health_check && data.health_check.length > 0 
    ? data.health_check[0].health_score 
    : null;

  return (
    <div className="md:w-[300px] w-[200px] h-[300px] bg-slate-400 relative cursor-pointer" onClick={onClick}>
      <Image
        src={`/${data.machine}.jpeg`}
        alt={data.machine}
        width={300}
        height={100}
        className="h-full object-cover"
      />
      <div className="absolute inset-0 bg-black opacity-30"></div>
      <div className="absolute bottom-0 left-0 right-0 text-white px-6 py-4 ">
        <h2 className="text-2xl font-bold mb-2">{data.machine}</h2>
        <div className="flex flex-col items-start">
          <span className="mr-2">Health Score</span>
          {healthScore !== null ? (
            <>
              <span className="ml-2 mt-2">{healthScore.toFixed(2)}</span>
              <div className="h-3 w-full rounded-full mt-2">
                <div
                  className={` h-full rounded-full ${healthScore>50?'bg-green-500':'bg-yellow-400'}`}
                  style={{ width: `${healthScore}%` }}
                ></div>
              </div>
            </>
          ) : (
            <span className="ml-2 mt-2">No Data</span>
          )}
        </div>
      </div>
    </div>
  );
}
