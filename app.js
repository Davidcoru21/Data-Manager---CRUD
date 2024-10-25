// Variables
const form = document.getElementById('data-form');
const dataName = document.getElementById('data-name');
const dataTitle = document.getElementById('data-title');
const dataStatus = document.getElementById('data-status');
const dataRole = document.getElementById('data-role');
const tableBody = document.querySelector('tbody');

// Función para obtener los datos desde localStorage
function getData() {
    const data = localStorage.getItem('data');
    return data ? JSON.parse(data) : [];
}

// Función para renderizar la tabla de datos
function renderData() {
    const data = getData();
    tableBody.innerHTML = '';
    data.forEach((item, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.name}</td>
            <td>${item.title}</td>
            <td>${item.status}</td>
            <td>${item.role}</td>
            <td>
                <button onclick="editData(${index})">Editar</button>
                <button onclick="deleteData(${index})">Borrar</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

// Función para añadir un nuevo dato
function addData(name, title, status, role) {
    const data = getData();
    data.push({ name, title, status, role });
    localStorage.setItem('data', JSON.stringify(data));
    renderData();
}

// Función para eliminar un dato
function deleteData(index) {
    const data = getData();
    data.splice(index, 1);
    localStorage.setItem('data', JSON.stringify(data));
    renderData();
}

// Función para editar un dato
function editData(index) {
    const data = getData();
    const newName = prompt('Edit Name', data[index].name);
    const newTitle = prompt('Edit Title', data[index].title);
    const newStatus = prompt('Edit Status', data[index].status);
    const newRole = prompt('Edit Role', data[index].role);
    
    if (newName !== null && newTitle !== null && newStatus !== null && newRole !== null) {
        data[index] = { name: newName, title: newTitle, status: newStatus, role: newRole };
        localStorage.setItem('data', JSON.stringify(data));
        renderData();
    }
}

// Evento al enviar el formulario
form.addEventListener('submit', (e) => {
    e.preventDefault();
    addData(dataName.value, dataTitle.value, dataStatus.value, dataRole.value);
    form.reset();
});

// Renderizamos los datos al cargar la página
window.onload = renderData;
