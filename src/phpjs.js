/**
 * CloneUI.com - Instagram Clone
 * phpJS
 *
 * @author      CloneUI <opensource@cloneui.com>
 * @copyright   2012 - 2013 CloneUI
 * @link        http://cloneui.com
 * @license     Affero General Public License
 *
 * @since  	    Wednesday, July 10, 2013, 20:49 GMT+1
 * @modified    $Date: 2011-11-16 18:27:16 +0100 (Wed, 16 Nov 2011) $ $Author: mknox $
 * @version     $Id: IndexController.php 5139 2011-11-16 17:27:16Z mknox $
 *
 * @category    JavaScript
 * @package     Instagram Clone
*/

function array_rand (input, num_req) {
  // http://kevin.vanzonneveld.net
  // +   original by: Waldo Malqui Silva
  // *     example 1: array_rand( ['Kevin'], 1 );
  // *     returns 1: 0
  var indexes = [];
  var ticks = num_req || 1;
  var checkDuplicate = function (input, value) {
    var exist = false,
      index = 0,
      il = input.length;
    while (index < il) {
      if (input[index] === value) {
        exist = true;
        break;
      }
      index++;
    }
    return exist;
  };

  if (Object.prototype.toString.call(input) === '[object Array]' && ticks <= input.length) {
    while (true) {
      var rand = Math.floor((Math.random() * input.length));
      if (indexes.length === ticks) {
        break;
      }
      if (!checkDuplicate(indexes, rand)) {
        indexes.push(rand);
      }
    }
  } else {
    indexes = null;
  }

  return ((ticks == 1) ? indexes.join() : indexes);
}

function rand (min, max) {
  // http://kevin.vanzonneveld.net
  // +   original by: Leslie Hoare
  // +   bugfixed by: Onno Marsman
  // %          note 1: See the commented out code below for a version which will work with our experimental (though probably unnecessary) srand() function)
  // *     example 1: rand(1, 1);
  // *     returns 1: 1
  var argc = arguments.length;
  if (argc === 0) {
    min = 0;
    max = 2147483647;
  } else if (argc === 1) {
    throw new Error('Warning: rand() expects exactly 2 parameters, 1 given');
  }
  return Math.floor(Math.random() * (max - min + 1)) + min;

/*
  // See note above for an explanation of the following alternative code

  // +   reimplemented by: Brett Zamir (http://brett-zamir.me)
  // -    depends on: srand
  // %          note 1: This is a very possibly imperfect adaptation from the PHP source code
  var rand_seed, ctx, PHP_RAND_MAX=2147483647; // 0x7fffffff

  if (!this.php_js || this.php_js.rand_seed === undefined) {
    this.srand();
  }
  rand_seed = this.php_js.rand_seed;

  var argc = arguments.length;
  if (argc === 1) {
    throw new Error('Warning: rand() expects exactly 2 parameters, 1 given');
  }

  var do_rand = function (ctx) {
    return ((ctx * 1103515245 + 12345) % (PHP_RAND_MAX + 1));
  };

  var php_rand = function (ctxArg) { // php_rand_r
    this.php_js.rand_seed = do_rand(ctxArg);
    return parseInt(this.php_js.rand_seed, 10);
  };

  var number = php_rand(rand_seed);

  if (argc === 2) {
    number = min + parseInt(parseFloat(parseFloat(max) - min + 1.0) * (number/(PHP_RAND_MAX + 1.0)), 10);
  }
  return number;
  */
}

function trim (str, charlist) {
  // http://kevin.vanzonneveld.net
  // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // +   improved by: mdsjack (http://www.mdsjack.bo.it)
  // +   improved by: Alexander Ermolaev (http://snippets.dzone.com/user/AlexanderErmolaev)
  // +      input by: Erkekjetter
  // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // +      input by: DxGx
  // +   improved by: Steven Levithan (http://blog.stevenlevithan.com)
  // +    tweaked by: Jack
  // +   bugfixed by: Onno Marsman
  // *     example 1: trim('    Kevin van Zonneveld    ');
  // *     returns 1: 'Kevin van Zonneveld'
  // *     example 2: trim('Hello World', 'Hdle');
  // *     returns 2: 'o Wor'
  // *     example 3: trim(16, 1);
  // *     returns 3: 6
  var whitespace, l = 0,
    i = 0;
  str += '';

  if (!charlist) {
    // default list
    whitespace = " \n\r\t\f\x0b\xa0\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u200b\u2028\u2029\u3000";
  } else {
    // preg_quote custom list
    charlist += '';
    whitespace = charlist.replace(/([\[\]\(\)\.\?\/\*\{\}\+\$\^\:])/g, '$1');
  }

  l = str.length;
  for (i = 0; i < l; i++) {
    if (whitespace.indexOf(str.charAt(i)) === -1) {
      str = str.substring(i);
      break;
    }
  }

  l = str.length;
  for (i = l - 1; i >= 0; i--) {
    if (whitespace.indexOf(str.charAt(i)) === -1) {
      str = str.substring(0, i + 1);
      break;
    }
  }

  return whitespace.indexOf(str.charAt(0)) === -1 ? str : '';
}

function strlen (string) {
	  // http://kevin.vanzonneveld.net
	  // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
	  // +   improved by: Sakimori
	  // +      input by: Kirk Strobeck
	  // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
	  // +   bugfixed by: Onno Marsman
	  // +    revised by: Brett Zamir (http://brett-zamir.me)
	  // %        note 1: May look like overkill, but in order to be truly faithful to handling all Unicode
	  // %        note 1: characters and to this function in PHP which does not count the number of bytes
	  // %        note 1: but counts the number of characters, something like this is really necessary.
	  // *     example 1: strlen('Kevin van Zonneveld');
	  // *     returns 1: 19
	  // *     example 2: strlen('A\ud87e\udc04Z');
	  // *     returns 2: 3
	  var str = string + '';
	  var i = 0,
	    chr = '',
	    lgth = 0;

	  if (!this.php_js || !this.php_js.ini || !this.php_js.ini['unicode.semantics'] || this.php_js.ini['unicode.semantics'].local_value.toLowerCase() !== 'on') {
	    return string.length;
	  }

	  var getWholeChar = function (str, i) {
	    var code = str.charCodeAt(i);
	    var next = '',
	      prev = '';
	    if (0xD800 <= code && code <= 0xDBFF) { // High surrogate (could change last hex to 0xDB7F to treat high private surrogates as single characters)
	      if (str.length <= (i + 1)) {
	        throw 'High surrogate without following low surrogate';
	      }
	      next = str.charCodeAt(i + 1);
	      if (0xDC00 > next || next > 0xDFFF) {
	        throw 'High surrogate without following low surrogate';
	      }
	      return str.charAt(i) + str.charAt(i + 1);
	    } else if (0xDC00 <= code && code <= 0xDFFF) { // Low surrogate
	      if (i === 0) {
	        throw 'Low surrogate without preceding high surrogate';
	      }
	      prev = str.charCodeAt(i - 1);
	      if (0xD800 > prev || prev > 0xDBFF) { //(could change last hex to 0xDB7F to treat high private surrogates as single characters)
	        throw 'Low surrogate without preceding high surrogate';
	      }
	      return false; // We can pass over low surrogates now as the second component in a pair which we have already processed
	    }
	    return str.charAt(i);
	  };

	  for (i = 0, lgth = 0; i < str.length; i++) {
	    if ((chr = getWholeChar(str, i)) === false) {
	      continue;
	    } // Adapt this line at the top of any loop, passing in the whole string and the current iteration and returning a variable to represent the individual character; purpose is to treat the first part of a surrogate pair as the whole character and then ignore the second part
	    lgth++;
	  }
	  return lgth;
	}

function implode (glue, pieces) {
	  // http://kevin.vanzonneveld.net
	  // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
	  // +   improved by: Waldo Malqui Silva
	  // +   improved by: Itsacon (http://www.itsacon.net/)
	  // +   bugfixed by: Brett Zamir (http://brett-zamir.me)
	  // *     example 1: implode(' ', ['Kevin', 'van', 'Zonneveld']);
	  // *     returns 1: 'Kevin van Zonneveld'
	  // *     example 2: implode(' ', {first:'Kevin', last: 'van Zonneveld'});
	  // *     returns 2: 'Kevin van Zonneveld'
	  var i = '',
	    retVal = '',
	    tGlue = '';
	  if (arguments.length === 1) {
	    pieces = glue;
	    glue = '';
	  }
	  if (typeof pieces === 'object') {
	    if (Object.prototype.toString.call(pieces) === '[object Array]') {
	      return pieces.join(glue);
	    }
	    for (i in pieces) {
	      retVal += tGlue + pieces[i];
	      tGlue = glue;
	    }
	    return retVal;
	  }
	  return pieces;
	}