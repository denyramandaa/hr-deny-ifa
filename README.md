# vue-cli

> A Vue.js project

## Build Setup

``` bash
# install dependencies
# RUN THIS
npm install

# serve with hot reload at localhost:8080
# RUN THIS
npm run dev

# build for production with minification
npm run build

# additional
npm install -g json-server

#run this for the axios data
json-server --watch data.json
```

## Error Handle
``` bash
if you get error like this:

...mapGetters({
^
 allCard: 'allCard',
}),

dont worry, just do this:
npm install babel-preset-env --save
npm install --save babel-preset-stage-2

then open your .babelsrc file and copy this:
{
  "presets": [
    ["es2015", { "modules": false }],
    ["stage-2"]
  ], 
}
```

For detailed explanation on how things work, consult the [docs for vue-loader](http://vuejs.github.io/vue-loader).
