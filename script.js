const form = document.getElementById("userForm");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const submitBtn = document.getElementById("submitBtn");
const tableBody = document.querySelector("#userTable tbody");
const searchInput = document.getElementById("searchInput");
const userCount = document.getElementById("userCount");
const emptyState = document.getElementById("emptyState");
const toast = document.getElementById("toast");

let users = [];
let editIndex = null;

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validateForm() {
  submitBtn.disabled = !(
    nameInput.value.trim() && isValidEmail(emailInput.value)
  );
}

nameInput.addEventListener("input", validateForm);
emailInput.addEventListener("input", validateForm);

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 2000);
}

function updateUserCount() {
  userCount.textContent = `${users.length} User${users.length !== 1 ? "s" : ""}`;
}

function renderTable(filteredUsers = users) {
  tableBody.innerHTML = "";

  if (filteredUsers.length === 0) {
    emptyState.style.display = "block";
  } else {
    emptyState.style.display = "none";
  }

  filteredUsers.forEach((user, index) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>
        <div class="user-cell">
          <div class="avatar">${user.name.charAt(0).toUpperCase()}</div>
          ${user.name}
        </div>
      </td>
      <td>${user.email}</td>
      <td>
        <button class="action-btn edit-btn" onclick="editUser(${index})">Edit</button>
        <button class="action-btn delete-btn" onclick="deleteUser(${index})">Delete</button>
      </td>
    `;

    tableBody.appendChild(row);
  });

  updateUserCount();
}

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const user = {
    name: nameInput.value.trim(),
    email: emailInput.value.trim()
  };

  if (editIndex === null) {
    users.push(user);
    showToast("User added successfully");
  } else {
    users[editIndex] = user;
    editIndex = null;
    submitBtn.textContent = "Add User";
    showToast("User updated successfully");
  }

  form.reset();
  submitBtn.disabled = true;
  renderTable();
});

function editUser(index) {
  const user = users[index];
  nameInput.value = user.name;
  emailInput.value = user.email;
  editIndex = index;
  submitBtn.textContent = "Update User";
  validateForm();
}

function deleteUser(index) {
  const confirmDelete = confirm("Are you sure you want to delete this user?");
  if (!confirmDelete) return;

  users.splice(index, 1);
  renderTable();
  showToast("User deleted");
}

searchInput.addEventListener("input", function () {
  const searchValue = searchInput.value.toLowerCase();

  const filteredUsers = users.filter(
    user =>
      user.name.toLowerCase().includes(searchValue) ||
      user.email.toLowerCase().includes(searchValue)
  );

  renderTable(filteredUsers);
});

renderTable();