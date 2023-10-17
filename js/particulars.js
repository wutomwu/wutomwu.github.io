var idSerial=getQueryString('id')
   $.ajax({
   	url: 'details.json',
   	dataType: 'json',
   	success: function(data) {

   		initialization(data)
   		
   	}

   })
   
function initialization (data) {
	//console.log(data)
	var aff=[];
	var Third;
	var itemNode='';
	var itmelist='';
	var numbers=1;
	$(".particulars-title").text(data[idSerial].title)
	$(".particulars-year").text(data[idSerial].event)
	$("#abstract").text(data[idSerial].abstract)
	$("#Acknowledgement").text(data[idSerial].acknowlegement)
	$("#Article").text(data[idSerial].bibtex.type)
	$("#Modeling").text(data[idSerial].bibtex.name)
	$("#Title").text(data[idSerial].bibtex.title)
	$("#Author").text(data[idSerial].bibtex.author)
	$("#Journal").text(data[idSerial].bibtex.journel)
	$("#Volume").text(data[idSerial].bibtex.volume)
	$("#Number").text(data[idSerial].bibtex.number)
	$("#Pages").text(data[idSerial].bibtex.pages)
	$("#Year").text(data[idSerial].bibtex.year)
	
	  for (var i=0;i<data[idSerial].contents[0].images.length;i++) { //第一个内容区域 	
	  	var item='<div style="text-align: center;"><img width="900" src="'+data[idSerial].contents[0].images[i].uri+'" class="particulars-img image1" />'
	  	        +'</div><div style="height: 18px;"></div><p class="particulars-font"><font class="particulars-bold">'+data[idSerial].contents[0].images[i].type+'. </font>'
	           	+'<span class="article1">'+data[idSerial].contents[0].images[i].caption+'</span></p>'
	    $(".theFirst").append(item)
	  }
	  

	
	  for (var i=1;i<data[idSerial].contents.length;i++) { //第二个内容区域 	
         var cycle=''
             for (var k=0;k<data[idSerial].contents[i].images.length;k++){    	
               
            
          cycle +='<div style="text-align: center;"><img width="900" src="'+data[idSerial].contents[i].images[k].uri+'" class="particulars-img" /></div>'
			          +'<p class="particulars-font"><font class="particulars-bold">'+data[idSerial].contents[i].images[k].type+'. </font><span>'+data[idSerial].contents[i].images[k].caption+'</span></p>'
			          
             }
    
        itemNode +='<div class="particulars-subhead">'+data[idSerial].contents[i].name+'</div>'+cycle+'<div class="underline"></div>'    
	  	
			        
	  
	  } 
	 
	 $(".second").append(itemNode) 
	  
		for (var i=0;i<data[idSerial].affiliations.length;i++) {//所属单位
		aff.push(i)
		var num
		if (data[idSerial].affiliations.length>=2) {
		  num=i+1
		  
		}else{
			num=[]
		}
	    
		var item='<li><a style="position: relative;" href="'+data[idSerial].affiliations[i].url+'" >'+data[idSerial].affiliations[i].name+''
		         +'<i class="artifont1">'+num+'</i></a></li>'
		
		$(".parti-ul").append(item)
	  }
		
	for (var i=0;i<data[idSerial].authors.length;i++) {//作者名
		
		    var num
     	  if (aff.length>=2) {
     	  	if (data[idSerial].authors[i].afflID.length>=2) {
     	  		var afflIDArr=data[idSerial].authors[i].afflID
     	  		var c=JSON.parse(JSON.stringify(afflIDArr))  		
     	  	c.forEach(function(clip,index) {  		
     	  		   c[index]=clip+1
     	  	})
     	  	num=c
     	  	}else{
     	  	num=Number(data[idSerial].authors[i].afflID)+1
     	  	}
     	  }else{
     	  	num=[]
     	  }
	   
		var items
		if (typeof(data[idSerial].authors[i].url) == "undefined")
		{
			items='<a style="position: relative;">'+data[idSerial].authors[i].fullName+''
		          +'<i class="artifont">'+num+'</i></a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'
		}
		else
		{
			items='<a style="position: relative;" href="'+data[idSerial].authors[i].url+'" >'+data[idSerial].authors[i].fullName+''
			+'<i class="artifont">'+num+'</i></a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'
		}
		
		$(".particulars-detail").append(items)
	  }
 
	
		for (var i=0;i<data[idSerial].materials.length;i++) {//底部文件下载
			var item='<li><a href="'+data[idSerial].materials[i].matUri+'"><img src="'+data[idSerial].materials[i].iconUri+'"/></a>'
			         +'<p><a href="'+data[idSerial].materials[i].matUri+'" >'+data[idSerial].materials[i].caption+'</a></p></li>'
			
			$(".particulars-foot").append(item)
		}
		
   if (data[idSerial].videos=='') {
   	 
   	  	$(".video-cont").hide()
   	  	return
   	  }
   for (var i=0;i<data[idSerial].videos.length;i++) {//图片循环
  
   	    var cycles=''
    
    for (var k=0;k<data[idSerial].videos[i].caption.length;k++){  
    	
    	cycles +='<span>[<a href="'+data[idSerial].videos[i].caption[k].uri+'" >'+data[idSerial].videos[i].caption[k].title+'</a>]</span>&nbsp;&nbsp;'
    }
   	 itmelist +=' <div class="particulars-video"> <div class="particularsVideo"><img src="'+data[idSerial].videos[i].imageUri+'" class="video-js" /></div><div class="particulars-video-a">'+cycles+'</div></div>'
             

   }
   
 $(".particulars-video-cont").append(itmelist)
	
}