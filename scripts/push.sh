#!/usr/bin/env bash

script_dir=$(cd "$(dirname "${BASH_SOURCE[0]}")" &>/dev/null && pwd -P)
cd "$script_dir/.." || exit 1

git add .
git commit -m "${1:-$(date)}"
git push
