const left = document.querySelector(".left"),
      right = document.querySelector(".right"),
      bar = document.querySelector(".bar"),
      editor = document.querySelector(".editor"),
      run = document.querySelector(".btn-run"),
      iframe = document.querySelector(".iframe"),
      darkMode = document.querySelector(".btn-dark"),
      lightMode = document.querySelector(".btn-light");


const drag = (e) => {
    e.preventDefault();
    document.selection ? document.selection.empty() : window.getSelection().removeAllRanges();
    left.style.width = (e.pageX - bar.offsetWidth / 3) + "px";
};
    

editor.addEventListener("focus", () => {
    if (editor.textContent.trim() === "Write your code...") {
        editor.textContent = ""; // Clear placeholder on focus
    }
});

editor.addEventListener("blur", () => {
    if (editor.textContent.trim() === "") {
        editor.textContent = "Write your code..."; // Restore placeholder if empty on blur
    }
});

bar.addEventListener("mousedown", () => {
    document.addEventListener("mousemove", drag);
    document.addEventListener("mouseup", () => {
        document.removeEventListener("mousemove", drag);
    }, { once: true });
});


// bar.addEventListener("mouseup", () => {
//     document.removeEventListener("mousemove", drag);
// })
// Run button logic

run.addEventListener("click",() =>{
    const html = editor.textContent.trim() === "Write your code..." ? "" : editor.textContent;
    iframe.src = "data:text/html;charset=utf-8,"+ encodeURI(html);
})

darkMode.addEventListener("click",() =>{
    editor.style.backgroundColor = "#363836";
    editor.style.color ="#eee";    
})

lightMode.addEventListener("click",() =>{
    editor.style.backgroundColor = "";
    editor.style.color ="";    
})

// document.getElementById("live").onclick = function(){
//     if(this.checked){
//         editor.addEventListener("keyup",() =>{
//             const html = editor.textContent;
//             iframe.src = "data:text/html;charset=utf-8,"+ encodeURI(html);
//         })
//     }
// }
let liveModeActive = false;

document.getElementById("live").onclick = function () {
    if (this.checked && !liveModeActive) {
        liveModeActive = true;
        editor.addEventListener("keyup", updateIframe);
    } else if (!this.checked && liveModeActive) {
        liveModeActive = false;
        editor.removeEventListener("keyup", updateIframe);
    }
};

function updateIframe() {
    const html = editor.textContent;
    iframe.src = "data:text/html;charset=utf-8," + encodeURI(html);
}
