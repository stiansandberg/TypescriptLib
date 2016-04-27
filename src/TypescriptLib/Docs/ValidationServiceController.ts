/// <reference path="../_definitelytyped/angularjs/angular.d.ts" />
/// <reference path="../validationservice.ts" />

namespace TypescriptLib.Docs {

    class ValidationServiceController {

        person: Person = new Person();
        errors: any;

        submit() {

            var validationResult = this.person.validate();

            if (validationResult.containsErrors()) {
                this.errors = validationResult.getErrorMessages();
            }
            else {
                // submit form
            }

        };
    }

    class Person {
        firstname: string = 'Ola';
        lastname: string = 'Normann';
        email: string = '';
        ip: string = '';

        validate() {

            var validator = new TSL.Services.ValidationService(this);

            return validator
                .required(m => m.firstname, 'Fornavn må fylles ut')
                .required(m => m.lastname, 'Etternavn må fylles ut')
                .required(m => m.email, 'E-post må fylles ut')
                .required(m => m.ip, 'IP adresse må fylles ut')
                .email(m => m.email, 'Ugyldig e-post')
                .ip(m => m.ip, 'ugyldig IP');
        }
    }

    angular.module('tsDocs').controller('ValidationServiceController', ValidationServiceController);
}