# Ionic 3 and cordova project

This project is a part of the Coursera course **Multiplatform Mobile App Development with Web Technologies: [Ionic and Cordova]**

Been outdated, I've decided to make this initial project repository that the students don't strugle with the dependencies (node, ionic and npm).

## Dependencies

This project uses:

| Name   | Version |
| ------ | ------- |
| ionic  | ^3.20.1 |
| corova | ^9      |

## Installation

> You don't have to downgrade your **npm** or **NodeJS** versions.
>
> Tested with:
>
> - **NodeJS**: 12.18.3
> - **npm**: 6.14.8
> - **Ionic**: 3.20.1
> - **cordove**: 9.0.0

1. Clone the project: `git clone https://github.com/belachkar/confusion-ionic.git`.

   If you want to change the name just add the name you want for the project at the end:

   `git clone https://github.com/belachkar/confusion-ionic.git confusion`.

2. Change the directory:
   - WIN: `cd .\confusion-ionic`.
   - LINUX: `cd ./confusion-ionic`.
3. Install the npm dependencies: `npm i`.
4. For compatibility of commands for the rest of the lessons, may be you should install **ionic v3.20.1 globally** `npm i -g ionic@3`.

If you have changed the project name you must also change it in these files:

- `package.json`
- `ionic.config.json`
- `config.xml` in the **name** tag: `<name>confusion-ionic</name>`.
- Drop the `package-lock.json` file, and run `npm i` to recreate it.

## Errors fixation

Normally you shouldn't have any error, but if there is a problem installing `node-sass` (_Build error_):

1. Install **AS ADMINISTRATOR** `windows-build-tools` package globally: `npm --vs2015 install -g windows-build-tools`.
2. Delete the `node_modules` folder.
3. Delete the `package-lock.json` file.
4. Reinstall the dependencies: `npm i`.

> Please hit the **Star** at the top if you like the guidance project,
>
> _I hope it helps_.

<!-- Links -->
[Ionic and Cordova]: https://www.coursera.org/learn/ionic-cordova/lecture/gttD7/ionic-and-angular "Multiplatform Mobile App Development with Web Technologies: Ionic and Cordova"
[windows-build-tools]: https://www.npmjs.com/package/windows-build-tools "windows-build-tools"
