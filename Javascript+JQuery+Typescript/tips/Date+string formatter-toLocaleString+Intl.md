## [toLocaleString + Intl](#top)

- [toLocaleString - Date+string formatter](#tolocalestring---datestring-formatter)
  - [number.toLocaleString(locales, options)](#numbertolocalestringlocales-options)
  - [Date toLocaleString()](#date-tolocalestring)
- [Intl interface](#intl-interface)

## toLocaleString - Date+string formatter

- can used with javascript type, like `Dates/Time`, `Numbers`, `Objects`, `Arrays`

### number.toLocaleString(locales, options)

- `number.toLocaleString(locales, options)`

|options||sample|
|---|---|---|
|locales|`en-CA`, `de-DE`,`zh-CN`|`(123456.789).toLocaleString('de-DE')  // 123.456,789`<br>`(123456).toLocaleString('fi-FI');  // 123 456,789`|
|currency|`EUR`, `USD`", `INR`|`(1000).toLocaleString('en-US', {style: 'currency', currency: 'USD'}) //'$1,000.00'`<br>`(1000).toLocaleString("en-GB", {style: 'currency', currency: 'EUR'})  //€1,000.00`|

```ts
(15000).toLocaleString("en-GB", {
    style: "currency",
    currency: "USD",
    currencyDisplay: "narrowSymbol",
    currencySign: "accounting",
  })     // $15,000.00
Math.LOG10E.toLocaleString("fr-FR", {
    notation: "scientific",
    maximumSignificantDigits: 5,
  })    // 4,3429E-1
Math.E.toLocaleString("de-DE", {
    notation: "standard",
    maximumFractionDigits: 5,
  })  // => 2,71828
(0.0034595).toLocaleString("en-US", {
    notation: "engineering",
    minimumSignificantDigits: 2,
    maximumSignificantDigits: 3,
  })   // => 3.46E-3
(2000).toLocaleString("en-US", { notation: "scientific" })   // 2E3
(2000).toLocaleString("en-US", { notation: "standard" })     // 2,000
(0.56).toLocaleString("en-US", { style: "percent" })          // 56 %

(123456.789).toLocaleString('en-US', { style: 'unit', unit: 'meter', unitDisplay: 'long' })  // 123,456.789 meters
(123456.789).toLocaleString('en-US', { style: 'unit', unit: 'kilogram', unitDisplay: 'long' })  // 123,456.789 kilograms
(123456.789).toLocaleString('en-US', { style: 'unit', unit: 'kilogram', unitDisplay: 'short' })  // 123,456.789 kg

(80).toLocaleString("en-GB", {
    style: "unit",
    unit: "mile-per-hour",
    unitDisplay: "long",
  })    // 80 miles per hour
(80).toLocaleString("en-GB", {
    style: "unit",
    unit: "mile-per-hour",
    unitDisplay: "narrow",
  })   // 80mph
(40).toLocaleString("de-DE", {
    style: "unit",
    unit: "kilobyte-per-second",
    unitDisplay: "narrow",
  })   // 40 kB/s
(80).toLocaleString("en-US", {
    style: "unit",
    unit: "megabyte",
  })    // 80 MB

```

> https://www.w3schools.com/jsref/jsref_tolocalestring_number.asp

[🚀back to top](#top)

### Date toLocaleString()

- `dateObj.toLocaleString(locales, options)`

```ts
const specificDate = new Date('2024-05-16');
const locale = 'en-US';
const options = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
};
specificDate.toLocaleDateString(locale, options)     // Thursday, May 16, 2024
new Date().toLocaleString('en-US')      // "3/15/2024, 10:00:00 AM"
```

|Property	|Legal Values|
|---|---|
|dateStyle|	"full", "long", "medium", "short"|
|timeStyle|	"full", "long", "medium", "short"|
|localeMatcher|, "best-fit" (default), "lookup"|
|timeZone	||
|hour12|false, true|
|hourCycle	|"h11", "h12", "h23", "h24"|
|formatMatcher| "basic", "best-fit" (default)|
|weekday|	"long", "short", "narrow"|
|year	|"2-digit", "numeric"|
|month	|"2-digit", "long", "narrow", "numeric", "short"|
|day|	"2-digit", "numeric"
|hour	|"2-digit", "numeric"|
|minute|	"2-digit", "numeric"|
|second	|"2-digit", "numeric"|
|timeZoneName|	"long", "short"|

- https://www.w3schools.com/jsref/jsref_tolocalestring.asp
- https://www.codecademy.com/resources/docs/javascript/dates/toLocaleString

[🚀back to top](#top)

## Intl interface

- `Intl` is another powerful interface for the language-sensitive string representation of numbers, dates, and times. Its usage is very similar to the toLocaleString method
- `Intl.NumberFormat` constructors : `Intl.NumberFormat(locale, options)`
- `Intl.DateTimeFormat` constructors: `Intl.DateTimeFormat(locales, options)`
- `Intl.ListFormat`: Natural Language Lists
- `Intl.RelativeTimeFormat`: Human-Friendly Timestamps
- `Intl.DisplayNames`: Localized Names For Everything

|options|	output|
|---|---|
|`{ minimumFractionDigits: 4, maximumFractionDigits: 4 }`	|'1,234.5679'|
|`{ minimumSignificantDigits: 4, maximumSignificantDigits: 4 }`|	'1,235'|
|`{ minimumFractionDigits: 0, maximumFractionDigits: 0, roundingMode: "floor" }`	|'1,234'|
|`{ minimumFractionDigits: 0, maximumFractionDigits: 0, roundingMode: "floor", roundingIncrement: 10 }`|	'1,230'|

```ts
new Intl.NumberFormat('en-GB', { style: 'unit', unit: 'kilobyte-per-second'}).format(20)   // 20 kB/s
const results = [];
for (const options of [
  { minimumFractionDigits: 4, maximumFractionDigits: 4 },                        //1,234.5678
  { minimumSignificantDigits: 4, maximumSignificantDigits: 4 },                  //1,235
  { minimumFractionDigits: 0, maximumFractionDigits: 0, roundingMode: "floor" }, // 1,234
  {
    minimumFractionDigits: 0,                                                    // 1,230
    maximumFractionDigits: 0,
    roundingMode: "floor",
    roundingIncrement: 10,
  },
]) {
  const nf = new Intl.NumberFormat("en-US", options);
  results.push({
    options,
    output: nf.format(1234.56789),
  });
}
const heightRange = {
  min: 1.63,
  max: 1.95,
};
const nf = new Intl.NumberFormat("en-US", { style: "unit", unit: "meter" });
nf.formatRange(heightRange.min, heightRange.max);  // 1.63–1.95 m


/*  Intl.DateTimeFormat(locale, options)  */
const df1 = new Intl.DateTimeFormat("en-US", {
  // Include all components (usually)
  dateStyle: "full",
  timeStyle: "full",
});
const df2 = new Intl.DateTimeFormat("en-US", {
  // Display the calendar date
  era: "short",
  year: "numeric",
  month: "long",
  day: "numeric",
});
const df3 = new Intl.DateTimeFormat("en-US", {
  // Display a time like on a digital clock
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  timeZoneName: "shortOffset",
});
const targetDate = new Date(2022, 0, 1, 12, 34, 56); // 2022-01-01 12:34:56 in the local time zone
console.log(df1.format(targetDate));
// Saturday, January 1, 2022 at 12:34:56 PM Coordinated Universal Time
// January 1, 2022 AD
// 12:34:56 PM GMT

//  use the user’s preferred language
const browserLocale = navigator.language || 'ja-JP';
const formatter = new Intl.NumberFormat(browserLocale, { style: 'currency', currency: 'JPY' });
// // Force a specific locale regardless of page language
const tutorialFormatter = new Intl.NumberFormat('zh-CN', { style: 'currency', currency: 'CNY' });
console.log(`Chinese example: ${tutorialFormatter.format(199.99)}`); // Output: ¥199.99

/* Intl.ListFormat: Natural Language Lists */
const items = ['apples', 'oranges', 'bananas'];
console.log(new Intl.ListFormat('en-US', { type: 'conjunction' }).format(items));
// "apples, oranges, and bananas"
console.log(new Intl.ListFormat('de-DE', { type: 'conjunction' }).format(items));
// "Äpfel, Orangen und Bananen"
// Disjunction ("or") list
console.log(new Intl.ListFormat('en-US', { type: 'disjunction' }).format(items));
// "apples, oranges, or bananas"
console.log(new Intl.ListFormat('fr-FR', { type: 'disjunction' }).format(items));
// "apples, oranges ou bananas"

/*Intl.RelativeTimeFormat: Human-Friendly Timestamps*/
const rtf = new Intl.RelativeTimeFormat('en-US', { numeric: 'auto' });
console.log(rtf.format(-1, 'day'));    // "yesterday"
console.log(rtf.format(1, 'day'));     // "tomorrow"
console.log(rtf.format(-7, 'day'));    // "7 days ago"
console.log(rtf.format(3, 'month'));   // "in 3 months"
console.log(rtf.format(-2, 'year'));   // "2 years ago"
// French example:
const frRtf = new Intl.RelativeTimeFormat('fr-FR', { numeric: 'auto', style: 'long' });
console.log(frRtf.format(-1, 'day'));    // "hier"
console.log(frRtf.format(1, 'day'));     // "demain"
console.log(frRtf.format(-7, 'day'));    // "il y a 7 jours"
console.log(frRtf.format(3, 'month'));   // "dans 3 mois"
/*Intl.DisplayNames: Localized Names For Everything  */
// Display language names in English
const langNamesEn = new Intl.DisplayNames(['en'], { type: 'language' });
console.log(langNamesEn.of('fr'));      // "French"
console.log(langNamesEn.of('es-MX'));   // "Mexican Spanish"
// Display language names in French
const langNamesFr = new Intl.DisplayNames(['fr'], { type: 'language' });
console.log(langNamesFr.of('en'));      // "anglais"
console.log(langNamesFr.of('zh-Hans')); // "chinois (simplifié)"
// Display region names
const regionNamesEn = new Intl.DisplayNames(['en'], { type: 'region' });
console.log(regionNamesEn.of('US'));    // "United States"
console.log(regionNamesEn.of('DE'));    // "Germany"
// Display script names
const scriptNamesEn = new Intl.DisplayNames(['en'], { type: 'script' });
console.log(scriptNamesEn.of('Latn'));  // "Latin"
console.log(scriptNamesEn.of('Arab'));  // "Arabic"
```

[🚀back to top](#top)

- https://www.smashingmagazine.com/2025/08/power-intl-api-guide-browser-native-internationalization/
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Internationalization
