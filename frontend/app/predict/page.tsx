import Navigation from "@/components/Navigation";
import { PredictForm } from "@/components/PredictForm";

const Predict = () => {
  return (
    <div className="w-full h-screen flex flex-col items-center gap-8">
      <div className="'h-20 w-full">
        <Navigation page={"predict"} />
      </div>
      <div className="overflow-y-auto w-full scrollbar">
        <PredictForm />
      </div>
    </div>
  );
};

export default Predict;
