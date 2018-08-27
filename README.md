# SingletonServiceExample
Angular 6

## Core modules
component: TitleComponent
service: UserService is an app-wide singleton

## shared modules
pipe
directive: highlight

## modules:
list and detail: customer, item, contact

## observable
observable<Item>              (item | async)?

observable<Item>.subscribe()    item?

````
<div *ngIf="userObservable | async; let userObservable; else loading">
 {{userObservable.lastName}}
 </div>
````

## delay
return of(ITEMS).pipe(delay(FETCH_LATENCY));
