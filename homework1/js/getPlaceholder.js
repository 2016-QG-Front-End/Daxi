window.onload=function(){

	var form=document.getElementById("form");
	var input=form.getElementsByTagName("input");
	for(var i=0;i<input.length-1;i++){
		input[i].value=input[i].getAttribute("placeholder");
		input[i].style.color="#C5D1DB";
		input[i].onclick=function(){
			this.value="";
			this.style.color="#000000";

		}
		input[i].onblur=function(){
			if(!this.value){
				this.value= this.getAttribute("placeholder");
				this.style.color="rgb(197,209,219)";
			}
		}
	}

	var textareaa=document.getElementById("textareaa");
	textareaa.value=textareaa.getAttribute("placeholder");
	textareaa.style.color="#C5D1DB";
	textareaa.onclick=function(){
		this.value="";
		this.style.color="#000000";
	}
	textareaa.onblur=function(){
		if(!this.value){
				this.value= this.getAttribute("placeholder");
				this.style.color="rgb(197,209,219)";
			}
	}
}
