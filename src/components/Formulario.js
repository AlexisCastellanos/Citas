import React, { useState } from "react";
import uuid from "uuid/dist/v4";
import PropTypes from "prop-types";

const Formulario = ({ crearCita }) => {
	const [cita, actualizarCita] = useState({
		mascota: "",
		propietario: "",
		fecha: "",
		name: "",
		sintomas: "",
		hora: "",
	});
	const [error, actualizarError] = useState(false);

	//Funcion que se ejecuta cada vez que el usuario escribe en un input
	const actualizarState = (e) => {
		// console.log(e.target.name);
		// console.log(e.target.value);
		actualizarCita({
			...cita,
			[e.target.name]: e.target.value,
		});
	};

	//Extraer los valores desctructuring
	const { mascota, propietario, fecha, hora, sintomas } = cita;

	//Cuando el usuario presiona agregar cita
	const submitCita = (e) => {
		e.preventDefault();
		console.log("Enviando");
		// alert("Enviando");

		//Validar
		if (
			mascota.trim() === "" ||
			propietario.trim() === "" ||
			fecha.trim() === "" ||
			hora.trim() === "" ||
			sintomas.trim() === ""
		) {
			console.log("Hay un error");
			actualizarError(true);
			return;
		}
		//Eliminar el mensaje previon
		actualizarError(false);

		//Asignar un ID
		cita.id = uuid();
		// console.log(cita);

		//Crear la cita que esta en App.js
		crearCita(cita);

		//Reiniciar el form
		actualizarCita({
			mascota: "",
			propietario: "",
			fecha: "",
			name: "",
			sintomas: "",
			hora: "",
		});
	};

	return (
		<React.Fragment>
			<h2>Crear Cita</h2>
			{error ? (
				<p className="alerta-error">Todos los campos son necesarios</p>
			) : null}
			<form onSubmit={submitCita}>
				<label>Nombre Mascota</label>
				<input
					type="text"
					name="mascota"
					className="u-full-width"
					placeholder="Nombre Mascota"
					onChange={actualizarState}
					value={mascota}
				/>
				<label>Nombre Dueno</label>
				<input
					type="text"
					name="propietario"
					className="u-full-width"
					placeholder="Nombre Dueno de la mascota"
					onChange={actualizarState}
					value={propietario}
				/>
				<label>Fecha</label>
				<input
					type="date"
					name="fecha"
					className="u-full-width"
					onChange={actualizarState}
					value={fecha}
				/>
				<label>Hora</label>
				<input
					type="time"
					name="hora"
					className="u-full-width"
					onChange={actualizarState}
					value={hora}
				/>
				<label>Sintomas</label>
				<textarea
					className="u-full-width"
					name="sintomas"
					onChange={actualizarState}
					value={sintomas}
				></textarea>
				<button type="submit" className="u-full-width  button-primary">
					Agregar Cita
				</button>
			</form>
		</React.Fragment>
	);
};

Formulario.propTypes = {
	crearCita: PropTypes.func.isRequired,
};

export default Formulario;
