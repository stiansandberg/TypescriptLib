class Validation {

    static isNullOrEmpty(value: any): boolean {
        if (value == null || typeof value === 'undefined')
            return true;

        var type = typeof (value);

        if (type === 'string') {
            return (value as string).trim().length === 0;
        }
        else if (type === 'number') {
            if (isNaN(value))
                return true;
            return (value as number).toString().length === 0;
        }
        else if (type === 'object') {

            if (Array.isArray(value)) {
                return (value as Array<any>).length === 0;
            }

            for (var x in value) {
                return false;
            }

            if (!value[0]) {
                return true;
            }
        }

        return (value as string).toString().trim().length === 0;
    }

    static isEmail(value: any): boolean {
        if (Validation.isNullOrEmpty(value))
            return false;

        var re = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i;
        var regExResult = re.test(value);
        if (regExResult) {
            // do some additional tests
            var tld = (value as string).substring((value as string).lastIndexOf('.') + 1);
            if (!tld || tld.length === 1)
                return false;
        }
        return regExResult;
    }

    static isNumber(value: any): boolean {
        if (Validation.isNullOrEmpty(value)) {
            return false;
        }
        var result = value === Number(value) && value % 1 !== 0;
        if (!result) {
            result = Validation.isInt(value);
        }
        return result;
    }

    static isInt(value: any): boolean {
        if (Validation.isNullOrEmpty(value))
            return false;
        return Number(value) === value && value % 1 === 0;
    }

    static containsOnly(value: string, characters: string, ignoreCase: boolean = false): boolean {
        characters = characters.replace('[0-9]', '0123456789')
            .replace('[A-Z]', 'ABCDEFGHIJKLMNOPQRSTUVWXYZ')
            .replace('[a-z]', 'abcdefghijklmnopqrstuvwxyz');

        if (ignoreCase) {
            characters = characters.toLowerCase();
            value = value.toLowerCase();
        }

        var i = 0;
        for (i = 0; i < value.length; i++) {
            if (characters.indexOf(value[i]) < 0)
                return false;
        }
        return true;
    }

    static isInRange(value: number, min: number, max: number): boolean {
        return ((value >= min) && (value <= max));
    }

    static isIpAddress(value: any): boolean {
        if (Validation.isNullOrEmpty(value))
            return false;

        // http://www.w3resource.com/javascript/form/ip-address-validation.php
        return (/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(value));
    }
}