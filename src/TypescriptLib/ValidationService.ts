/// <reference path="validation.ts" />

module TSL.Services {

    export interface IValidationService<T> {
        clear(): IValidationService<T>;
        getErrorMessages(): Array<IValidationError>;
        containsErrors(): boolean;
        required(prop: (item: T) => string | number | Date, errorMessage: string): IValidationService<T>;
        email(prop: (item: T) => string, errorMessage: string): IValidationService<T>;
        range(prop: (item: T) => number, min: number, max: number, errorMessage: string): IValidationService<T>;
        max(prop: (item: T) => number, max: number, errorMessage: string): IValidationService<T>;
        min(prop: (item: T) => number, min: number, errorMessage: string): IValidationService<T>;
        period(prop: (item: T) => Date, min: Date, max: Date, errorMessage: string): IValidationService<T>;
        minLengt(prop: (item: T) => string, minLength: number, errorMessage: string): IValidationService<T>;
        maxLengt(prop: (item: T) => string, maxLength: number, errorMessage: string): IValidationService<T>;
        int(prop: (item: T) => number, errorMessage: string): IValidationService<T>;
        containsOnly(prop: (item: T) => string, characters: string, ignoreCase: boolean, errorMessage: string): IValidationService<T>;
        ip(prop: (item: T) => string, errorMessage: string): IValidationService<T>;
        equals(prop: (item: T) => any, other: (item: T) => any, errorMessage: string): IValidationService<T>;
        custom(prop: (item: T) => any, func: (value: any) => boolean, errorMessage: string): IValidationService<T>;
    }

    export class ValidationService<T> implements IValidationService<T> {

        private errors: Array<IValidationError> = [];
        private currentObject: T;

        constructor(obj: T) {
            this.currentObject = obj;
        }

        clear() {
            this.errors = [];
            return this;
        }

        getErrorMessages(): Array<IValidationError> {
            return this.errors;
        }
        
        containsErrors() {
            return this.getErrorMessages().length > 0;
        }

        required(prop: (item: T) => string | number | Date, errorMessage: string) {
            let value = this.getPropertyValue(prop);

            if (Validation.isNullOrEmpty(value)) {
                this.addValidationError(prop, errorMessage);
            }

            return this;
        }

        email(prop: (item: T) => string, errorMessage: string) {
            let value = this.getPropertyValue(prop);
            if (Validation.isNullOrEmpty(value)) {
                return this;
            }

            if (!Validation.isEmail(value)) {
                this.addValidationError(prop, errorMessage);
                return this;
            }

            return this;
        }

        range(prop: (item: T) => number, min: number, max: number, errorMessage: string) {
            let value = this.getPropertyValue(prop);
            if (Validation.isNullOrEmpty(value)) {
                return this;
            }

            let num = parseFloat(value);
            if (num == NaN) {
                this.addValidationError(prop, errorMessage);
                return this;
            }

            if (num > max || num < min) {
                this.addValidationError(prop, errorMessage);
                return this;
            }

            return this;
        }

        max(prop: (item: T) => number, max: number, errorMessage: string) {
            let value = this.getPropertyValue(prop);
            if (Validation.isNullOrEmpty(value)) {
                return this;
            }

            let num = parseFloat(value);
            if (num == NaN) {
                this.addValidationError(prop, errorMessage);
                return this;
            }

            if (num > max) {
                this.addValidationError(prop, errorMessage);
                return this;
            }

            return this;
        }

        min(prop: (item: T) => number, min: number, errorMessage: string) {
            let value = this.getPropertyValue(prop);
            if (Validation.isNullOrEmpty(value)) {
                return this;
            }

            let num = parseFloat(value);
            if (num == NaN) {
                this.addValidationError(prop, errorMessage);
                return this;
            }

            if (num < min) {
                this.addValidationError(prop, errorMessage);
                return this;
            }

            return this;
        }

        period(prop: (item: T) => Date, min: Date, max: Date, errorMessage: string) {
            let value: Date = this.getPropertyValue(prop);
            if (Validation.isNullOrEmpty(value)) {
                return this;
            }

            if (value > max || value < min) {
                this.addValidationError(prop, errorMessage);
                return this;
            }

            return this;
        }

        minLengt(prop: (item: T) => string, minLength: number, errorMessage: string) {
            let value = this.getPropertyValue(prop);
            if (Validation.isNullOrEmpty(value)) {
                return this;
            }

            if (value.length < minLength) {
                this.addValidationError(prop, errorMessage);
                return this;
            }
            return this;
        }

        maxLengt(prop: (item: T) => string, maxLength: number, errorMessage: string) {
            let value = this.getPropertyValue(prop);
            if (Validation.isNullOrEmpty(value)) {
                return this;
            }

            if (value.length > maxLength) {
                this.addValidationError(prop, errorMessage);
                return this;
            }
            return this;
        }

        int(prop: (item: T) => number, errorMessage: string) {
          
            return this.custom(prop, (value) => { return Validation.containsOnly(value, '-0123456789'); }, errorMessage);

        }

        containsOnly(prop: (item: T) => string, characters: string, ignoreCase: boolean, errorMessage: string) {
            let value = this.getPropertyValue(prop);
            if (Validation.isNullOrEmpty(value)) {
                return this;
            }

            if (!Validation.containsOnly(value, characters, ignoreCase)) {
                this.addValidationError(prop, errorMessage);
                return this;
            }

            return this;
        }

        ip(prop: (item: T) => string, errorMessage: string) {

            return this.custom(prop, (value) => { return Validation.isIpAddress(value); }, errorMessage);

        }

        equals(prop: (item: T) => any, other: (item: T) => any, errorMessage: string) {
            let propValue = this.getPropertyValue(prop);
            let otherValue = this.getPropertyValue(other);

            if (propValue !== otherValue) {
                this.addValidationError(prop, errorMessage);
            }

            return this;
        }

        custom(prop: (item: T) => any, func: (value: any) => boolean, errorMessage: string) {
            let value = this.getPropertyValue(prop);
            if (Validation.isNullOrEmpty(value)) {
                return this;
            }

            if (!func(value)) {
                this.addValidationError(prop, errorMessage);
            }

            return this;
        }


        private _cachedPropertyNames: Array<ICachedPropertyname> = [];

        private getCachedPropertyname(prop: (item: T) => any) {
            var asString = prop.toString();
            for (var i = 0; i < this._cachedPropertyNames.length; i++) {
                var item = this._cachedPropertyNames[i];
                if (item.propAsString === asString) {
                    return item.propertyname;
                }
            }
            return null;
        }

        private getPropertyname(prop: (item: T) => any): string {

            var propertynameFromCache = this.getCachedPropertyname(prop);
            if (propertynameFromCache != null) {
                return propertynameFromCache;
            }

            let temp = prop.toString();
            var getVariableName = (exp: string) => {
                let firstP = exp.indexOf('(');
                let lastP = exp.indexOf(')');
                return exp.substr(firstP + 1, (lastP - firstP) - 1);
            };
            var getVariableStartIndex = (exp: string, variableName: string) => {
                let varStartIndex = temp.indexOf(' ' + varName + '.');
                if (varStartIndex > -1) {
                    return varStartIndex;
                }
                varStartIndex = temp.indexOf('(' + varName + '.');
                if (varStartIndex > -1) {
                    return varStartIndex;
                }

                return temp.indexOf(varName + '.');
            }
            var removeLastSemicolon = (exp: string) => {
                exp = exp.trim();
                if (exp.substring(exp.length - 1) === ';') {
                    return exp.substring(0, exp.length - 1);
                }
                return exp;
            }
            var removeSurroundingParentheses = (exp: string) => {
                exp = exp.trim();
                if ((exp[0] === '(') && (exp.substring(exp.length - 1) === ')')) {
                    let lastPar = exp.lastIndexOf(')');
                    return exp.substring(1, lastPar);
                }
                return exp;
            }
            var removeVariableNameFromExpression = (exp: string, variableName: string) => {
                let vnameWithDot = variableName + '.';
                if (exp.substring(0, vnameWithDot.length) === vnameWithDot) {
                    return exp.substring(vnameWithDot.length);
                }
                return exp;
            }
            var isMethod = (exp: string) => {
                return exp.indexOf('(') > -1;
            }

            var varName = getVariableName(temp);
            temp = temp.replace('function', '');
            temp = temp.replace('(' + varName + ')', '').trim();
            temp = temp.substring(9, temp.length - 2).trim();

            var varStartIndex = getVariableStartIndex(temp, varName);

            temp = temp.substring(varStartIndex);
            temp = removeLastSemicolon(temp);
            temp = removeSurroundingParentheses(temp);
            temp = removeVariableNameFromExpression(temp, varName);

            var expParts = temp.split('.');
            var validParts = [];

            for (var i = 0; i < expParts.length; i++) {
                var part = expParts[i];
                if (!isMethod(part)) {
                    validParts.push(part);
                } else {
                    break;
                }
            }

            var propertyname = validParts.join('.');

            this._cachedPropertyNames.push({
                propAsString: prop.toString(),
                propertyname: propertyname
            });

            return propertyname
        }

        private getPropertyValue(prop: (item: T) => any) {
            return prop(this.currentObject);
        }

        private addValidationError(prop: (item: T) => any, errorMessage: string) {

            let propertyName = this.getPropertyname(prop);
            var found = false;

            for (var i = 0; i < this.errors.length; i++) {
                if (this.errors[i].property == propertyName) {
                    this.errors[i].messages.push(errorMessage);
                    found = true;
                    break;
                }
            }
            if (!found) {
                this.errors.push({
                    property: propertyName,
                    messages: [errorMessage]
                });
            }
        }
    }

    interface ICachedPropertyname {
        propAsString: string;
        propertyname: string;
    }

    export interface IValidationError {
        property: string;
        messages: Array<string>;
    }
}