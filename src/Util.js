/*jshint
    module: true,
    esversion: 9
*/

export default function extend(a,b){
	var c = {};
	Object.keys(a).forEach(function(k){c[k]=a[k];});
	Object.keys(b).forEach(function(k){c[k]=b[k];});
	return c;
};