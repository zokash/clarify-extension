document.addEventListener("mouseup", () => {
  const selection = window.getSelection();
  const selectedText = selection.toString().trim();

  if (selectedText.length > 0) {
    const range = selection.getRangeAt(0);
    const rect = range.getBoundingClientRect();

    // Remove previous button if it exists
    const existingBtn = document.getElementById("clarify-btn");
    if (existingBtn) existingBtn.remove();

    // Create button
    const btn = document.createElement("button");
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

    btn.innerText = "✨ Clarify ✨";

    btn.onmouseenter = () => {
      btn.style.backgroundColor = "#fff3e0";
    };
    btn.onmouseleave = () => {
      btn.style.backgroundColor = "#ffffff";
    };

    // Add button to page
    document.body.appendChild(btn);

    // On click: open popup
    btn.addEventListener("click", () => {
      showPopup(selectedText);
    });
  }
});

function showPopup(selectedText) {
  // Remove existing popup
  const existingPopup = document.getElementById("clarify-popup");
  if (existingPopup) existingPopup.remove();

  // Create new popup
  const popup = document.createElement("div");
  popup.id = "clarify-popup";

  // Style the popup
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

  // Set content
  popup.innerHTML = `
    <div style="display: flex; justify-content: flex-end;">
      <button id="clarify-close" 
        style="background: none; border: none; font-size: 16px; color: #888; cursor: pointer;">×</button>
    </div>
    <p style="margin-top: 4px; font-style: italic;">"${selectedText}"</p>
    <hr style="margin: 10px 0; border: none; border-top: 1px solid #eee;" />
    <div style="color: #888;">(GPT explanation will appear here)</div>
  `;

  // Append popup to page
  document.body.appendChild(popup);

  // Add hover to close button
  const closeBtn = document.getElementById("clarify-close");
  closeBtn.onmouseenter = () => closeBtn.style.color = "#555";
  closeBtn.onmouseleave = () => closeBtn.style.color = "#888";

  // Close logic
  closeBtn.addEventListener("click", () => {
    popup.remove();
  });
}
