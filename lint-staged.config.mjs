const config = {
  '*.{js,jsx,mjs,cjs,ts,tsx,mts}': ['npm run lint'],
  '*.{md,json}': 'prettier --write',
  // "*": "npm run typos",
  '*.{yml,yaml}': 'npm run lint:yaml'
}

export default config
