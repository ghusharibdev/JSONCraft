/* JSONCraft Validator Client Script */
(function(){
  var input=document.getElementById('val-input');
  var output=document.getElementById('val-output');
  var status=document.getElementById('val-status');
  var charCount=document.getElementById('val-char-count');

  function updateStats(){
    charCount.textContent=input.value.length+' chars';
  }

  function showStatus(type,msg){
    status.className='status-bar '+type;
    status.textContent=msg;
  }
  function hideStatus(){status.className='status-bar hidden';status.textContent='';}

  function validate(){
    var val=input.value.trim();
    if(!val){showStatus('error','Please paste some JSON to validate.');output.textContent='';output.classList.add('empty');return;}
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

  input.addEventListener('input',updateStats);
  document.getElementById('val-validate').addEventListener('click',validate);
  document.getElementById('val-clear').addEventListener('click',clearAll);
  document.getElementById('val-copy').addEventListener('click',copyOutput);
  input.addEventListener('keydown',function(e){
    if((e.ctrlKey||e.metaKey)&&e.key==='Enter'){e.preventDefault();validate();}
  });
  updateStats();
})();
