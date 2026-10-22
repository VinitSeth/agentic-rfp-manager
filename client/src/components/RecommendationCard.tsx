import { Link } from "react-router-dom";

export type Recommendation = {
    serialNumber: number;
    label: string;
    score: number;
    points: string[];
    recommended: boolean;
};

type RecommendationCardProps = {
    recommendation: Recommendation;
};

export function RecommendationCard({ recommendation }: RecommendationCardProps) {
    return (
        <article className={`flex flex-col bg-[rgba(255,255,255,0.72)] overflow-hidden border border-4 rounded-[18px] min-h-[150px] shadow-[0_5px_18px_rgba(29,42,68,0.04)] ${recommendation.recommended ? "border-green-500" : "border-[rgba(145,170,198,0.22)]"}`}>
            <div className={`p-3 text-lg ${recommendation.recommended ? "bg-green-500 text-white" : "text-blue-500"}`}>
                #{recommendation.serialNumber} {recommendation.recommended ? "Recommended" : ""}
            </div>
            <div className="p-4 flex flex-col flex-1">
                <h2 className="font-bold text-2xl">{recommendation.label}</h2>
                <div className="stat-score"><span className="font-semibold">{recommendation.score}</span> / <span className="text-[25px]">100</span></div>
                <div className="flex flex-col gap-6 flex-1 mb-6">
                    {recommendation.points.map((point, index) => (
                        <div key={index} className="stat-point">
                            <span className="px-2 py-1 rounded-full bg-green-500 text-xs mr-2 text-white">✓</span>{point}
                        </div>
                    ))}
                </div>
                <div className="flex justify-center w-full">
                    <Link to="/procurement-analytics" type="button" className="primary-button-2">
                        View Rationale
                    </Link>
                </div>
            </div>
        </article>
    );
}
