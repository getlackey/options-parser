# Lackey options parser

Converts several formats into an object.

This module is part of the [Lackey framework](https://www.npmjs.com/package/lackey-framework) that is used to build the [Lackey CMS](http://lackey.io) amongst other projects.

## Usage
We are going to provide several formats an always get the same object in the output:

	{
        opt1: "opt1",
        opt2: "opt2",
        opt3: "test_this"
    }
### String, space separated values

    var optionsParser = require('lackey-options-parser'),
        opts = optionsParser('opt1 opt2 opt3:test_this');

If that string begins with '/' we will consider it a path to a file and require it. 
    
    var optionsParser = require('lackey-options-parser'),
        opts = optionsParser('/models/test/my-opts.json');

This file is required from the process dir, where you run node.

When running this module in the browser, using browserify, you need to make sure the json file is (pre)required:

    options.require = ['./models/test/my-opts.json'];


### Array

    var optionsParser = require('lackey-options-parser'),
        opts = optionsParser([
        	'opt1', 
        	'opt2', 
        	'opt3:test_this'
        ]);
        
### Literal Object
This is useful as the return object has additional methods added to the prototype.

    var optionsParser = require('lackey-options-parser'),
        opts = optionsParser({
            opt1: "opt1",
            opt2: "opt2",
            opt3: "test_this"
        });
       

## Available Methods

### stripUnderscores
Replaces all underscores with spaces. This method returns an options object and can be chained with other methods.

	var opts = optionsParser('opt1 opt2 opt3:test_this').stripUnderscores();
	
returns:

	{
        opt1: "opt1",
        opt2: "opt2",
        opt3: "test this"
    }

### makeTitle
Converts camelCase strings into human readable titles. This method returns an options object and can be chained with other methods.

	var opts = optionsParser('opt1 opt2 opt3:testThis').makeTitle();

returns:

	{
        opt1: "opt1",
        opt2: "opt2",
        opt3: "Test this"
    }

### makeArray(convertAll)
Converts CSV values to arrays. The convertAll option (default false) will either convert all items into arrays or just the ones containing a comma.

    var opts = optionsParser('opt1 opt2 opt3:testThis,testThis').makeArray();

returns:

    {
        opt1: "opt1",
        opt2: "opt2",
        opt3: [
            "testThis",
            "testThis"
        ]
    }

## getKeys
Returns an array with the keys of an object

	var keys = optionsParser('opt1 opt2 opt3:test_this').getKeys();
	
returns:

	[
		'opt1',
		'opt2',
		'opt3'
	]

## getValues
Returns an array with the values of an object

	var values = optionsParser('opt1 opt2 opt3:test_this').getKeys();
	
returns:

	[
		'opt1',
		'opt2',
		'opt3'
	]

## toString
Converts an object into a space separated string. It's useful to dump options settings into an HTML attribute without serializing it in JSON.

Spaces will be converted into underscores
