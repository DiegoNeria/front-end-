// Función para manejar el envío del formulario de creación o edición
document.getElementById("createUserForm").addEventListener("submit", function (e) {
    e.preventDefault(); // Evita que el formulario se envíe de la forma tradicional
  
    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;
    const email = document.getElementById("email").value;
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
  
    // Si el formulario está editando un usuario, se hace un PUT, sino un POST para crear uno nuevo
    if (this.dataset.editing) {
      console.log('Editando usuario:', this.dataset.userId); // Depuración
      updateUser(this.dataset.userId, firstName, lastName, email, username, password);
    } else {
      createUser(firstName, lastName, email, username, password);
    }
  });
  
  // Función para crear un nuevo usuario
  function createUser(firstName, lastName, email, username, password) {
    fetch("http://localhost:8000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        firstName,
        lastName,
        email,
        username,
        password,
        tenant_id: 1 // Ajusta según tu caso
      })
    })
      .then(response => response.json())
      .then(data => {
        alert("Usuario creado exitosamente!");
        loadUsers(); // Recargar la lista de usuarios
        document.getElementById("createUserForm").reset(); // Limpiar el formulario
      })
      .catch(error => console.error("Error al crear usuario:", error));
  }
  
  // Función para actualizar un usuario
 function updateUser(userId, firstName, lastName, email, username, password) {
    console.log('Datos a actualizar:', { firstName, lastName, email, username, password }); // Depuración
    fetch(`http://localhost:8000/users/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        firstName,
        lastName,
        email,
        username,
        password
      })
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Error al actualizar el usuario');
        }
        return response.json();
      })
      .then(data => {
        alert("Usuario actualizado exitosamente!");
        loadUsers(); // Recargar la lista de usuarios
        document.getElementById("createUserForm").reset(); // Limpiar el formulario
        delete document.getElementById("createUserForm").dataset.editing; // Eliminar el atributo de edición
      })
      .catch(error => console.error("Error al actualizar el usuario:", error));
  }
  
  // Función para cargar los usuarios desde la API
  function loadUsers() {
    fetch("http://localhost:8000/users")
      .then(response => response.json())
      .then(users => {
        const userList = document.getElementById("userList");
        userList.innerHTML = ""; // Limpiar la lista antes de agregar nuevos elementos
  
        users.forEach(user => {
          const li = document.createElement("li");
  
          // Mostrar información detallada del usuario
          li.innerHTML = `
            <strong>${user.firstName} ${user.lastName}</strong><br>
            <span>Email: ${user.email}</span><br>
            <span>Username: ${user.username}</span><br>
            
            <button class="delete" onclick="deleteUser(${user.id})">Eliminar</button>
          `;
  
          userList.appendChild(li);
        });
      })
      .catch(error => console.error("Error al cargar usuarios:", error));
  }
  
  // Función para editar un usuario
 // Función para editar un usuario
function editUser(userId) {
    fetch(`http://localhost:8000/users/${userId}`)
      .then(response => response.json())
      .then(user => {
        // Llenar el formulario con los datos del usuario a editar
        document.getElementById("firstName").value = user.firstName;
        document.getElementById("lastName").value = user.lastName;
        document.getElementById("email").value = user.email;
        document.getElementById("username").value = user.username;
        document.getElementById("password").value = user.password;
  
        // Cambiar la acción del formulario a "editar" (deberás hacer un PUT después)
        const createUserForm = document.getElementById("createUserForm");
        createUserForm.dataset.editing = true; // Indicar que estamos en modo edición
        createUserForm.dataset.userId = user.id; // Guardar el ID del usuario para usarlo en el PUT
      })
      .catch(error => console.error("Error al cargar el usuario:", error));
  }
  
  
  // Función para eliminar un usuario
  function deleteUser(userId) {
    fetch(`http://localhost:8000/users/${userId}`, {
      method: "DELETE"
    })
      .then(response => response.json())
      .then(data => {
        alert("Usuario eliminado exitosamente!");
        loadUsers();  // Recargar la lista de usuarios
      })
      .catch(error => console.error("Error al eliminar el usuario:", error));
  }
  
  // Llamada inicial para cargar los usuarios al cargar la página
  loadUsers();
  