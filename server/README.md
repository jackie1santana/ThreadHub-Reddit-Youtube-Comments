to set up ts config: 
npm i typescript 
npx tsc --init
to set up eslint config: 
first run npm i eslint 
npx eslint --init
choose enforce code style
chose js imports & popular guide style
in eslintrc.js change browser to 
```module.exports = {
  env: {
    es2021: true,
    node: true,
  },```

install prettier 

to get prettier to play nice w eslint add
`npm i -D eslint-plugin-prettier eslint-config-prettier`