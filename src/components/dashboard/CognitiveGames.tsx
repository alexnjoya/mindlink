import { GamesIcon } from "../icons";
import { Card } from "../shared/Card";

export function CognitiveGames() {
  return (
    <section className="mb-10">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg sm:text-xl font-semibold text-gray-900">Cognitive Games</h3>
        <button className="text-purple-600 font-medium hover:text-purple-700 text-sm">
          View all
        </button>
      </div>
      <Card className="p-4 h-full flex flex-col">
        <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-3">
          <GamesIcon className="w-6 h-6 text-purple-600" />
        </div>
        <h4 className="font-semibold text-gray-900 mb-1">Memory Challenge</h4>
        <p className="text-sm text-gray-600 mb-3">Featured game of the day</p>
        <p className="text-sm text-gray-600 mb-3">
          Test your memory skills with this engaging puzzle game.
        </p>
        <button className="w-fit bg-purple-600 text-white px-4 py-2 rounded-full font-medium hover:bg-purple-700 transition-colors">
          Play Now
        </button>
      </Card>
    </section>
  );
}

