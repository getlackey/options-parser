/*jslint node:true, browser:true */
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

var path = require('path'),
    makeTitle = require('lackey-make-title'),
    Obj;

Obj = function () {
    var self = this;
    return self;
};

Obj.prototype.stripUnderscores = function () {
    var self = this;

    Object.keys(self).forEach(function (key) {
        var item = self[key];

        if (typeof item !== 'string') {
            return;
        }

        self[key] = item.replace(/_/g, ' ');
    });

    return self;
};

Obj.prototype.makeTitle = function () {
    var self = this;

    Object.keys(self).forEach(function (key) {
        var item = self[key];
        self[key] = makeTitle(item);
    });

    return self;
};

Obj.prototype.getKeys = function () {
    var self = this;

    return Object.keys(self);
};

Obj.prototype.getValues = function () {
    var self = this,
        keys = self.getKeys(),
        values = [];

    keys.forEach(function (key) {
        values.push(self[key]);
    });

    return values;
};

Obj.prototype.toString = function () {
    var self = this,
        output = [];

    Object.keys(self).forEach(function (key) {
        var item = self[key];

        if (item === key) {
            output.push(key);
            return;
        }

        output.push(key + ':' + item.replace(/ /g, '_'));
    });

    return output.join(' ');
};

function splitByColon(item) {
    var key = item,
        val = item,
        items;

    if (item.indexOf(':') > -1) {
        items = item.split(':');
        key = items[0];
        val = items[1];
    }

    return {
        key: key,
        val: val
    };
}

/*
converts:
   'opt1 opt2 opt3:test_this' 
into:
    {
        opt1: "opt1",
        opt2: "opt2",
        opt3: "test_this"
    }

opt3:test could not have contained spaces. to clear the spaces we would run:

    var opts = optionsParser('opt1 opt2 opt3:test_this').stripUnderscores();

*/
function parseString(opts) {
    var obj = new Obj();

    opts.split(' ').forEach(function (item) {
        var data = splitByColon(item);
        obj[data.key] = data.val;
    });

    return obj;
}

/*
    Converts every entry of the array into an object property

    converts:
        ['opt1', 'opt2', 'opt3:test_this']
    into:
        {
            opt1: "opt1",
            opt2: "opt2",
            opt3: "test_this"
        }

    opt3:test could not have contained spaces. to clear the spaces we would run:

        var opts = optionsParser(['opt1', 'opt2', 'opt3:test_this']).stripUnderscores();
*/
function parseArray(opts) {
    var obj = new Obj();

    opts.forEach(function (item) {
        var data = splitByColon(item);
        obj[data.key] = data.val;
    });

    return obj;
}

/*
    Converts a literal object 
    into an instance of our object with all our utility
    methods
*/
function parseObj(opts) {
    var obj = new Obj();

    Object.keys(opts).forEach(function (key) {
        obj[key] = opts[key];
    });

    return obj;
}

module.exports = function optionsParser(opts) {
    if (opts === undefined || opts === null) {
        throw new Error('Invalid options data. Accepts String, Array or literal Object');
    }

    // require a file
    if (typeof opts === 'string' && opts.indexOf('/') === 0) {
        // using String(typeof window) to disable the JSlint warning
        if (String(typeof window) === 'undefined') { //is browser?
            opts = require(path.join(process.cwd(), opts));
        } else {
            opts = require('.' + path.join(process.cwd(), opts));
        }
    }

    if (typeof opts === 'string') {
        return parseString(opts);
    }

    if (Array.isArray(opts)) {
        return parseArray(opts);
    }

    // let's assume it's an object. 
    return parseObj(opts);
};