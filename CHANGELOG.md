# Changelog

## 1.0.2

### Patch Changes

-   fix module export and improve CSR handling for non-browser environments

## 1.0.1

### Patch Changes

-   Fix entrypoint

## 1.0.0

### Major Changes

-   Nuclear refactor:

    -   Refactored to Typescript
    -   Renamed props, vars, and methods for clarity
    -   Added debug output support (fixes #47, #57)
    -   Added a debounce method for the resize() event handler to improve performance
    -   Return event cancelation handles to address memory leaks in SPAs (helps with #37)
    -   Added configuration props (debug and debounce) with some reasonable defaults
    -   Removed support for legacy parameter names
    -   Removed support for ancient IE versions (many of those methods are no longer in the web API)
    -   Adjust Husky config
    -   Adjust prettier config
    -   Adjust eslint config
    -   Introduce Changesets for versioning
    -   Add some settings for folks using VSCode
    -   Replace grunt with webpack
    -   Exclude build artifacts from repo (more on this below); output dir is now `./dist`
    -   Output TS type definitions and sourcemap
    -   Target modern JS
    -   Bumped dependency versions
    -   Added a Dependabot build file for dependency PR grouping
    -   Moved demo files out of the source root (now in /demo)
    -   Pointed the demo to @latest on unpkg
    -   Introduce SECURITY.MD
    -   Update param names in the demo HTML
    -   Added JSDocs (ChatGPT generated)
    -   Miscellaneous housekeeping
    -   Version bump

---

## [0.12.3] - 2020-07-19

### Added

-   Add syntax highlighting to README

### Security

-   Bump lodash from 4.17.15 to 4.17.19
-   Bump websocket-extensions from 0.1.3 to 0.1.4
-   Bump acorn from 6.2.1 to 6.4.1

---

## [0.12.2] - 2019-07-31

### Update

-   Update Changelog

---

## [0.12.1] - 2019-07-31

### Update

-   Update dependencies

---

## [0.12.0] - 2019-05-27

### Added

-   Ability to use as a Node Module

---

## [0.11.2] - 2019-05-21

### Security

-   Remove unused dependencies
-   Update dependencies

---

## [0.11.1] - 2019-03-28

### Fixed

-   Make ESLint ignore minified files

---

## [0.11.0] - 2019-03-27

### Added

-   husky
-   pre-commit hook for lint-staged (Enforce ESLinting on commit)

### Changed

-   Edit documentation
-   Format documentation

### Deprecated

-   Variable names from v0.10.0

### Fixed

-   Activated linting

---

## [0.10.0] - 2019-01-26

### Added

-   Ability for min/max values to be transposed
-   ESLint and Prettier
-   Width-dependent param prefixes

### Changed

-   Format code with Prettier
-   Edit documentation
-   Format documentation
-   Optimize calculation

### Deprecated

-   Non-width-dependent variable names

### Fixed

-   Minor lint issues
-   Fix a bug that calculated size beyond intended measurements

---

## [0.9.9] - 2019-01-25

### Added

-   .npmignore

---

## [0.9.8] - 2019-01-25

### Changed

-   License to MIT

---

## [0.9.7] - 2019-01-25

### Added

-   CONTRIBUTING
-   CHANGELOG

### Changed

-   Copyedits

---

## [0.9.6] - 2019-01-24

### Added

-   LICENSE

---

## [0.9.5] - 2019-01-24

### Added

-   Initial release
