export const  formatDate=(date)=>{
	let d=new Date(date)	
	return ("0" + d.getDate()).slice(-2) + "." 
		+ ("0"+(d.getMonth()+1)).slice(-2) + "." 
		+ d.getFullYear();
}


export const resolvePath = (object, path, defaultValue) => path
   .split(/[\.\[\]\'\"]/)
   .filter(p => p)
   .reduce((o, p) => o ? o[p] : defaultValue, object)