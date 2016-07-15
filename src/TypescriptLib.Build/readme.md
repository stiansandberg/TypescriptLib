# TypeScriptLib.Angular
A set of angular components

## Requirements
* [typescriptLib](https://github.com/stiansandberg/TypescriptLib/tree/master/src/TypescriptLib)
* [Angularjs](https://angularjs.org/) (version 1.5+)
* [Twitter bootstrap](http://getbootstrap.com/) (version 3.x. Css for styling)


## Datepicker
```html
<tsl-datepicker date="ctrl.date"></tsl-datepicker>
```
## Datetimepicker
```html
<tsl-datetimepicker date="ctrl.date"></tsl-datetimepicker>
```
## Daterangepicker
```html
<tsl-daterangepicker start="ctrl.date" end="ctrl.end"></tsl-daterangepicker>
```
## Tabset
```html
<tsl-tabset>
    <tsl-tab label="'Tab 1'">
        Tab 1 content
        <hr />
        <tsl-datepicker date="demo.date1"></tsl-datepicker>
    </tsl-tab>
    <tsl-tab label="ctrl.tabLabelFromController">
        Tab 2 content
    </tsl-tab>
</tsl-tabset>
```


