## date-fns

1. Basic Formatting & Parsing

```ts
Import: import { format } from 'date-fns';
//
format(new Date(), 'yyyy-MM-dd') // '2025-12-15'/
//Custom Format: 
format(new Date(), 'dd MMMM yyyy') // '15 December 2025'
//Interactive Demo: Use date-fns-interactive.netlify.app to see patterns like hh:mm:ss a dd/LL/yyyy
format(new Date(), "'Today is a' eeee")   //=> "Today is a Monday"
```

2. Date Manipulation (Adding/Subtracting)

```ts
import { addDays, subDays, formatRelative, formatDistance } from 'date-fns';
addDays(new Date(), 7)  // Add Days (adds 7 days)
subDays(new Date(), 3) // Subtract Days (subtracts 3 days)
formatDistance(subDays(new Date(), 3), new Date(), { addSuffix: true })  // //=> "3 days ago"
formatRelative(subDays(new Date(), 3), new Date()) // "last Friday at 7:26 p.m." 
// composition $ FP
import { addYears, formatWithOptions } from 'date-fns/fp'
import { eo } from 'date-fns/locale'
const addFiveYears = addYears(5)
const dateToString = formatWithOptions({ locale: eo }, 'D MMMM YYYY')
const dates = [
  new Date(2017, 0, 1),
  new Date(2017, 1, 11),
  new Date(2017, 6, 2)
]
const toUpper = arg => String(arg).toUpperCase()
const formattedDates = dates.map(addFiveYears).map(dateToString).map(toUpper)
//=> ['1 JANUARO 2022', '11 FEBRUARO 2022', '2 JULIO 2022']
```

3. Comparisons & Sorting

```ts
import { compareAsc } from 'date-fns';
dates.sort(compareAsc); //sorts an array of dates chronologically
```

4. Timezone Handling (with date-fns-tz)

```ts
import { formatInTimeZone } from 'date-fns-tz';
formatInTimeZone(new Date(), 'America/New_York', 'yyyy-MM-dd HH:mm')  //Format in Timezone: formats to New York time 
const validDate = new Date(2023, 1, 30); // February 30, 2023 is not a valid date 
const invalidDate = new Date(NaN);      // Invalid date 

```

## i18n

```ts
import { formatRelative, subDays } from 'date-fns'
import { es, ru } from 'date-fns/locale'
formatRelative(subDays(new Date(), 3), new Date())
//=> "last Friday at 7:26 p.m."
formatRelative(subDays(new Date(), 3), new Date(), { locale: es })
//=> "el viernes pasado a las 19:26"
formatRelative(subDays(new Date(), 3), new Date(), { locale: ru })
//=> "в прошлую пятницу в 19:26"
```

- https://github.com/date-fns/date-fns/blob/main/docs/i18n.md
- https://date-fns.org/#:~:text=Examples,FP
