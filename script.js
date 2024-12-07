const container = document.getElementById("container");

function handleSubmit() {
    let msg = document.getElementById("msg_ref");
    let name = document.getElementById("name").value.trim();
    let profession = document.getElementById("profession").value.trim();
    let age = document.getElementById("age").value.trim();
    let result = [];
    let id = "id" + Math.random().toString(16).slice(2);

    // Validation
    if (!name || !profession || !age || isNaN(age) || age <= 0) {
        msg.innerHTML = '<span class="msg_error">Error: Please fill all fields with valid data before adding an employee.</span>';
        return;
    }

    // Success Message
    msg.innerHTML = '<span class="msg_success">Success: Employee Added.</span>';

    let localData = JSON.parse(localStorage.getItem("data"));
    result.push({ _id: id, name: name, profession: profession, age: parseInt(age) });

    if (localData) {
        localStorage.setItem("data", JSON.stringify([...localData, ...result]));
    } else {
        localStorage.setItem("data", JSON.stringify(result));
    }

    createElement();
    clearForm();
}

function handleDelete(id) {
    let resultData = JSON.parse(localStorage.getItem("data"));
    let updatedData = resultData.filter(employee => employee._id !== id);
    localStorage.setItem("data", JSON.stringify(updatedData));
    createElement();
}

function createElement() {
    let resultData = JSON.parse(localStorage.getItem("data"));
    if (resultData && resultData.length > 0) {
        container.innerHTML = resultData.map(employee => `
            <div class="list_box">
                <div class="paraContainer">
                    <p>${employee.name}</p>
                    <p>${employee.profession}</p>
                    <p>${employee.age}</p>
                </div>
                <button onclick="handleDelete('${employee._id}')">Delete</button>
            </div>`).join('');
    } else {
        container.innerHTML = '<div class="data_not_found">Data not found</div>';
    }
}

function clearForm() {
    document.getElementById("name").value = "";
    document.getElementById("profession").value = "";
    document.getElementById("age").value = "";
}

createElement();
