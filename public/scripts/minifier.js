/* JSONCraft Minifier Client Script */
(function(){
  var input=document.getElementById('min-input');
  var output=document.getElementById('min-output');
  var status=document.getElementById('min-status');
  var charCount=document.getElementById('min-char-count');
  var lineCount=document.getElementById('min-line-count');

  function updateStats(){
    var v=input.value;
    charCount.textContent=v.length+' chars';
    lineCount.textContent=(v?v.split('\n').length:0)+' lines';
  }

  function showStatus(type,msg){
    status.className='status-bar '+type;
    status.textContent=msg;
  }
  function hideStatus(){status.className='status-bar hidden';status.textContent='';}

  function minify(){
    var val=input.value.trim();
    if(!val){showStatus('error','Please paste some JSON to minify.');output.textContent='';output.classList.add('empty');return;}
    try{
      var parsed=JSON.parse(val);
      var result=JSON.stringify(parsed);
      output.textContent=result;
      output.classList.remove('empty');
      var savings=Math.round((1-result.length/val.length)*100);
      showStatus('success','Minified from '+val.length+' to '+result.length+' chars ('+savings+'% smaller).');
    }catch(e){
      var msg=e.message||'Invalid JSON';
      output.textContent='Error: '+msg;
      output.classList.remove('empty');
      showStatus('error','Invalid JSON: '+msg);
    }
  }

  function clearAll(){
    input.value='';
    output.textContent='';
    output.classList.add('empty');
    hideStatus();
    updateStats();
  }

  function copyOutput(){
    var text=output.textContent;
    if(!text||output.classList.contains('empty')){return;}
    if(navigator.clipboard&&navigator.clipboard.writeText){
      navigator.clipboard.writeText(text).then(function(){
        showStatus('success','Copied to clipboard!');
      }).catch(function(){fallbackCopy(text);});
    }else{fallbackCopy(text);}
  }
  function fallbackCopy(text){
    var ta=document.createElement('textarea');
    ta.value=text;ta.style.position='fixed';ta.style.opacity='0';
    document.body.appendChild(ta);ta.select();
    try{document.execCommand('copy');showStatus('success','Copied!');}catch(e){showStatus('error','Copy failed.');}
    document.body.removeChild(ta);
  }

  function downloadOutput(){
    var text=output.textContent;
    if(!text||output.classList.contains('empty')){return;}
    try{
      var blob=new Blob([text],{type:'application/json'});
      var url=URL.createObjectURL(blob);
      var a=document.createElement('a');
      a.href=url;a.download='minified.json';
      document.body.appendChild(a);a.click();
      document.body.removeChild(a);URL.revokeObjectURL(url);
      showStatus('success','Download started.');
    }catch(e){showStatus('error','Download failed.');}
  }

  input.addEventListener('input',updateStats);
  document.getElementById('min-minify').addEventListener('click',minify);
  document.getElementById('min-clear').addEventListener('click',clearAll);
  document.getElementById('min-copy').addEventListener('click',copyOutput);
  document.getElementById('min-download').addEventListener('click',downloadOutput);
  input.addEventListener('keydown',function(e){
    if((e.ctrlKey||e.metaKey)&&e.key==='Enter'){e.preventDefault();minify();}
  });
  updateStats();
})();
