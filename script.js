const form = document.getElementById('userForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const submitBtn = document.getElementById('submitBtn');
const tableBody = document.querySelector('#userTable tbody');

let users = [];
let editIndex = null;

// Validate email
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Enable/disable submit
function validateForm() {
  if (nameInput.value.trim() && isValidEmail(emailInput.value)) {
    submitBtn.disabled = false;
  } else {
    submitBtn.disabled = true;
  }
}

nameInput.addEventListener('input', validateForm);
emailInput.addEventListener('input', validateForm);

// Render table
function renderTable() {
  tableBody.innerHTML = '';

  users.forEach((user, index) => {
    const row = document.createElement('tr');

    row.innerHTML = `
      <td>${user.name}</td>
      <td>${user.email}</td>
      <td>
        <button onclick="editUser(${index})">Edit</button>
        <button onclick="deleteUser(${index})">Delete</button>
      </td>
    `;

    tableBody.appendChild(row);
  });
}

// Add / Update user
form.addEventListener('submit', function(e) {
  e.preventDefault();

  const user = {
    name: nameInput.value.trim(),
    email: emailInput.value.trim()
  };

  if (editIndex === null) {
    users.push(user);
  } else {
    users[editIndex] = user;
    editIndex = null;
    submitBtn.textContent = "Add User";
  }

  form.reset();
  submitBtn.disabled = true;
  renderTable();
});

// Edit user
function editUser(index) {
  const user = users[index];
  nameInput.value = user.name;
  emailInput.value = user.email;
  editIndex = index;
  submitBtn.textContent = "Update User";
  validateForm();
}

// Delete user
function deleteUser(index) {
  users.splice(index, 1);
  renderTable();
}
