#!/bin/bash

cd "$(dirname "$0")/.." || exit 1

echo "=== MINI KARTE PROJECT STRUCTURE ==="
echo

if command -v tree >/dev/null 2>&1; then
    tree -a -I "node_modules|dist|.git|.DS_Store"
else
    find . \
        -not -path "./node_modules/*" \
        -not -path "./dist/*" \
        -not -path "./.git/*" \
        -not -name ".DS_Store" \
        | sort
fi
