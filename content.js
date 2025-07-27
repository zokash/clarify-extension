let last_selected_text = "";
document.addEventListener("mouseup", () => {
  const selection = window.getSelection();
  const selectedText = selection.toString().trim();

  if (selectedText.length > 0) {
    last_selected_text = selectedText;

    const range = selection.getRangeAt(0);
    const rect = range.getBoundingClientRect();

    // Remove previous button
    const existingBtn = document.getElementById("clarify-btn");
    if (existingBtn) existingBtn.remove();

    const btn = document.createElement("button");
    btn.id = "clarify-btn";
    btn.innerText = "✨ Clarify ✨";

    // Styling
    btn.style.position = "absolute";
    btn.style.top = `${rect.top + window.scrollY - 30}px`;
    btn.style.left = `${rect.left + window.scrollX}px`;
    btn.style.zIndex = 9999;
    btn.style.padding = "6px 14px";
    btn.style.fontSize = "14px";
    btn.style.borderRadius = "8px";
    btn.style.backgroundColor = "#ffffff";
    btn.style.border = "2px solid #ffb347";
    btn.style.color = "#444";
    btn.style.fontFamily = "'Poppins', sans-serif";
    btn.style.cursor = "pointer";
    btn.style.boxShadow = "2px 4px 8px rgba(0, 0, 0, 0.08)";
    btn.style.transition = "all 0.25s ease-in-out";

    btn.onmouseenter = () => btn.style.backgroundColor = "#fff3e0";
    btn.onmouseleave = () => btn.style.backgroundColor = "#ffffff";

    document.body.appendChild(btn);

    btn.addEventListener("mousedown", (e) => {
      e.preventDefault();//to prevent focus shift or selection cancel
      console.log("clarify button clicked!");
        showPopup(last_selected_text);
    });
  }
});

function showPopup(selectedText) {
  
  if(!selectedText){
    console.warn("Popup aborted: no selectedText provided");
    return;
  }
  console.log("running the showPopup with: ", selectedText);
  const existingPopup = document.getElementById("clarify-popup");
  if (existingPopup) existingPopup.remove();

  const popup = document.createElement("div");
  popup.id = "clarify-popup";

  popup.innerHTML = `
    <div style="display: flex; justify-content: flex-end;">
      <button id="clarify-close"
        style="background: none; border: none; font-size: 16px; color: #888; cursor: pointer;">×</button>
    </div>
    <p style="margin-top: 4px; font-style: italic;">"${selectedText}"</p>
    <hr style="margin: 10px 0; border: none; border-top: 1px solid #eee;" />
    <div style="margin-top: 12px; color: #444;">
  <strong>Explanation:</strong><br />
  ${generateFakeExplanation(selectedText)}
</div>
<button id="finish-session"
    style="margin-top: 14px; background-color: #f5f5f5; border: 1px solid #ccc;
    padding: 6px 12px; border-radius: 6px; font-size: 13px; cursor: pointer;">
    📚 Finish Session
  </button>

  `;
function generateFakeExplanation(text) {
  return `"${text}" is a concept that is commonly found in educational or technical content. This explanation will soon be powered by GPT-4! 🚀"`;
}

  popup.style.position = "fixed";
  popup.style.top = "100px";
  popup.style.right = "50px";
  popup.style.width = "300px";
  popup.style.backgroundColor = "#fff";
  popup.style.border = "2px solid #ffb347";
  popup.style.borderRadius = "12px";
  popup.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.1)";
  popup.style.padding = "16px";
  popup.style.zIndex = 10000;
  popup.style.fontFamily = "'Poppins', sans-serif";
  popup.style.fontSize = "14px";
  popup.style.color = "#333";
  

  document.body.appendChild(popup);
  console.log("Popup element:", popup);
  console.log("Popup display style:", window.getComputedStyle(popup).display);
  saveDoubts(selectedText);
  console.log("popup added to DOM")

  const closeBtn = document.getElementById("clarify-close");
  closeBtn.onmouseenter = () => closeBtn.style.color = "#555";
  closeBtn.onmouseleave = () => closeBtn.style.color = "#888";

  closeBtn.addEventListener("click", () => {
    popup.remove();
    const clarifyBtn = document.getElementById("clarify-btn");
    if (clarifyBtn) clarifyBtn.remove();
  });
  document.getElementById("finish-session").addEventListener("click", () => {
  const doubts = JSON.parse(localStorage.getItem("clarify_doubts")) || [];

  if (doubts.length === 0) {
    alert("No doubts saved in this session!");
    return;
  }

  // Show summary of doubts
  const summary = doubts.map((d, i) => `${i + 1}. ${d}`).join("\n");

  const confirmClear = confirm(
    "Here are your saved doubts:\n\n" + summary + "\n\nDo you want to clear this session?"
  );

  if (confirmClear) {
    localStorage.removeItem("clarify_doubts");
    alert("Session cleared!");
  }
});

}
function saveDoubts(text){
  let doubts = JSON.parse(localStorage.getItem("clarify_doubts")) || [];
  if(!doubts.includes(text)){
    doubts.push(text);
    localStorage.setItem("clarify_doubts", JSON.stringify(doubts));
    console.log("doubt saved:", text);
  }
  else{
    console.log("doubt is already saved: ", text);
  }
}