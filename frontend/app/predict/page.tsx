import Navigation from "@/components/Navigation";
import { PredictForm } from "@/components/PredictForm";

const Predict = () => {
    return ( 
        <div className="w-full h-screen flex flex-col items-center gap-8">
            <Navigation page={'predict'}/>
            <div><PredictForm/></div>
        </div>
     );
}
 
export default Predict;