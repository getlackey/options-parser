/*jslint node:true, browser:true */
/*global describe, it */
'use strict';
/*
    Copyright 2015 Enigma Marketing Services Limited

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
*/

var assert = require("assert"),
    optionsParser = require('../lib');

describe('Options Parser', function () {

    describe('Create options object', function () {
        it('should accept an object', function () {
            var opts = optionsParser({
                    "opt1": "Opt 1",
                    "opt2": "Opt 2",
                    "opt3": "Test this"
                }),
                expected = {
                    "opt1": "Opt 1",
                    "opt2": "Opt 2",
                    "opt3": "Test this"
                };

            assert.deepEqual(opts, expected);
        });

        it('should convert to object from String', function () {
            var opts = optionsParser('opt1 opt2 opt3:test_this'),
                expected = {
                    opt1: "opt1",
                    opt2: "opt2",
                    opt3: "test_this"
                };

            assert.deepEqual(opts, expected);
        });

        it('should convert to object from Array', function () {
            var opts = optionsParser(['opt1', 'opt2', 'opt3:test_this']),
                expected = {
                    opt1: "opt1",
                    opt2: "opt2",
                    opt3: "test_this"
                };

            assert.deepEqual(opts, expected);
        });

        it('should convert to object from Array', function () {
            var expected = 'opt1 opt2 opt3:test_this',
                opts = optionsParser('opt1 opt2 opt3:test_this'),
                result = opts.toString();

            assert.deepEqual(result, expected);
        });

        it('should convert get keys', function () {
            var expected = ['opt1', 'opt2', 'opt3'],
                opts = optionsParser('opt1 opt2 opt3:test_this'),
                result = opts.getKeys();

            assert.deepEqual(result, expected);
        });

        it('should convert get values', function () {
            var expected = ['opt1', 'opt2', 'test_this'],
                opts = optionsParser('opt1 opt2 opt3:test_this'),
                result = opts.getValues();

            assert.deepEqual(result, expected);
        });

        it('should convert get values with stripped underscores', function () {
            var expected = ['opt1', 'opt2', 'test this'],
                opts = optionsParser('opt1 opt2 opt3:test_this'),
                result = opts.stripUnderscores().getValues();

            assert.deepEqual(result, expected);
        });

        it('should convert make titles', function () {
            var expected = {
                    "opt1": "Opt 1",
                    "opt2": "Opt 2",
                    "opt3": "Test this"
                },
                opts = optionsParser('opt1 opt2 opt3:test_this'),
                result = opts.stripUnderscores().makeTitle();

            assert.deepEqual(result, expected);
        });

        it('should load a file', function () {
            var expected = {
                    "opt1": "Opt 1",
                    "opt2": "Opt 2",
                    "opt3": "Test this"
                },
                opts = optionsParser('/fixtures/options.json'),
                result = opts;

            assert.deepEqual(result, expected);
        });

        it('should convert ALL values to array', function () {
            var expected = {
                    "opt1": ["opt1"],
                    "opt2": ["opt2"],
                    "opt3": [
                        "test_this",
                        "test_that"
                    ]
                },
                opts = optionsParser('opt1 opt2 opt3:test_this,test_that').makeArray(true),
                result = opts;

            assert.deepEqual(result, expected);
        });

        it('should convert the CSV values to array', function () {
            var expected = {
                    "opt1": "opt1",
                    "opt2": "opt2",
                    "opt3": [
                        "test_this",
                        "test_that"
                    ]
                },
                opts = optionsParser('opt1 opt2 opt3:test_this,test_that').makeArray(false),
                result = opts;

            assert.deepEqual(result, expected);
        });
    });

});