#!/usr/bin/env bash

curl https://raw.githubusercontent.com/jupyterlab/jupyterlab/v4.0.0a36/jupyterlab/staging/yarn.js \
 -o $( dirname "$(which jupyter)" )/../lib/python3.11/site-packages/jupyterlab/staging/yarn.js
