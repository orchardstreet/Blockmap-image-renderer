#! /bin/bash

emcc hello.cpp uint128_t.cpp uint256_t.cpp -o hello.js -s WASM=1 -s EXPORTED_FUNCTIONS='["_numbersIntoPixels","_free"]' -s EXPORTED_RUNTIME_METHODS='["cwrap","getValue","setValue"]' -I uint256_t
