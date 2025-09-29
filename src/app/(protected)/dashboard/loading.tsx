import { Loader2} from "lucide-react";
import { cn } from "@/lib/utils";

const Loading=()=>
{
    return (
        <div className="min-h-screen bg-background flex items-center justify-center">
            <div className="flex flex-col items-center text-center gap-4">
                <Loader2 
                className={cn("animate-spin h-8 w-8 text-primary","transition-colors duration-200")} />
                <div className="space-y-1">
                    <p className="text-sm font-medium text-foreground">Loading your dashboard</p>
                    <p className="text-sm text-muted-foreground">Please wait a moment...</p>
                </div>
            </div>
        </div>
    )
}
export default Loading  
