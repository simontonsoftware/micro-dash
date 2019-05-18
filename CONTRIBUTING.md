So you want to contribute to Micro-dash? That's great! This guide shows everything that goes into adding a function to the library, along with some helpful hints to accomplish them.

# Adding a function

1. **Write the function.**
   1. Find the documentation for it on [Lodash](https://lodash.com/docs).
   1. Create the file in `projects/micro-dash/src/lib/<category>/<function-name>.ts`, where the categorization matches that in Lodash (e.g. "array" or "collection").
   1. Copy the description from lodash into the jsdoc for the function. No need to copy the descriptions of the arguments or return value, only the stuff above that. Don't try to improve the description, except by removing irrelevant parts that will not be supported in Micro-dash.
   1. Implement it!
   1. Add it to the `index.ts` file within its directory.
1. **Write the spec.** This is the hard part.
   1. Create the spec file next to the main file (in `projects/micro-dash/src/lib/<category>/<funtion-name>.spec.ts`).
   1. Search for everywhere the function is tested in [Lodash's test suite](https://raw.githubusercontent.com/lodash/lodash/4.17.10/test/test.js), and create equivalent tests in Micro-dash for the ones that apply.
      - The tests are written a very different style - compare with existing Micro-dash tests to get a feel for it.
      - If there are similar functions already in Micro-dash, use their spec as a guide. Sometimes many tests can copied from that function with only small tweaks.
   1. Run the tests with `yarn test micro-dash`.
1. **Calculate the sizes.**
   1. Create 2 files:
      1. `projects/sizes/src/lib/<category>/<function-name>.lodash.ts`
      1. `projects/sizes/src/lib/<category>/<function-name>.microdash.ts`
   1. Add simple uses of the function to both files. The files should be identical except for the import lines (where one imports from `lodash-es`, and the other from `micro-dash`).
      - If the function returns a value, `console.log` the output to be sure tree shaking doesn't decide the whole thing is unnecessary.
   1. Add the files to their respective `index.<library>.ts` within their directory.
   1. Run `yarn sizes` and enter the function name in kebab-case.
1. **File the PR!**
