# Online Shop

A simple online shop with Angular v11.

## Running the app locally

Run `npm run start:all` to run the backend and the dev server simultaneously.
Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

(Currenty no e2e tests are implemented apart from the default ones generated by the CLI, only unit tests.)

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## About the app

- The app is built using basic MVC principles with some Reactive programming (RxJS)
- Currently two routes (`/products` and `/cart`) are defined, which import their own modules in a lazy-loaded manner for faster app load and better memory usage.
- The current functionalities are:
  - Fetching the recommended products
  - All of these producs can be added to/ removed from the shopping cart
- Navigation between the two pages can be achieved by clicking on their respective icons in the header
- Basic responsiveness is achieved using flex layout

## Feature ideas

- Implement a LocalStorageService to store the cart items in the browser's LocalStorage, for better shopping experience
- Add an input box next to the 'Add to Cart' and 'Remove from Cart' buttons to simplify bulk add/ remove operations
- Add a menu to navigate between all the products and recommended products
- Add pagination in case all the products are being shown
- Add search funcionality
- Add basic authentication
- Create an admin view for authorized users only
