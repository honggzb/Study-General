import { formatPrice } from '@/lib/format-datae';
import clsx from 'clsx';
import { format } from 'date-fns';

export function Price({ name = 'BTC', price = 12.34, delta = 1 }) {
  return (
    <div className="p-4 rounded-xl bg-slate-100 border border-zinc-900">
      <div className={clsx(
        "inline-block float-right px-2 py-1 rounded-full bg-white/10",
        delta > 0 ? "text-green-500" : "text-red-500"
      )}>
        {`${delta > 0 ? '+' : ''}${((delta / price) * 100).toFixed(2)}% ${delta > 0 ? '↑' : '↓'
          }`}
      </div>
      <div className="text-lg">{name}</div>
      <div className={clsx("text-3xl font-bold", delta > 0 ? "text-green-500" : "text-red-500")}>{formatPrice(price)}</div>
      <div className="mt-1 text-xs text text-gray-700">
        Closed: {format(new Date(), 'MMM do, HH:MM:ssaa')}
      </div>
    </div>
  );
}