var firebaseConfig = {
    apiKey: "AIzaSyB-XOV7b89KNZ6KGlO4P-LqOtQgW7bfmXA",
    authDomain: "tasker-1b557.firebaseapp.com",
    databaseURL: "https://tasker-1b557.firebaseio.com",
    projectId: "tasker-1b557",
    storageBucket: "tasker-1b557.appspot.com",
    messagingSenderId: "533305500258",
    appId: "1:533305500258:web:99a3d2a9f6792e9f60e73b",
    measurementId: "G-076EDE928H"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  var d = new Date();
  var t = d.getTime();
  var counter = t;

  var el = document.getElementById("form");
  if(el) { //тут потрібна перевірка, так як виникає помилка з 'addEventListener'
  el.addEventListener("submit",(e) => {
    var task = $("#task").val();
    var descriprion = $("#description").val();
    e.preventDefault(); //Якщо цей метод викликається, дія події за замовчуванням не буде запущена
    createTask(task, descriprion);
    form.reset(); //очищує поля
  });
}

function createTask(taskName, description) {
    counter += 1;
    var task={
        id: counter, 
        task: taskName,
        description: description 
    }

    let db = firebase.database().ref("tasks/"+counter);
    db.set(task);
    $("#cardSection").html('');
    readTask();
}

function readTask() { //зчитує дані з firebase
    var task = firebase.database().ref("tasks/");
    task.on("child_added", (data) => {
       var taskValue = data.val();
       console.log(taskValue);
       document.getElementById("cardSection").innerHTML += `
         <div class="card mb-3">
          <div class="card-body">
            <h5 class="card-title">${taskValue.task}</h5>
            <p class="card-text">${taskValue.description}</p>
            <button type="submit" style="color:white" class="btn btn-warning"
            onclick="updateTask(${taskValue.id}, '${taskValue.task}','${taskValue.description}')">Edit Task</button>
            <button type="submit" class="btn btn-danger"
            onclick="deleteTask(${taskValue.id})">Delete Task</button>
       </div>
       </div>
       `
    });
}

function reset() {

    $('#firstSection').html(`
    <form class="border p-4 mb-4" id="form">
                    <div class="form-group">
                        <label>Task</label>
                        <input type="text" class="form-control" id="task" placeholder="Enter task">
                    </div>
                    <div class="form-group">
                        <label>Description</label>
                        <input type="text" class="form-control"
                        id="description" placeholder="Description">
                    </div>

                    <button type="submit" id="button1"
                    class="btn btn-primary">Add task</button>
                    <button style="display: none" id="button2"
                    class="btn btn-success">Update task</button>
                    <button style="display: none" id="button3"
                    class="btn btn-danger">Cancel</button>
                </form>
    `);
    var el = document.getElementById("form");
  if(el) { //тут потрібна перевірка, так як виникає помилка з 'addEventListener'
  el.addEventListener("submit",(e) => {
    var task = $("#task").val();
    var descriprion = $("#description").val();
    e.preventDefault(); //Якщо цей метод викликається, дія події за замовчуванням не буде запущена
    createTask(task, descriprion);
    form.reset(); //очищує поля
  });
 }
}

function updateTask(id, name, description) {
    $('#firstSection').html(`
    <form class="border p-4 mb-4" id="form2">
                    <div class="form-group">
                        <label>Task</label>
                        <input type="text" class="form-control" id="task" placeholder="Enter task">
                    </div>
                    <div class="form-group">
                        <label>Description</label>
                        <input type="text" class="form-control"
                        id="description" placeholder="Description">
                    </div>

                    <button style="display: none" id="button1"
                    class="btn btn-primary">Add task</button>
                    <button type="submit" style="display: inline-block" id="button2"
                    class="btn btn-success">Update task</button>
                    <button style="display: inline-block" id="button3"
                    class="btn btn-danger">Cancel</button>
                </form>
    `);

  document.getElementById("form2").addEventListener("submit", (e) => {
      e.preventDefault(); 
    });

  document.getElementById("button3").addEventListener("click", (e) => {
    reset();
  });

  document.getElementById("button2").addEventListener("click", (e) => {
    updateTask2(id, document.getElementById("task").value,
    document.getElementById("description").value)
  });
  
  document.getElementById("task").value = name;
  document.getElementById("description").value = description;
}

function updateTask2(id, name, description) {
    var taskUpdated = {
        task: name,
        id: id,
        description: description
    }

    let db = firebase.database().ref("tasks/"+id);
    db.set(taskUpdated);

    document.getElementById("cardSection").innerHTML = ``;
    readTask();
    reset();

}

function deleteTask(id) {
    var task = firebase.database().ref("tasks/"+id);
    task.remove();
    reset();
    document.getElementById("cardSection").innerHTML = ``;
    readTask();
}