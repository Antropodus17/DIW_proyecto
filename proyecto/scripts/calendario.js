"use strict";

function createCalendar(ano, mes, dia) {
	let dias = new Date();
	dias.setFullYear(ano, mes);
	dias.setDate(0);
	let totalDays = dias.getDate();

	let tabla = document.createElement("table");
	let inicializateTr = (tipo, values = []) => {
		let tr = document.createElement("tr");
		for (let i = 0; i < 7; i++) {
			let celda = document.createElement(tipo);
			celda.innerText = values[i];
			tr.append(celda);
		}
		return tr;
	};
	let row = inicializateTr("th", ["L", "M", "X", "J", "V", "S", "D"]);
	rowClass(row);
	tabla.append(row);

	let semana = ["", "", "", "", "", "", ""];
	for (let index = 1; index <= totalDays; index++) {
		dias.setDate(index);
		if (dias.getDay() == 0) {
			semana[6] = `${index < 10 ? 0 : ""}${index}`;
			let row = inicializateTr("td", semana);
			rowClass(row, dia);
			tabla.append(row);
			semana = ["", "", "", "", "", "", ""];
		} else {
			semana[dias.getDay() - 1] = `${index < 10 ? 0 : ""}${index}`;
			// semana[dias.getDay() - 1] = index;
		}
	}
	if (semana[0] !== "") {
		let row = inicializateTr("td", semana);
		rowClass(row, dia);
		tabla.append(row);
	}
	// console.log(dias.getDay());
	// console.log(dias.getMonth());
	// console.log(dias.getDate());
	tabla.classList.add(
		"container",
		"border",
		"border-success",
		"border-2",
		"h-100"
	);
	return tabla;
}

// FUNCIONES PARA AÑADIR CLASES BOOTSTRAP

/**
 *
 * @param {HTMLTableRowElement} row
 */
function rowClass(row, dia) {
	row.classList.add("bg-secondary");
	[...row.children].forEach((c) => celdClass(c, dia));
}

/**
 *
 * @param {HTMLTableCellElement} celd
 */
function celdClass(celd, dia) {
	let listaClases = [
		"text-center",
		"h-75",
		"fs-5",
		"w-auto",
		"h-auto",
		"border",
		"border-2",
		"border-dark",
		"rounded-3",
	];
	if (celd.tagName.toLowerCase() === "th") {
		celd.classList.add(
			"text-center",
			"fs-3",
			"fw-bold",
			"bg-primary",
			"bg-gradient",
			"w-auto",
			"h-auto"
		);
	} else {
		if (+celd.textContent == dia) {
			celd.classList.add(...listaClases, "bg-success");
		} else {
			celd.classList.add(...listaClases, "bg-secondary");
		}
	}
}

function selectDay(td) {
	td.classList.add("bg-success");
}

let form = document.getElementById("formulario");
let calendar = document.getElementById("calendario");

form.firstElementChild.firstElementChild.nextElementSibling.addEventListener(
	"input",
	(evento) => {
		let date = evento.target.value.split("-");
		console.log(calendar.children.length);
		calendar.previousElementSibling.classList.remove("invisible");
		calendar.classList.remove("invisible");
		if (calendar.children.length) {
			console.log(calendar.children.item(0));
			calendar.removeChild(calendar.children.item(0));
		}
		calendar.append(createCalendar(...date));
	}
);
