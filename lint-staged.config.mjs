const config = {
  '*.{js,jsx,mjs,cjs,ts,tsx,mts}': ['npm run lint'],
  '*.{md,json}': 'prettier --write'
  // "*": "npm run typos",
}

export default config
