fetch(
  "https://gist.githubusercontent.com/josejbocanegra/9a28c356416badb8f9173daf36d1460b/raw/5ea84b9d43ff494fcbf5c5186544a18b42812f09/restaurant.json"
)
  .then((response) => response.json())
  .then((data) => {
    let dict = {};
    let cantidad = 0;

    const keys = Object.keys(data);
    for (let i = 0; i < Object.keys(data).length; i++) {
      const card = document.getElementById(i);

      card.addEventListener("click", function (event) {
        event.preventDefault();
        cards(i);
      });
    }
    const carro = document.getElementById("imagenCarro");
    carro.addEventListener("click", function (event) {
      event.preventDefault();
      cargarOrden();
    });

    function cards(index) {
      const titulo = document.createElement("h2");
      let lugar = document.getElementById("tituloCat");
      lugar.innerHTML = "";
      titulo.innerText = data[index].name;
      lugar.appendChild(document.createElement("hr"));
      lugar.appendChild(titulo);
      lugar.appendChild(document.createElement("hr"));

      let row = document.createElement("div");
      row.className = "row";

      lugar.appendChild(row);

      for (let j = 0; j < data[index].products.length; j++) {
        /*
                let col = document.createElement("div");
                col.className = "col";
                lugar.appendChild(col);
                */

        let card = document.createElement("div");
        card.className = "card";
        card.id = "cardsCat";
        card.style = "width: 18rem";

        let imagen = document.createElement("img");
        imagen.className = "card-img-top";
        imagen.alt = "Card image cap";
        imagen.src = data[index].products[j].image;
        imagen.id = "imagenesCat";

        let cardBody = document.createElement("div");
        cardBody.className = "card-body";

        let nombreH = document.createElement("h5");
        nombreH.className = "card-tittle";
        nombreH.innerText = data[index].products[j].name;

        let descripcion = document.createElement("p");
        descripcion.className = "card-text";
        descripcion.innerText =
          "lLorem ipsum dolor sit, amet consectetur adipisicing elit. Quod nobis quibusdam modi blanditiis ex iure culpa, similique, quo sapiente sit doloremque consectetur recusandae impedit suscipit molestias dolor temporibus natus odit?";

        let precio = document.createElement("p");
        precio.style.fontWeight = "bold";
        precio.innerText = data[index].products[j].price;

        let button = document.createElement("a");
        button.className = "btn btn-primary";
        button.innerText = "Add to car";
        button.id = "buttonC";
        button.addEventListener("click", function (event) {
          event.preventDefault();
          if (!(data[index].products[j].name in dict)) {
            dict[data[index].products[j].name] = {
              c: 1,
              p: data[index].products[j].price,
            };
            cantidad++;
          } else {
            dict[data[index].products[j].name]["c"] =
              dict[data[index].products[j].name]["c"] + 1;
            cantidad++;
          }

          actualizarItems(cantidad);
        });

        cardBody.appendChild(nombreH);
        cardBody.appendChild(descripcion);
        cardBody.appendChild(precio);
        cardBody.appendChild(button);
        card.appendChild(imagen);
        card.appendChild(cardBody);
        lugar.appendChild(card);
      }
    }

    function actualizarItems(n) {
      let texto = document.getElementById("numeroItems");
      texto.innerHTML = n;
    }
    function imprimirOrden() {
      let order = {};
      let llaves = Object.keys(dict);
      for (let i = 0; i < Object.keys(dict).length; i++) {
        order[i] = { item: 0, quantity: 0, description: "", unitPrice: 0 };
        order[i]["item"] = i + 1;
        order[i]["quantity"] = dict[llaves[i]]["c"];
        order[i]["description"] = llaves[i];
        order[i]["unitPrice"] = dict[llaves[i]]["p"];
      }
      console.log(order);
    }

    function cargarOrden() {
      let lugar = document.getElementById("tituloCat");
      lugar.innerHTML = "";

      let titulo = document.createElement("h2");
      titulo.innerText = "Order detail";

      lugar.appendChild(document.createElement("hr"));
      lugar.appendChild(titulo);
      lugar.appendChild(document.createElement("hr"));

      let tabla = document.createElement("table");
      tabla.className = "table table-striped";

      let tableHead = document.createElement("thead");
      let tr = document.createElement("tr");

      let t1 = document.createElement("th");
      t1.scope = "col";
      t1.innerText = "Item";

      let t2 = document.createElement("th");
      t2.scope = "col";
      t2.innerText = "Qty.";

      let t3 = document.createElement("th");
      t3.scope = "col";
      t3.innerText = "Descrition";

      let t4 = document.createElement("th");
      t4.scope = "col";
      t4.innerText = "Unit price";

      let t5 = document.createElement("th");
      t5.scope = "col";
      t5.innerText = "Amount";

      let t6 = document.createElement("th");
      t6.scope = "col";
      t6.innerText = "Modify";

      tr.appendChild(t1);
      tr.appendChild(t2);
      tr.appendChild(t3);
      tr.appendChild(t4);
      tr.appendChild(t5);
      tr.appendChild(t6);

      tableHead.appendChild(tr);

      tabla.appendChild(tableHead);

      let tBody = document.createElement("tbody");
      let llaves = Object.keys(dict);
      let totalPrice = 0;
      for (let i = 0; i < Object.keys(dict).length; i++) {
        let tr1 = document.createElement("tr");

        let th = document.createElement("th");
        th.scope = "row";
        th.innerText = i + 1;

        let td2 = document.createElement("td");
        td2.innerText = dict[llaves[i]]["c"];

        let td3 = document.createElement("td");
        td3.innerText = llaves[i];

        let td4 = document.createElement("td");
        td4.innerText = dict[llaves[i]]["p"];

        let td5 = document.createElement("td");
        td5.innerText = (dict[llaves[i]]["p"] * dict[llaves[i]]["c"]).toFixed(
          2
        );
        totalPrice += dict[llaves[i]]["p"] * dict[llaves[i]]["c"];

        let td6 = document.createElement("td");
        let plus = document.createElement("a");
        plus.className = "btn btn-dark active";
        plus.innerText = "+";
        //plus.style = "margin:2px";
        plus.addEventListener("click", function (event) {
          event.preventDefault();
          dict[llaves[i]]["c"] = dict[llaves[i]]["c"] + 1;
          cantidad++;
          actualizarItems(cantidad);
          cargarOrden();
        });

        let less = document.createElement("a");
        less.className = "btn btn-dark active";
        less.innerText = "-";
        // less.style = "margin:2px";
        less.addEventListener("click", function (event) {
          event.preventDefault();
          dict[llaves[i]]["c"] = dict[llaves[i]]["c"] - 1;
          cantidad--;
          actualizarItems(cantidad);
          cargarOrden();
        });

        td6.appendChild(plus);
        td6.appendChild(less);

        tr1.appendChild(th);
        tr1.appendChild(td2);
        tr1.appendChild(td3);
        tr1.appendChild(td4);
        tr1.appendChild(td5);
        tr1.appendChild(td6);
        tBody.appendChild(tr1);
      }

      tabla.appendChild(tBody);
      lugar.appendChild(tabla);

      let ultimo = document.createElement("div");
      ultimo.className = "container";

      let fila = document.createElement("div");
      fila.className = "row";

      let total = document.createElement("div");
      total.className = "col";
      total.innerText = "Total: $" + totalPrice.toFixed(2);
      total.style.textAlign = "left";
      total.style.fontWeight = "bold";

      let botones = document.createElement("div");
      botones.className = "col";
      botones.style.textAlign = "right";

      let cancel = document.createElement("button");
      cancel.className = "btn btn-danger";
      cancel.innerText = "Cancel";
      cancel.setAttribute("data-toggle", "modal");
      cancel.setAttribute("data-target", "#mensajeConfirm");

      let confirm = document.createElement("a");
      confirm.className = "btn btn-light";
      confirm.innerText = "Confirm order";

      confirm.addEventListener("click", function (event) {
        event.preventDefault();
        imprimirOrden();
        dict = {};
        actualizarItems(0);
        cargarOrden();
      });

      // cancel.dataset.dataset.toggle = "modal";
      //cancel.dataset.target ="#mensajeConfirm"

      botones.appendChild(cancel);
      botones.appendChild(confirm);

      fila.appendChild(total);
      fila.appendChild(botones);

      ultimo.appendChild(fila);
      lugar.appendChild(ultimo);
    }
  });
