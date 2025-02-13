"use strict";

function createCalendar(elemento, ano, mes) {
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

	tabla.append(inicializateTr("th", ["L", "M", "X", "J", "V", "S", "D"]));

	let semana = ["", "", "", "", "", "", ""];
	for (let index = 1; index <= totalDays; index++) {
		dias.setDate(index);
		if (dias.getDay() == 0) {
			semana[6] = `${index < 10 ? 0 : ""}${index}`;
			tabla.append(inicializateTr("td", semana));
			semana = ["", "", "", "", "", "", ""];
		} else {
			semana[dias.getDay() - 1] = `${index < 10 ? 0 : ""}${index}`;
			// semana[dias.getDay() - 1] = index;
		}
	}
	if (semana[0] !== "") {
		tabla.append(inicializateTr("td", semana));
	}
	console.log(dias.getDay());
	console.log(dias.getMonth());
	console.log(dias.getDate());
	return tabla;
}
