import Image from 'next/image';

export default function PlayerCard({ player }) {
  return (
    <div className="card hover:shadow-lg transition-shadow">
      <div className="flex items-center gap-4">
        {player.photo?.url && (
          <Image
            src={player.photo.url}
            alt={player.name}
            width={80}
            height={80}
            className="rounded-full"
          />
        )}
        <div className="flex-1">
          <h3 className="text-xl font-bold">{player.name}</h3>
          <p className="text-gray-600">{player.category}</p>
          <div className="flex gap-4 mt-2 text-sm">
            <span>Base: ₹{player.basePrice.toLocaleString()}</span>
            {player.isSold && (
              <span className="text-green-600 font-semibold">
                Sold: ₹{player.soldPrice.toLocaleString()}
              </span>
            )}
          </div>
        </div>
        {player.isSold ? (
          <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm">
            Sold
          </span>
        ) : (
          <span className="bg-yellow-500 text-white px-3 py-1 rounded-full text-sm">
            Available
          </span>
        )}
      </div>
    </div>
  );
}
