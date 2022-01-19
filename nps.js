//eleman ekleme
const forms = document.querySelector("form");
const input = document.querySelector("#txtTaskName");
const btnDeleteAll = document.querySelector("#btnDeleteAll");
const taskList =
  document.querySelector("#task-list"); /* ul nin id sini tanımladık burda*/
let items;

//itemlerı yükle
loadItems();
//kaydettiğimiz bütün event listenersları bu method aracılığıyla çağırıyoruz
eventListeners();
function eventListeners() {
  //submit event'imizi burada kayıt ettik
  forms.addEventListener(
    "submit",
    addNewItem
  ); /* form submit olduğunda ilk başta addNewItem adında bir fonksiyon olsun.*/
  //item silme
  taskList.addEventListener(
    "click",
    deleteItem
  ); /* listeye tıklandığı zaman gelip burdan deleteItem isimli fonksiyonu çağırabiliriz*/
  //deleteall ile bütün elemanları silme
  btnDeleteAll.addEventListener("click", deleteAllItems);
}

function loadItems() {
  items = getItemsFromLS();
  items.forEach(function (item) {
    createItem(item);
  });
}
//local storage ten item ögelerini alma
function getItemsFromLS() {
  if (localStorage.getItem("items") === null) {
    items = [];
  } else {
    items = JSON.parse(localStorage.getItem("items"));
  }
  return items;
}
//LS deki itemi silme fonksiyonu
function deleteItemFromLS(text) {
  items = getItemsFromLS();
  items.forEach(function (item, index) {
    if (item === text) {
      items.splice(
        index,
        1
      ); /* kaç tane eleman silmek istiyorsak buraya bildiriyoruz*/
    }
  });
  localStorage.setItem(
    "items",
    JSON.stringify(items)
  ); /* kaydederken bu fonk kullanıyoruz*/
}

//local storage 'te bir item oluşturalım
function setItemToLS(text) {
  items = getItemsFromLS();
  items.push(text);
  localStorage.setItem("items", JSON.stringify(items));
}
function createItem(text) {
  const li =
    document.createElement(
      "li"
    ); /* eğer kullanıcı bir değer girmişse ul nesnesi içerisnde li etiketi içindeki bilgileri eklememiz gerekiyor.*/
  li.appendChild(
    document.createTextNode(text)
  ); /* textini ekleyelim yani input value yane yazdıysan onu listeye ekleyecektir*/
  li.className = "list-group-item list-group-item-secondary";
  // a etiketini yaratma
  const a = document.createElement("a");
  a.className = "delete-item float-right";
  a.setAttribute("href", "#"); /* href kısmına # ekliyoruz*/
  a.innerHTML = '<i class="fas fa-times"></i>';
  /*içteki etiketini ekliyoruz*/
  /* li ve a elemanlarını ilişkilendirmemiz gerekiyor şimdi*/
  li.appendChild(a); /* böyle yapınca li elemanı içine a elemanı geliyor*/
  /* ul nin içine li yi ekleyelim*/
  taskList.appendChild(li);
}
// eleman ekleme işini ise aşağıdaki fonksiyon içerisine yazdık
function addNewItem(e) {
  //   console.log(
  //     input.value
  //   ); /* bu kod sayesinde kutucuğa istediğinizi yazdıktan sonra konsol kısmında yazdığınız şeyi görebilirsiniz*/
  if (input.value == "") {
    alert(
      "add new item"
    ); /* eğer ilk başta boşsa değer bize(kullanıcıya) bir uyarı verecektir*/
  }
  //item yaratma
  createItem(input.value);

  //LS 'ye kaydetme
  setItemToLS(input.value);

  //inputu temizleme
  input.value = " ";
  e.preventDefault();
}
//item silme
//deleteItem 'ı fonksiyon şeklinde oluşturalım
function deleteItem(e) {
  //silmed işlemine bastıktan sonra emin misiniz diye soruyor
  /*console.log(
    e.target
  ); */
  /* böyle yaparasak elemanaulaşmış oluruz çarpıya basarsak çarpı elemanına tıklamış oluyoruz*/
  if (e.target.className === "fas fa-times") {
    //   /*tıkladığımız elemanın gerçekten ikon olup olmadığını kontrol edelim*/ console.log(
    //     e.target
    //   );
    // }
    if (confirm("are you sure?")) {
      e.target.parentElement.parentElement.remove();

      // LS deki itemları silme refresh edince
      deleteItemFromLS(e.target.parentElement.parentElement.textContent); // senin eklediğin elemanı kapsıyor.
    } // li etiketine getirip remove dersek o elemanı silebilirz
  }
  e.preventDefault(); /*scroll bar yerinden oynasın diye bu kodu yazdık.*/
}
//deleteAllitems'ın fonksiyonunu yazma
function deleteAllItems() {
  // taskList.innerHTML = "";
  if (confirm("are you sure?")) {
    //silmed işlemine bastıktan sonra emin misiniz diye soruyor
    while (taskList.firstChild) {
      taskList.removeChild(taskList.firstChild);
    }
    localStorage.clear();
  }
  e.preventDefault();
}
