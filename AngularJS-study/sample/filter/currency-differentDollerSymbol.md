```javascript
app.filter('money', [ '$filter', '$locale', function (filter, locale) {
    var currencyFilter = filter('currency');
    var formats = locale.NUMBER_FORMATS;
    var getCurrencySymbol = function (code) {
        switch (code.toUpperCase()) {
            case 'EUR': //Euro
                return '€';
            case 'USD': //Dólar americano
            case 'MXN': //Peso mejicano
            case 'CAD': //Dólar de Canadá
            case 'AUD': //Dólar australiano
            case 'NZD': //Dólar neozelandés
            case 'HKD': //Dólar de Hong Kong
            case 'SGD': //Dólar de Singapur
            case 'ARS': //Peso argentino
                return '$';
            case 'CNY': //Yuan chino
            case 'JPY': //Yen japonés
                return '¥';
            case 'GBP': //Libra esterlina
            case 'GIP': //Libras de Gibraltar
                return '£';
            case 'BRL': //Real brasileño
                return 'R$';
            case 'INR': //Rupia india
                return 'Rp';
            case 'CHF': //Franco suizo
                return 'Fr';
            case 'SEK': //Corona sueca
            case 'NOK': //Corona noruega
                return 'kr';
            case 'KPW': //Won de Corea del Norte
            case 'KRW': //Won de Corea del Sur
                return '₩';
            default: return code;
        }
    };
    return function (amount, currency) {
        var value;
        if (currency) {
            value = currencyFilter(amount, getCurrencySymbol(currency));
        }
        else {
            value = currencyFilter(amount);
        }
        //Remove trailing zeros
        var regex = new RegExp("\\" + formats.DECIMAL_SEP + "0+", "i");
        return value.replace(regex, '');
    };
}]);
```
