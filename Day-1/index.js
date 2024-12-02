// // Get references to DOM elements
// const itemInput = document.getElementById("item-input");
// const addItemButton = document.getElementById("add-item-button");
// const shoppingList = document.getElementById("shopping-list");
// const modal = document.getElementById("modal");
// const modalTitle = document.getElementById("modal-title");
// const modalMessage = document.getElementById("modal-message");
// const modalInput = document.getElementById("modal-input");
// const modalConfirm = document.getElementById("modal-confirm");
// const modalCancel = document.getElementById("modal-cancel");
// const listArr = [];

// let editingIndex = -1;

// // Function to normalize text (trim and convert to lowercase)
// function normalizeText(text) {
//   return text.trim().toLowerCase().replace(/\s+/g, " ");
// }

// // Function to check if item is not duplicate
// function checkDuplicate() {
//   const itemText = itemInput.value.trim();
//   if (itemText === "") return; // Don't add empty items

//   const normalizedItem = normalizeText(itemText);

//   // Check for duplicates
//   const isDuplicate = listArr.some(
//     (item) => normalizeText(item) === normalizedItem
//   );

//   if (!isDuplicate) {
//     listArr.push(itemText); // Add the original text (preserving capitalization)
//     renderList();
//     itemInput.value = ""; // Clear the input field
//   } else {
//     showModal("Alert", "This item is already on the list!");
//   }
// }

// // Function to add an item to the shopping list
// function renderList() {
//   shoppingList.innerHTML = "";
//   listArr.forEach((gift, index) => {
//     const listItem = document.createElement("li");
//     listItem.innerHTML = `
//             <span>${gift}</span>
//             <div class="item-buttons">
//                 <button class="edit-btn">Edit</button>
//                 <button class="delete-btn">Delete</button>
//             </div>
//         `;

//     // Add event listener for edit button
//     listItem
//       .querySelector(".edit-btn")
//       .addEventListener("click", () => openEditModal(index));

//     // Add event listener for delete button
//     listItem
//       .querySelector(".delete-btn")
//       .addEventListener("click", () => deleteItem(index));

//     shoppingList.appendChild(listItem);
//   });
// }

// // Function to show modal
// function showModal(
//   title,
//   message,
//   inputValue = "",
//   showInput = false,
//   onConfirm = null
// ) {
//   modalTitle.textContent = title;
//   modalMessage.textContent = message;
//   modalInput.value = inputValue;
//   modalInput.style.display = showInput ? "block" : "none";
//   modal.style.display = "block";

//   modalConfirm.onclick = () => {
//     if (onConfirm) onConfirm(modalInput.value);
//     closeModal();
//     modalConfirm.onclick = null; // Reset the onConfirm handler
//   };
// }

// // Function to close modal
// function closeModal() {
//   modal.style.display = "none";
//   editingIndex = -1;
// }

// // Function to open edit modal
// function openEditModal(index) {
//   editingIndex = index;
//   showModal("Edit Item", "", listArr[index], true, saveEditedItem);
// }

// // Function to save edited item
// function saveEditedItem(newItem) {
//   newItem = newItem.trim();
//   if (newItem !== "") {
//     const normalizedNewItem = normalizeText(newItem);
//     const isDuplicate = listArr.some(
//       (item, i) =>
//         i !== editingIndex && normalizeText(item) === normalizedNewItem
//     );

//     if (!isDuplicate) {
//       listArr[editingIndex] = newItem;
//       renderList();
//     } else {
//       showModal("Alert", "This item is already on the list!");
//     }
//   }
// }

// // Function to delete an item
// function deleteItem(index) {
//   showModal(
//     "Confirm Delete",
//     "Are you sure you want to delete this item?",
//     "",
//     false,
//     () => {
//       listArr.splice(index, 1);
//       renderList();
//     }
//   );
// }

// // Add event listeners
// addItemButton.addEventListener("click", checkDuplicate);
// itemInput.addEventListener("keypress", (event) => {
//   if (event.key === "Enter") {
//     checkDuplicate();
//   }
// });
// modalCancel.addEventListener("click", closeModal);

// // Close modal when clicking outside of it
// window.addEventListener("click", (event) => {
//   if (event.target === modal) {
//     closeModal();
//   }
// });

// Get references to DOM elements
const itemInput = document.getElementById('item-input');
const addItemButton = document.getElementById('add-item-button');
const shoppingList = document.getElementById('shopping-list');
const modal = document.getElementById('modal');
const modalTitle = document.getElementById('modal-title');
const modalMessage = document.getElementById('modal-message');
const modalInput = document.getElementById('modal-input');
const modalConfirm = document.getElementById('modal-confirm');
const modalCancel = document.getElementById('modal-cancel');
const listArr = [];

let editingIndex = -1;

// Function to normalize text (trim and convert to lowercase)
function normalizeText(text) {
    return text.trim().toLowerCase().replace(/\s+/g, ' ');
}

// Function to check if item is not duplicate
function checkDuplicate() {
    const itemText = itemInput.value.trim();
    if (itemText === '') return; // Don't add empty items

    const normalizedItem = normalizeText(itemText);
    
    // Check for duplicates
    const isDuplicate = listArr.some(item => normalizeText(item) === normalizedItem);
    
    if (!isDuplicate) {
        listArr.push(itemText); // Add the original text (preserving capitalization)
        renderList();
        itemInput.value = ''; // Clear the input field
    } else {
        showModal('Alert', 'This item is already on the list!', '', false, null, true);
    }
}

// Function to add an item to the shopping list
function renderList() {
    shoppingList.innerHTML = '';
    listArr.forEach((gift, index) => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <span>${gift}</span>
            <div class="item-buttons">
                <button class="edit-btn">Edit</button>
                <button class="delete-btn">Delete</button>
            </div>
        `;
        
        // Add event listener for edit button
        listItem.querySelector('.edit-btn').addEventListener('click', () => openEditModal(index));
        
        // Add event listener for delete button
        listItem.querySelector('.delete-btn').addEventListener('click', () => deleteItem(index));
        
        shoppingList.appendChild(listItem);
    });
}

// Function to show modal
function showModal(title, message, inputValue = '', showInput = false, onConfirm = null, isAlert = false) {
    modalTitle.textContent = title;
    modalMessage.textContent = message;
    modalInput.value = inputValue;
    modalInput.style.display = showInput ? 'block' : 'none';
    modal.style.display = 'block';

    if (isAlert) {
        modalConfirm.textContent = 'Close';
        modalCancel.style.display = 'none';
        modalConfirm.onclick = closeModal;
    } else {
        modalConfirm.textContent = 'Confirm';
        modalCancel.style.display = 'block';
        modalConfirm.onclick = () => {
            if (onConfirm) onConfirm(modalInput.value);
            closeModal();
        };
    }
}

// Function to close modal
function closeModal() {
    modal.style.display = 'none';
    editingIndex = -1;
}

// Function to open edit modal
function openEditModal(index) {
    editingIndex = index;
    showModal('Edit Item', '', listArr[index], true, saveEditedItem);
}

// Function to save edited item
function saveEditedItem(newItem) {
    newItem = newItem.trim();
    if (newItem !== '') {
        const normalizedNewItem = normalizeText(newItem);
        const isDuplicate = listArr.some((item, i) => i !== editingIndex && normalizeText(item) === normalizedNewItem);
        
        if (!isDuplicate) {
            listArr[editingIndex] = newItem;
            renderList();
            closeModal();
        } else {
            showModal('Alert', 'This item is already on the list!', '', false, null, true);
        }
    }
}

// Function to delete an item
function deleteItem(index) {
    showModal('Confirm Delete', 'Are you sure you want to delete this item?', '', false, () => {
        listArr.splice(index, 1);
        renderList();
    });
}

// Add event listeners
addItemButton.addEventListener('click', checkDuplicate);
itemInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        checkDuplicate();
    }
});
modalCancel.addEventListener('click', closeModal);

// Close modal when clicking outside of it
window.addEventListener('click', (event) => {
    if (event.target === modal) {
        closeModal();
    }
});

