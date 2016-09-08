hidePosts();

function hidePosts(){
var posts = document.getElementsByClassName('username');
chrome.storage.local.get('blockedUserNames', function(result){
var storedValues = result.blockedUserNames;
for (var i = 0, l = posts.length; i < l; i++) {
  var username = posts[i].innerHTML;
  for (var j = 0, ll = storedValues.length; j < ll; j++) {
  if(username == storedValues[j]){
	 var elementToHide = findAncestor(posts[i], 'comment');
	 if(elementToHide != null){
	 elementToHide.style.display = 'none';
	 }
	 }
  }
}
});
}

chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {
   if (msg.action == 'refresh') {
      //alert("Message recieved!");
	  hidePosts();
   }
});
									   
function findAncestor (el, cls) {
    while ((el = el.parentElement) && !el.classList.contains(cls));
    return el;
}

(
function ()
{ 
var newcss = '.pre { background: #f9f9f9; white-space: pre} blockquote { background: #f9f9f9; border-left: 10px solid #ccc; margin: 1.5em 10px; padding: 0.5em 10px; quotes: initial; } blockquote:before { color: #ccc; content: open-quote; font-size: 4em; line-height: 0.1em; margin-right: 0.25em; vertical-align: -0.4em; } blockquote p { display: inline; }'; 
if ('\v'=='v') /* ie only */ 
{   
document.createStyleSheet().cssText = newcss;   
} else 
{   
var tag = document.createElement('style'); 
tag.type = 'text/css'; 
document.getElementsByTagName('head')[0].appendChild(tag);    
tag[ (typeof document.body.style.WebkitAppearance=='string') /* webkit only */ ? 'innerText' : 'innerHTML'] = newcss;   
} 
}
)();

(function (){ 
	var t=document.getElementsByTagName('table')[0];
	if(t == null) { return; }

	chrome.storage.local.get('blockedUserNames', function(result){
		var storedValues = result.blockedUserNames;

		for(var i=0,r;r=t.rows[i];i++){
			for(var j=0,c;c=r.cells[j];j++){
				for (var v = 0, ll = storedValues.length; v < ll; v++) {
					if(c.innerHTML.indexOf(storedValues[v])!=-1){r.style.display='none';}
				}
			}
		}
		var even = false;
		for(var i=0,r;r=t.rows[i];i++){
			if(r.style.display != 'none'){
				if(even == true){
					r.className = 'even';
				}else{
					r.className = 'odd';
				}
				even = !even;
			}
		}
		
	});
})();
