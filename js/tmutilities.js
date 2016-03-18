/*
* ThaumicMekanism's Javascript Utilities*/
TMjsutilversion='v1.0.0'; /*
* This contains utilities that are used in certain functions created by ThaumicMekanism.
* Please make sure the version required for the function is the same or less than the utility.
*/
//Version Keys
//v1_0_0="ban-72b302bf297a228a75730123efef7c41-ana";
var TMjsUVersionKeys = {
    //Version 1.0.0 
    //reqVersion: banana
    //verKey: 54be25ec596f7c331fab62ebbf461d14
    'v1.0.0': "banana@54be25ec596f7c331fab62ebbf461d14"
};


/* TMjsUtilities Compatibility Check ***************************************************************************************************************************************/
function TMjsUExistCheck(reqVersion,verID,verKey){
//Checks if the inputs are all set.
if (typeof reqVersion == 'undefined'|| typeof verID == 'undefined' || typeof verKey == 'undefined'){throw new TMjsUError('TMjsUError','The input with this function is missing variables!');}
    
    //Throws new error if the version inputed does not exist in the array above.
    if(typeof TMjsUVersionKeys[reqVersion] == 'undefined'){
        throw new TMjsUError('TMjsUError','The TMjsUtilities version is invalid!');
    }
    //Splits the string given from the TMjsUVersionKeys array into the ID and Key
    var tmujscverKeys = TMjsUVersionKeys[reqVersion].indexOf("@");  // Gets the first index where a space occours
    var cvID = TMjsUVersionKeys[reqVersion].substr(0, tmujscverKeys); // Gets the first part
    var cvKey = TMjsUVersionKeys[reqVersion].substr(tmujscverKeys + 1);  // Gets the text part
    //Throws new error if the ID recieved above is what the user inputs.
    if(cvID !== verID){
        throw new TMjsUError('TMjsUError','The TMjsUtilities ID is invalid for the version given!');
    }
    //Throws new error if the Key that the user gives does not equal the one gotten above.
    if(cvKey !== md5(cvID.slice(0,Math.ceil(cvID.length / 2))+'-'+md5(cvID)+'-'+cvID.substring(Math.ceil(cvID.length / 2)))){
        throw new TMjsUError('TMjsUError','The TMjsUtilities Key is invalid for the version given!');
    }
    console.log("The version TMjsUtilities is compatible with this function!");
}
/* END TMjsUtilities Compatibility Check ***************************************************************************************************************************************/


/* FUNCTIONS IN THIS FILE AND USES
---------------------------------------------------------------------------------------------------------------------------------------------------------

+++++ ThaumicMekanism Javascript Utilities Version check +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
SYNTAX: TMjsUExistCheck(reqVersion,verID,verKey);
reqVersion = The version number the function was built on. (Ex. 'v1.0.0.')
verID = The version ID is a random word. It should make sence. (Ex. 'banana') (Spelling Matters!!!!)
verKey = The version key given with the other information. It will look like a random hash of numbers and letters (Ex. '54be25ec596f7c331fab62ebbf461d14')

Output = NULL (Nothing at the moment. Possbly a key in the future which would be used to confim the version is consistant.)
All of these variables will be given if you use this version so you can dev with the utilities.
=======================================================================================================================

+++++ Custom Error +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
SYNTAX: throw new TMjsUError(name,message);
name = The name of the error. Will only be outputed to the javascript log.
message = The input that will be outputed to the javascript log.
This function errors the javascript and quits all functions running which call to this error.
Output = ERROR (An error to the log and the function gets cancled.)
=======================================================================================================================

+++++ Insert Character Every nth Term +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
SYNTAX: insertNthChar(string,chr,nth);
string = Origional string to be sliced.
chr = Character to be inputed every nth term.
nth = The number of characters in which the chr will be inputed.

Output = STRING
=======================================================================================================================

+++++ md5 Encryptor +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
SYNTAX: md5(string);

Output = STRING (Outputs the md5 hash of the input string. This should be put to a variable.)
=======================================================================================================================

---------------------------------------------------------------------------------------------------------------------------------------------------------
*/

/* Custom Error ***************************************************************************************************************************************/
function TMjsUError(name,message) {
    TMjsUError.prototype = Error.prototype;
    TMjsUError.prototype.constructor = TMjsUError;
    this.name = name;
    this.message = message;   
}
/* END Custom Error ***************************************************************************************************************************************/

/* Insert Character Every nth Term ***************************************************************************************************************************************/
    function insertNthChar(string,chr,nth) {
      var output = '';
      for (var i=0; i<string.length; i++) {
        if (i>0 && i%nth == 0)
          output += chr;
        output += string.charAt(i);
      }
      return output;
    }
/* END Insert Character Every nth Term ***************************************************************************************************************************************/
    
/* md5 Converter ***************************************************************************************************************************************/
/*
 * A JavaScript implementation of the RSA Data Security, Inc. MD5 Message
 * Digest Algorithm, as defined in RFC 1321.
 * Copyright (C) Paul Johnston 1999 - 2000.
 * Updated by Greg Holt 2000 - 2001.
 * See http://pajhome.org.uk/site/legal.html for details.
 */

/*
 * Convert a 32-bit number to a hex string with ls-byte first
 */
var hex_chr = "0123456789abcdef";
function rhex(num)
{
  str = "";
  for(j = 0; j <= 3; j++)
    str += hex_chr.charAt((num >> (j * 8 + 4)) & 0x0F) +
           hex_chr.charAt((num >> (j * 8)) & 0x0F);
  return str;
}

/*
 * Convert a string to a sequence of 16-word blocks, stored as an array.
 * Append padding bits and the length, as described in the MD5 standard.
 */
function str2blks_MD5(str)
{
  nblk = ((str.length + 8) >> 6) + 1;
  blks = new Array(nblk * 16);
  for(i = 0; i < nblk * 16; i++) blks[i] = 0;
  for(i = 0; i < str.length; i++)
    blks[i >> 2] |= str.charCodeAt(i) << ((i % 4) * 8);
  blks[i >> 2] |= 0x80 << ((i % 4) * 8);
  blks[nblk * 16 - 2] = str.length * 8;
  return blks;
}

/*
 * Add integers, wrapping at 2^32. This uses 16-bit operations internally 
 * to work around bugs in some JS interpreters.
 */
function add(x, y)
{
  var lsw = (x & 0xFFFF) + (y & 0xFFFF);
  var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
  return (msw << 16) | (lsw & 0xFFFF);
}

/*
 * Bitwise rotate a 32-bit number to the left
 */
function rol(num, cnt)
{
  return (num << cnt) | (num >>> (32 - cnt));
}

/*
 * These functions implement the basic operation for each round of the
 * algorithm.
 */
function cmn(q, a, b, x, s, t)
{
  return add(rol(add(add(a, q), add(x, t)), s), b);
}
function ff(a, b, c, d, x, s, t)
{
  return cmn((b & c) | ((~b) & d), a, b, x, s, t);
}
function gg(a, b, c, d, x, s, t)
{
  return cmn((b & d) | (c & (~d)), a, b, x, s, t);
}
function hh(a, b, c, d, x, s, t)
{
  return cmn(b ^ c ^ d, a, b, x, s, t);
}
function ii(a, b, c, d, x, s, t)
{
  return cmn(c ^ (b | (~d)), a, b, x, s, t);
}

/*
 * Take a string and return the hex representation of its MD5.
 */
function md5(str)
{
  x = str2blks_MD5(str);
  a =  1732584193;
  b = -271733879;
  c = -1732584194;
  d =  271733878;

  for(i = 0; i < x.length; i += 16)
  {
    olda = a;
    oldb = b;
    oldc = c;
    oldd = d;

    a = ff(a, b, c, d, x[i+ 0], 7 , -680876936);
    d = ff(d, a, b, c, x[i+ 1], 12, -389564586);
    c = ff(c, d, a, b, x[i+ 2], 17,  606105819);
    b = ff(b, c, d, a, x[i+ 3], 22, -1044525330);
    a = ff(a, b, c, d, x[i+ 4], 7 , -176418897);
    d = ff(d, a, b, c, x[i+ 5], 12,  1200080426);
    c = ff(c, d, a, b, x[i+ 6], 17, -1473231341);
    b = ff(b, c, d, a, x[i+ 7], 22, -45705983);
    a = ff(a, b, c, d, x[i+ 8], 7 ,  1770035416);
    d = ff(d, a, b, c, x[i+ 9], 12, -1958414417);
    c = ff(c, d, a, b, x[i+10], 17, -42063);
    b = ff(b, c, d, a, x[i+11], 22, -1990404162);
    a = ff(a, b, c, d, x[i+12], 7 ,  1804603682);
    d = ff(d, a, b, c, x[i+13], 12, -40341101);
    c = ff(c, d, a, b, x[i+14], 17, -1502002290);
    b = ff(b, c, d, a, x[i+15], 22,  1236535329);    

    a = gg(a, b, c, d, x[i+ 1], 5 , -165796510);
    d = gg(d, a, b, c, x[i+ 6], 9 , -1069501632);
    c = gg(c, d, a, b, x[i+11], 14,  643717713);
    b = gg(b, c, d, a, x[i+ 0], 20, -373897302);
    a = gg(a, b, c, d, x[i+ 5], 5 , -701558691);
    d = gg(d, a, b, c, x[i+10], 9 ,  38016083);
    c = gg(c, d, a, b, x[i+15], 14, -660478335);
    b = gg(b, c, d, a, x[i+ 4], 20, -405537848);
    a = gg(a, b, c, d, x[i+ 9], 5 ,  568446438);
    d = gg(d, a, b, c, x[i+14], 9 , -1019803690);
    c = gg(c, d, a, b, x[i+ 3], 14, -187363961);
    b = gg(b, c, d, a, x[i+ 8], 20,  1163531501);
    a = gg(a, b, c, d, x[i+13], 5 , -1444681467);
    d = gg(d, a, b, c, x[i+ 2], 9 , -51403784);
    c = gg(c, d, a, b, x[i+ 7], 14,  1735328473);
    b = gg(b, c, d, a, x[i+12], 20, -1926607734);
    
    a = hh(a, b, c, d, x[i+ 5], 4 , -378558);
    d = hh(d, a, b, c, x[i+ 8], 11, -2022574463);
    c = hh(c, d, a, b, x[i+11], 16,  1839030562);
    b = hh(b, c, d, a, x[i+14], 23, -35309556);
    a = hh(a, b, c, d, x[i+ 1], 4 , -1530992060);
    d = hh(d, a, b, c, x[i+ 4], 11,  1272893353);
    c = hh(c, d, a, b, x[i+ 7], 16, -155497632);
    b = hh(b, c, d, a, x[i+10], 23, -1094730640);
    a = hh(a, b, c, d, x[i+13], 4 ,  681279174);
    d = hh(d, a, b, c, x[i+ 0], 11, -358537222);
    c = hh(c, d, a, b, x[i+ 3], 16, -722521979);
    b = hh(b, c, d, a, x[i+ 6], 23,  76029189);
    a = hh(a, b, c, d, x[i+ 9], 4 , -640364487);
    d = hh(d, a, b, c, x[i+12], 11, -421815835);
    c = hh(c, d, a, b, x[i+15], 16,  530742520);
    b = hh(b, c, d, a, x[i+ 2], 23, -995338651);

    a = ii(a, b, c, d, x[i+ 0], 6 , -198630844);
    d = ii(d, a, b, c, x[i+ 7], 10,  1126891415);
    c = ii(c, d, a, b, x[i+14], 15, -1416354905);
    b = ii(b, c, d, a, x[i+ 5], 21, -57434055);
    a = ii(a, b, c, d, x[i+12], 6 ,  1700485571);
    d = ii(d, a, b, c, x[i+ 3], 10, -1894986606);
    c = ii(c, d, a, b, x[i+10], 15, -1051523);
    b = ii(b, c, d, a, x[i+ 1], 21, -2054922799);
    a = ii(a, b, c, d, x[i+ 8], 6 ,  1873313359);
    d = ii(d, a, b, c, x[i+15], 10, -30611744);
    c = ii(c, d, a, b, x[i+ 6], 15, -1560198380);
    b = ii(b, c, d, a, x[i+13], 21,  1309151649);
    a = ii(a, b, c, d, x[i+ 4], 6 , -145523070);
    d = ii(d, a, b, c, x[i+11], 10, -1120210379);
    c = ii(c, d, a, b, x[i+ 2], 15,  718787259);
    b = ii(b, c, d, a, x[i+ 9], 21, -343485551);

    a = add(a, olda);
    b = add(b, oldb);
    c = add(c, oldc);
    d = add(d, oldd);
  }
  return rhex(a) + rhex(b) + rhex(c) + rhex(d);
}

/* END md5 Converter ***************************************************************************************************************************************/