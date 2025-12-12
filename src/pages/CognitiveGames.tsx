import React from "react";
import Card from "../components/games/sharedComponents/Card";
import type { IGames, IGame } from "../types/game/base";

export function CognitiveGames({games}:IGames) {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Cognitive Games</h1>
      <div className="bg-white rounded-xl p-6 shadow-[0_1px_2px_0_rgba(0,0,0,0.05)]">
        <p className="text-gray-600">Access mini-games to improve memory, attention, and cognitive skills.</p>
      </div>
      <div className="flex flex-wrap gap-4 p-5 justify-start">
        {games?.map((game: IGame, index: React.Key | null | undefined) => (
          <div key={index} className="w-[240px] h-[240px] sm:w-[200px] lg:w-[200px]">
            <Card game={game} text={"Play"} />
          </div>
        ))}
      </div>
    </div>
  );
}

