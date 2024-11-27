let snippets = [
  { id: 1, title: "Event Reminder", text: "Hi {student_name}, this is a reminder for {event_name} on {event_date}.", tags: ["#event", "#reminder"] },
  { id: 2, title: "Follow-up Email", text: "Hi {student_name}, just checking in after our last meeting.", tags: ["#followup"] }
];

let selectedSnippets = new Set();

function renderSnippets(filteredSnippets = snippets) {
  const snippetList = document.getElementById('snippet-list');
  snippetList.innerHTML = '';
  filteredSnippets.forEach(snippet => {
    const snippetDiv = document.createElement('div');
    snippetDiv.className = 'snippet';
    snippetDiv.innerHTML = `
      <div>
        <h3>${snippet.title}</h3>
        <p>${snippet.text}</p>
        <p><strong>Tags:</strong> ${snippet.tags.join(', ')}</p>
      </div>
      <button onclick="copyToClipboard('${snippet.text.replace(/'/g, "\\'")}')">Copy</button>
    `;
    snippetList.appendChild(snippetDiv);
  });
}

function renderBulkSnippetList() {
  const bulkList = document.getElementById('bulk-snippet-list');
  bulkList.innerHTML = '';
  snippets.forEach(snippet => {
    const bulkItem = document.createElement('div');
    bulkItem.className = 'snippet';
    bulkItem.innerHTML = `
      <input type="checkbox" data-id="${snippet.id}" onchange="toggleSnippetSelection(${snippet.id}, this.checked)" />
      <div>
        <h3>${snippet.title}</h3>
        <p>${snippet.text}</p>
        <p><strong>Tags:</strong> ${snippet.tags.join(', ')}</p>
      </div>
    `;
    bulkList.appendChild(bulkItem);
  });
}

function toggleSnippetSelection(id, isChecked) {
  if (isChecked) {
    selectedSnippets.add(id);
  } else {
    selectedSnippets.delete(id);
  }
}

function deleteSelectedSnippets() {
  snippets = snippets.filter(snippet => !selectedSnippets.has(snippet.id));
  selectedSnippets.clear();
  renderSnippets();
  renderBulkSnippetList();
}

function exportSelectedSnippets() {
  const exportedSnippets = snippets.filter(snippet => selectedSnippets.has(snippet.id));
  const jsonString = JSON.stringify(exportedSnippets, null, 2);
  const blob = new Blob([jsonString], { type: 'application/json' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'snippets.json';
  link.click();
}

function searchSnippets() {
  const query = document.getElementById('search-bar').value.toLowerCase();
  const filteredSnippets = snippets.filter(snippet =>
    snippet.title.toLowerCase().includes(query) ||
    snippet.text.toLowerCase().includes(query) ||
    snippet.tags.some(tag => tag.toLowerCase().includes(query))
  );
  renderSnippets(filteredSnippets);
}

function addSnippet() {
  const title = document.getElementById('snippet-title').value;
  const text = document.getElementById('snippet-text').value;
  const tagsInput = document.getElementById('snippet-tags').value;
  const tags = tagsInput.split(',').map(tag => tag.trim()).filter(tag => tag);

  if (title && text) {
    snippets.push({ id: snippets.length + 1, title, text, tags });
    renderSnippets();
    closeModal();
  } else {
    alert('Please fill in all fields.');
  }
}

function openNewSnippetModal() {
  document.getElementById('snippet-modal').style.display = 'block';
}

function openBulkActionsModal() {
  renderBulkSnippetList();
  document.getElementById('bulk-actions-modal').style.display = 'block';
}

function closeModal() {
  document.querySelectorAll('.modal').forEach(modal => (modal.style.display = 'none'));
}

function copyToClipboard(text) {
  navigator.clipboard.writeText(text).then(() => {
    alert('Snippet copied to clipboard!');
  });
}

function importSnippets(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function () {
    try {
      const importedSnippets = JSON.parse(reader.result);
      const validSnippets = importedSnippets.filter(snippet => snippet.id && snippet.title && snippet.text && Array.isArray(snippet.tags));
      if (validSnippets.length) {
        snippets = [...snippets, ...validSnippets];
        renderSnippets();
        alert(`${validSnippets.length} snippets imported successfully!`);
      } else {
        alert('No valid snippets found in the file.');
      }
    } catch (e) {
      alert('Invalid JSON file.');
    }
  };
  reader.readAsText(file);
}

//
