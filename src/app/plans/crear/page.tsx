"use client";
//fin xd

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createPlan } from "@/services/plans";
import { getSession } from "@/services/session";

export default function CrearPlanPage() {
    //esto pa poder redireccionar 
  const router = useRouter();

    //Estados para guardar el nombre, la foto, la direccion, el precio estimado, la duracion, la descripcion y las recomendaciones
    const [nombre, setNombre] = useState("");
    const [foto, setFoto] = useState("");
    const [direccion, setDireccion] = useState("");
    const [precioEstimado, setPrecioEstimado] = useState("");
    const [duracion, setDuracion] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [recomendaciones, setRecomendaciones] = useState("");

    //Estados para manejar esos errores con las condiciones q dice el examen
    const [errorNombre, setErrorNombre] = useState(false);
    const [errorDireccion, setErrorDireccion] = useState(false);
    const [errorPrecioEstimado, setErrorPrecioEstimado] = useState(false);
    const [errorDuracion, setErrorDuracion] = useState(false);
    const [errorDescripcion, setErrorDescripcion] = useState(false);
    //creo q me va a tocar hacer la foto obligatoria
    const [errorFoto, setErrorFoto] = useState(false);

    //Una funcion para validar
    function validarNombre(valor: string) {
    const longitud = valor.length;
    //El nombre debe tener entre 2 y 50 caracteres
    const longitudValida = longitud >= 3 && longitud <= 50;

    setErrorNombre(!longitudValida); //aqui dara true si el nombre no cumple con la longitud requerida
    return longitudValida;
  }

  //La direccion es obligatoria 
    function validarDireccion(valor: string) {
        const longitud = valor.length;
        const direccionValida = longitud > 0;

        setErrorDireccion(!direccionValida); //aqui dara true si la direccion esta vacia
        return direccionValida;
    }

  //Otra pa validar el precio que sea mayor a 0
    function validarPrecioEstimado(valor: string) {
        const precio = parseFloat(valor);
        const precioValido = precio > 0;

        setErrorPrecioEstimado(!precioValido); //aqui dara true si el precio no es mayor a 0
        return precioValido;
    }

    //Duracion debe ser un numero entero
    function validarDuracion(valor: string) {
        const duracionNum = parseInt(valor, 10);
        const duracionValida = Number.isInteger(duracionNum) && duracionNum > 0;

        setErrorDuracion(!duracionValida); //aqui dara true si la duracion no es un numero entero mayor a 0
        return duracionValida;
    }

    //La descripcion al menos 600 caracteres
    function validarDescripcion(valor: string) {
        const longitud = valor.length;
        const descripcionValida = longitud >= 600;

        setErrorDescripcion(!descripcionValida); //aqui dara true si la descripcion tiene menos de 600 caracteres
        return descripcionValida;
    }

    //La foto es obligatoria
    function validarFoto(valor: string) {
      const fotoValida = valor.trim().length > 0;

        setErrorFoto(!fotoValida); //aqui dara true si la foto esta vacia
        return fotoValida;
    }

    //Crear eso pero validando q todo bien
    //Toca async por el createPlan que es una llamada a la API y eso es async F
    async function crearPlan() {  
        //Aqui se valida todas esas condiciones
        const nombreValido = validarNombre(nombre);
        const direccionValida = validarDireccion(direccion);
        const precioEstimadoValido = validarPrecioEstimado(precioEstimado);
        const duracionValida = validarDuracion(duracion);
        const descripcionValida = validarDescripcion(descripcion);
        const fotoValida = validarFoto(foto);

        if (nombreValido && direccionValida && precioEstimadoValido && duracionValida && descripcionValida && fotoValida) {
        const session = getSession();  //pa tomar el id del usuario

        if (!session.id) {
          alert("Debes iniciar sesion para crear un plan."); //F xq no habia id
          return;
        }

        const fotoPlan = foto.trim(); //esto elimina los espacios en blanco al inicio y al final del enlace de la foto por si las moscas

        if (fotoPlan === "") {
          alert("Pon un link de foto.");
          return;
        }

        try {
          await createPlan({
            name: nombre,
            description: descripcion,
            estimatedPrice: Number(precioEstimado),
            estimatedTime: Number(duracion),
            recomendations: recomendaciones,
            address: direccion,
            image: fotoPlan,
            userId: session.id,
          });

          router.push("/plans");
        } catch (error) {
          alert(error instanceof Error ? error.message : "No se pudo crear el plan.");
          console.log(error);
        }
        } else {
            // Todo mal
            alert("Por favor, corrige los errores en el formulario.");
        }
    }

  return (
    <div className="flex-1 bg-slate-50 px-24 py-16">
      <div className="max-w-2xl rounded-xl bg-white p-8 shadow-sm">
        <h1 className="text-4xl font-bold text-slate-900">Crear un nuevo plan</h1>
        <p className="mt-3 text-slate-600">Organiza, invita a tus amigos o abre plazas para que otros miembros se sumen a vivir momentos únicos.</p>

        <label  className="mt-8 block text-sm font-medium text-slate-700">
            Foto de portada del plan
        </label>
        <input
          className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none focus:border-slate-500"
          type="url"
          placeholder="Link de la foto"
          value={foto}
          onChange={(e) => setFoto(e.target.value)}
          onBlur={(e) => validarFoto(e.target.value)}
        />
        {errorFoto && <p style={{ color: "red" }}>La foto debe ser un link que empiece por http:// o https://.</p>}

        <label className="mt-8 block text-sm font-medium text-slate-700">Nombre *</label>
        <input
          className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none focus:border-slate-500"
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          onBlur={(e) => validarNombre(e.target.value)}
        />
        {errorNombre && <p style={{ color: "red" }}>El nombre debe tener entre 3 y 50 caracteres.</p>}

        <label className="mt-8 block text-sm font-medium text-slate-700">
          Dirección *
      </label>
      <input
        className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none focus:border-slate-500"
        type="text"
        value={direccion}
        onChange={(e) => setDireccion(e.target.value)}
        onBlur={(e) => validarDireccion(e.target.value)}
      />
      {errorDireccion && <p style={{ color: "red" }}>La dirección es obligatoria.</p>}

      <label className="mt-8 block text-sm font-medium text-slate-700">
        Precio estimado *
      </label>
      <input
        className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none focus:border-slate-500"
        type="number"
        value={precioEstimado}
        onChange={(e) => setPrecioEstimado(e.target.value)}
        onBlur={(e) => validarPrecioEstimado(e.target.value)}
      />
      {errorPrecioEstimado && <p style={{ color: "red" }}>El precio estimado debe ser mayor a 0.</p>}

      <label className="mt-8 block text-sm font-medium text-slate-700">
        Duración (minutos) *
      </label>
      <input
        className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none focus:border-slate-500"
        type="number"
        value={duracion}
        onChange={(e) => setDuracion(e.target.value)}
        onBlur={(e) => validarDuracion(e.target.value)}
      />
      {errorDuracion && <p style={{ color: "red" }}>La duración debe ser un número entero mayor a 0.</p>}

      <label className="mt-8 block text-sm font-medium text-slate-700">
        Descripción del plan *
      </label>
      <textarea
        className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none focus:border-slate-500"
        value={descripcion}
        onChange={(e) => setDescripcion(e.target.value)}
        onBlur={(e) => validarDescripcion(e.target.value)}
      />
      {errorDescripcion && <p style={{ color: "red" }}>La descripción debe tener al menos 600 caracteres.</p>}

      <label className="mt-8 block text-sm font-medium text-slate-700">
        Recomendaciones para los asistentes
      </label>
      <textarea
        className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none focus:border-slate-500"
        value={recomendaciones}
        onChange={(e) => setRecomendaciones(e.target.value)}
      />

    {/*Boton de cancelar y boton de Publicar plan*/}
      <div className="mt-8 flex justify-between">
        <button
          type="button"
          className="rounded-lg bg-red-500 px-4 py-2 text-white hover:bg-red-600"
          onClick={() => router.push("/plans")}
        >
          Cancelar
        </button>
        <button
          type="button"
          className="rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
          onClick={crearPlan}
        >
          Publicar plan
        </button>
      </div>


      </div>

      
    </div>
  );
}