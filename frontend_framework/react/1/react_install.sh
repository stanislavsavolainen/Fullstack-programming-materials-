#!/bin/bash
echo "Original React tutuorial: "
echo "https://www.codementor.io/tamizhvendan/beginner-guide-setup-reactjs-environment-npm-babel-6-webpack-du107r9zr";
#echo "console : npm init ";

#npm init
#echo "console : npm i webpack -S";
#npm i webpack -S
#-------------------------------------------------------------
echo "create package.json manualy, there become some problems";
touch package.json
#-------------------------------------------------------------
echo '{ ' >> package.json;
echo '  "name": "client", ' >> package.json;
echo ' "version": "1.0.0", ' >> package.json;
echo '  "description": "", ' >> package.json;
echo '  "main": "index.js", ' >> package.json;
echo '  "scripts": { ' >> package.json
echo '    "test": "echo \"Error: no test specified\" && exit 1" ' >> package.json;
echo '  }, ' >> package.json;
echo '  "author": "", ' >> package.json;
echo '  "license": "ISC", ' >> package.json;
echo '  "dependencies": { ' >> package.json;
echo '    "babel-core": "6.26.0", ' >> package.json;
echo '    "babel-loader": "7.1.2", ' >> package.json;
echo '    "babel-preset-es2015": "6.24.1", ' >> package.json;
echo '    "babel-preset-react": "6.24.1", ' >> package.json;
echo '    "react": "16.0.0", ' >> package.json;
echo '    "react-dom": "16.0.0", ' >> package.json;
echo '    "webpack": "3.6.0" ' >> package.json;
echo '  }, ' >> package.json;
echo '  "devDependencies": { ' >> package.json;
echo '    "babel-plugin-transform-class-properties": "6.24.1", ' >> package.json;
echo '    "babel-plugin-transform-object-rest-spread": "6.26.0" ' >> package.json;
echo '  } ' >> package.json;
echo '} ' >> package.json;

#-------------------------------------------------------------
echo "console : create webpack.config.js";
touch webpack.config.js
echo "write data to webpack.config.js (not done)";
#write data to webpack.config.js
#-------------------------------------------------------------

echo "var webpack = require('webpack');" >> webpack.config.js;
echo "var path = require('path');" >> webpack.config.js;
echo "         "  >> webpack.config.js;
echo "var BUILD_DIR = path.resolve(__dirname, 'src/client/public'); "  >> webpack.config.js;
echo "var APP_DIR = path.resolve(__dirname, 'src/client/app'); "  >> webpack.config.js;
echo "         "  >> webpack.config.js;
echo "var config = { "  >> webpack.config.js;
echo "entry: APP_DIR + '/index.jsx', "  >> webpack.config.js;
echo " output: {  "  >> webpack.config.js;
echo " path: BUILD_DIR,        "  >> webpack.config.js;
echo "filename: 'bundle.js'         "  >> webpack.config.js;
echo "},         "  >> webpack.config.js;
echo "          " >> webpack.config.js;
echo " module : {          " >> webpack.config.js;
echo "  loaders : [         " >> webpack.config.js;
echo "   {       " >> webpack.config.js;
echo "     test : /\.jsx?/,       " >> webpack.config.js;
echo "     include : APP_DIR,           " >> webpack.config.js;
echo "     loader : 'babel-loader'          " >> webpack.config.js;
echo "    }          " >> webpack.config.js;
echo "   ]          " >> webpack.config.js;
echo "  }         " >> webpack.config.js;
echo "          " >> webpack.config.js;
echo " };        "  >> webpack.config.js;
echo "         "  >> webpack.config.js;
echo "  module.exports = config;"  >> webpack.config.js;

#-------------------------------------------------------------

echo "create folder src/client/app"
mkdir src
cd src
mkdir client
cd client
mkdir app
cd app
echo "create index.jsx to src/client/app";
touch index.jsx
#write data to index.jsx
#-------------------------------------------------------------

echo "import React from 'react';" >> index.jsx
echo "import {render} from 'react-dom'; " >> index.jsx
echo "        " >> index.jsx
echo "class App extends React.Component { " >> index.jsx
echo " render () { " >> index.jsx
echo " return <p> Hello React!</p>; " >> index.jsx
echo " }       " >> index.jsx
echo " }       " >> index.jsx
echo " render(<App/>, document.getElementById('app')); " >> index.jsx

echo "console.log('Hello World!');" >> index.jsx

#-------------------------------------------------------------

cd ..
echo "create index.html to folder src/client"
touch index.html
#-------------------------------------------------------------

echo "<html>     " >> index.html;
echo " <head>    " >> index.html;
echo "  <meta charset="utf-8">    " >> index.html;
echo "  <title>React.js using NPM, Babel6 and Webpack</title>    " >> index.html;
echo " </head>     " >> index.html;
echo " <body>     " >> index.html;
echo " <div id="app" />     " >> index.html;
echo " <script src="public/bundle.js" type="text/javascript"></script> " >> index.html;
echo " </body>  " >> index.html;
echo " </html>" >> index.html;

#-------------------------------------------------------------
cd ..
cd ..
#go back to project folder cd .. cd .. cd ..
echo "install npm babel-preset-es2015 and babel-preset-react plugins ( babel-loader ) ";
echo " console : npm i babel-loader babel-preset-es2015 babel-preset-react -S";
#npm i babel-loader babel-preset-es2015 babel-preset-react babel-core@6 -S

echo "create .babelrc invisible file ";
touch .babelrc
#-------------------------------------------------------------

echo "{ " >> .babelrc
echo ' "presets" : ["es2015", "react"] ' >> .babelrc
echo "} " >> .babelrc
#-------------------------------------------------------------

echo " console : npm i react react-dom -S ";
#npm i react react-dom -S
npm install -S
echo " console : ./node_modules/.bin/webpack -d ";
./node_modules/.bin/webpack -d
#echo "console : /node_modules/.bin/webpack -d --watch"
##/node_modules/.bin/webpack -d --watch