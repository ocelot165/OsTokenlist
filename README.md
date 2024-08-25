# 3xcalibur Token Lists

This repo contains main 3xcalibur token list and tools to validate it.

## How to add external lists

URLs to external lists are stored in `token-lists.json`, if you want your list to be available on upcoming list UI page - submit a PR modifying `token-lists.json`.

## How to add new lists within this repository

- Add an array of tokens under `src/tokens`
- Add `checksum:newlistname`, `generate:newlistname`, `makelist:newlistname` command to `package.json` analogous to 3xcalibur default and extended list scripts.
- Modify `checksum.ts`, `buildList.ts`, `ci-check.ts`, and `default.test.ts` to handle new list

## How to add new tokens to the 3xcalibur token list

Note - this is not something we expect pull requests for.  
Unless you've been specifically asked by someone from the team please do no submit PRs to be listed on the default list.

- Add new tokens to `src/tokens/3xcalibur-default.json` file
- Run `yarn makelist:xcal-default`
  - By default new list will have patch version number bumped by 1 (e.g. `2.0.1` -> `2.0.2`).
  - If you want to bump minor version add `minor` after makelist command `yarn makelist:xcal-default minor`
  - If you want to bump major version add `major` after makelist command `yarn makelist:xcal-default major`
- If tests pass - new token list will be created under `lists` directory

For list to be considered valid it need to satisfy the following criteria:

- It passes [token list schema](https://github.com/Uniswap/token-lists/blob/master/src/tokenlist.schema.json) validation.
- There are no duplicate addresses, symbols or token names in the list
- All addresses are valid and checksummed.

## Deploying

Token lists will be auto-deployed via netlify when PR is merged to master. Be sure to build the list with `yarn makelist:list-name` before submitting/merging the PR since it doesn't make much sense building lists within Netlify (because most errors are related to wrong token information and should be fixed prior to landing into master)

Netlify simply takes the json files under `lists` directory and hosts them on `tokens.3xcalibur.com/list-name.json`
