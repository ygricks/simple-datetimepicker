/*jshint
    module: true,
    esversion: 9
*/

export default function extend(...args){
	var c = {};
	for(let o of args){
		Object.keys(o).forEach((k)=>{c[k]=o[k];});
	}
	return c;
};