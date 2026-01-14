#!/bin/bash
cd /home/kavia/workspace/code-generation/arithmetic-calculator-api-304958-304967/arithmetic_api_backend
npm run lint
LINT_EXIT_CODE=$?
if [ $LINT_EXIT_CODE -ne 0 ]; then
  exit 1
fi

