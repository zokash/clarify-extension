document.addEventListener("mouseup", ()=>{
    const selectedText = window.getSelection().toString().trim();
    if(selectedText.length >0){
        console.log("You selected:", selectedText);
    }
});