/* JSONCraft Formatter Client Script */
(function(){
  var input=document.getElementById('fmt-input');
  var output=document.getElementById('fmt-output');
  var status=document.getElementById('fmt-status');
  var indentSel=document.getElementById('fmt-indent');
  var charCount=document.getElementById('fmt-char-count');
  var lineCount=document.getElementById('fmt-line-count');

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

  function getIndent(){
    var v=indentSel.value;
    return v==='tab'?'\t':v;
  }

  function format(){
    var val=input.value.trim();
    if(!val){showStatus('error','Please paste some JSON to format.');return;}
    try{
      var parsed=JSON.parse(val);
      var result=JSON.stringify(parsed,null,getIndent());
      output.textContent=result;
      output.classList.remove('empty');
      showStatus('success','JSON formatted successfully.');
      updateStats();
    }catch(e){
      var msg=e.message||'Invalid JSON';
      output.textContent='Error: '+msg;
      output.classList.remove('empty');
      showStatus('error','Invalid JSON: '+msg);
    }
  }

  function validate(){
    var val=input.value.trim();
    if(!val){showStatus('error','Please paste some JSON to validate.');return;}
    try{
      JSON.parse(val);
      output.textContent='Valid JSON';
      output.classList.remove('empty');
      showStatus('success','Valid JSON');
    }catch(e){
      var msg=e.message||'Invalid JSON';
      output.textContent='Error: '+msg;
      output.classList.remove('empty');
      showStatus('error','Invalid JSON: '+msg);
    }
  }

  function minify(){
    var val=input.value.trim();
    if(!val){showStatus('error','Please paste some JSON to minify.');return;}
    try{
      var parsed=JSON.parse(val);
      var result=JSON.stringify(parsed);
      output.textContent=result;
      output.classList.remove('empty');
      showStatus('success','JSON minified. '+result.length+' characters.');
    }catch(e){
      var msg=e.message||'Invalid JSON';
      output.textContent='Error: '+msg;
      output.classList.remove('empty');
      showStatus('error','Invalid JSON: '+msg);
    }
  }

  function clearAll(){
    input.value='';
    output.textContent='Formatted JSON will appear here...';
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
      a.href=url;a.download='formatted.json';
      document.body.appendChild(a);a.click();
      document.body.removeChild(a);URL.revokeObjectURL(url);
      showStatus('success','Download started.');
    }catch(e){showStatus('error','Download failed.');}
  }

  input.addEventListener('input',updateStats);
  document.getElementById('fmt-format').addEventListener('click',format);
  document.getElementById('fmt-validate').addEventListener('click',validate);
  document.getElementById('fmt-minify').addEventListener('click',minify);
  document.getElementById('fmt-clear').addEventListener('click',clearAll);
  document.getElementById('fmt-copy').addEventListener('click',copyOutput);
  document.getElementById('fmt-download').addEventListener('click',downloadOutput);

  input.addEventListener('keydown',function(e){
    if((e.ctrlKey||e.metaKey)&&e.key==='Enter'){e.preventDefault();format();}
  });

  updateStats();
})();
