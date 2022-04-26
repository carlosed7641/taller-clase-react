import React, { useState, useEffect } from 'react';
import { firebase } from '../firebase';
import { nanoid } from 'nanoid';


const Formulario = () => {


    const foto = 'https://picsum.photos/200/300';

    const objetoPersona = {
        imagen: foto,
        nombre: '',
        profesion: '',
        edad: '',
        sexo: '',
        telefono: '',
        
    }

    const [persona, setPersona] = useState(objetoPersona);
    const [lista, setLista] = useState([]);
    const [modoEdicion, setModoEdicion] = useState(false);
    const [id, setId] = useState('')
    const [error, setError] = useState(null);

    useEffect(() => {
        const obtenerDatos = async () => {
            try {

                const db = firebase.firestore()
                const data = await db.collection('personas').get()
                const array = data.docs.map(item => (
                    {
                        id: item.id, ...item.data()
                    }
                ))

                setLista(array)

            } catch (error) {
                console.log(error)
            }
        }

        obtenerDatos()
    })


    const guardarDatos = async (e) => {
        e.preventDefault()

        if (!persona.nombre) {
            setError('Campo nombre vacío');
            return
        }

        if (!persona.universidad) {
            setError('Campo universidad vacío');
            return
        }

        if (!persona.carrera) {
            setError('Campo carrera vacío');
            return
        }

        if (!persona.edad) {
            setError('Campo edad vacío');
            return
        }

        if (!persona.sexo) {
            setError('Campo sexo vacío');
            return
        }

        if (!persona.correo) {
            setError('Campo correo vacío');
            return
        }

        if (!persona.telefono) {
            setError('Campo teléfono vacío');
            return
        }

        try {

            const db = firebase.firestore();
            const nuevopersona = {
                ...persona,
            }

            await db.collection('personas').add(nuevopersona);

            setLista([...lista,
            { id: nanoid(), ...persona }
            ])

        } catch (error) {
            console.log(error)
        }

        setModoEdicion(false)
        setPersona(objetoPersona)
        setError(null)

    }

   








    return (
        <div className='container-xxl mt-5'>
            <h1 className='text-center'>TALLER CLASE REACT-FIREBASE</h1>
            <hr />
            <div className='row'>
                <div className="col-8">
                    <h4 className="text-center">Listado de usuarios - Total {lista.length}</h4>
                    {lista.length < 1 ?
                        <h2 className='mt-5 text-center'>No hay personas listados aún</h2>
                        :
                        <table className="table table-dark">
                            <thead>
                                <tr>
                                    <th scope="col">Imagen</th>
                                    <th scope="col">Nombre</th>
                                    <th scope="col">Profesión</th>
                                    <th scope="col">Edad</th>
                                    <th scope="col">Sexo</th>
                                    <th scope="col">Teléfono</th>
                                    <th scope="col">Acción</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    lista.map((item) => (
                                        <tr key={item.id}>
                                            <td><img className='' src={item.imagen} alt='imagen' /></td>
                                            <td>{item.nombre}</td>
                                            <td>{item.profesion}</td>
                                            <td>{item.edad}</td>
                                            <td>{item.sexo}</td>
                                            <td>{item.telefono}</td>
                                            <td>
                                                <button className='btn btn-danger btn-sm float-end mx-2'
                                                    onClick={() => confirmarEliminar(item.id)}>Eliminar
                                                </button>
                                                <button className='btn btn-warning btn-sm float-end'
                                                    onClick={() => auxEditar(item)}>Editar
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    }
                </div>
                <div className="col-4">
                    <h4 className="text-center">
                        {
                            modoEdicion ? 'Editar persona' : 'Agregar persona'
                        }</h4>
                    <form onSubmit={modoEdicion ? editar : guardarDatos}>
                        {
                            error ? <span className='text-danger'>{error}</span> : null
                        }
                        <input
                            className='form-control mb-2'
                            type="text"
                            placeholder='Ingrese Nombre'
                            onChange={(e) => setPersona({ ...persona, nombre: e.target.value })}
                            value={persona.nombre}

                        />
                        <input
                            className='form-control mb-2'
                            type="text"
                            placeholder='Ingrese Universidad'
                            onChange={(e) => setPersona({ ...persona, profesion: e.target.value })}
                            value={persona.profesion}
                        />
                        <input
                            className='form-control mb-2'
                            type="number"
                            min={0}
                            placeholder='Ingrese Carrera'
                            onChange={(e) => setPersona({ ...persona, edad: e.target.value })}
                            value={persona.edad}
                        />
                        <select
                            className='form-select mb-2'
                            onChange={(e) => setPersona({ ...persona, sexo: e.target.value })}
                        >
                            <option value={persona.sexo}>{persona.sexo}</option>

                            {
                                !persona.sexo

                                    ?
                                    <>
                                        <option value="Masculino">Masculino</option>
                                        <option value="Femenino">Femenino</option>
                                    </>
                                    :

                                    (persona.sexo === 'Masculino' ?

                                        <option value="Femenino">Femenino</option>

                                        :

                                        <option value="Masculino">Masculino</option>


                                    )

                            }
                        </select>
                        <input
                            className='form-control mb-2'
                            type="number"
                            min={0}
                            placeholder='Ingrese Teléfono'
                            onChange={(e) => setPersona({ ...persona, telefono: e.target.value })}
                            value={persona.telefono}
                        />

                        {
                            !modoEdicion ? (
                                <button className='btn btn-primary btn-block' type='submit'>Agregar</button>
                            )
                                :
                                (<>
                                    <button className='btn btn-warning btn-block' type='submit'>Editar</button>
                                    <button className='btn btn-dark btn-block mx-2' onClick={() => cancelar()}>Cancelar</button>
                                </>
                                )
                        }

                    </form>
                </div>
            </div>
        </div>
    );
}

export default Formulario;