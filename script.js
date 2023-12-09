// 1. get data from the form and store in global variabl
let taskList = [];
const entryListElm = document.getElementById("entryList");
const handleOnSubmit = (form) => {
  //   console.log("you have submited the fomr", form);
  //   const task = document.getElementById("task").value;
  //   const hr = document.getElementById("hr").value;

  const newForm = new FormData(form);
  const task = newForm.get("task");
  const hr = newForm.get("hr");

  const obj = {
    task,
    hr,
    type: "entry",
    id: randomIdGenerator(),
  };
  taskList.push(obj);
  display();
};

//2. reate table row with data and display in the UI

const display = () => {
  console.log(taskList);
  let str = "";
  const entryList = taskList.filter((item) => item.type === "entry");

  entryList.forEach((item, i) => {
    str += `
 <tr>
 <td>${i + 1}</td>
 <td>${item.task}</td>
 <td>${item.hr}hr</td>
 <td class="text-end">
   <button  class="btn btn-danger btn-sm">
     <i class="fa-solid fa-trash"></i>
   </button>
   <button
   onclick="switchTask('${item.id}', 'bad')"
   class="btn btn-success btn-sm">
     <i class="fa-solid fa-arrow-right"></i>
   </button>
 </td>
</tr>`;
  });

  entryListElm.innerHTML = str;
};

const randomIdGenerator = () => {
  // we will have 6 charactor long id which is uniques per transaction
  const idLength = 6;
  const strCollection =
    "qwertyuioplkjhgfdsazxcvbnmQWERTYUIOPLKJHGFDSAZXCVBNM0987654321";

  let id = "";
  for (let i = 0; i < idLength; i++) {
    const randomNumber = Math.round(Math.random() * (strCollection.length - 1));

    id += strCollection[randomNumber];
  }
  return id;
};

const switchTask = (id, type) => {
  console.log(id, type);

  taskList = taskList.map((item) => {
    if (item.id === id) {
      item.type = type;
    }

    return item;
  });

  display();
};
