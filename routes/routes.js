import express from 'express'
import { ingresoclientes, borrarcliente, combobox,mostrarclientes, actualizarClientes } from '../controllers/authControllerCliente.js'
import { ingresomunicipios,borrarmunicipio, mostrarmunicipios, actualizarmunicipio, munid } from '../controllers/authcontrollerMunicipio.js'
const router = express.Router()

//Rutas de clientes
router.get('', mostrarclientes )


router.post('', ingresoclientes)


router.get('/actualizar/:cid', combobox)


router.post('/actualizar/:cid', actualizarClientes)


router.get('/borrar/:cid', borrarcliente)
//Rutas de municipios

router.get('/municipio', mostrarmunicipios )


router.post('/municipio', ingresomunicipios)


router.get('/municipio/actualizar/:cid', munid)

router.post('/municipio/actualizar/:cid', actualizarmunicipio)


router.get('/municipio/borrar/:cid', borrarmunicipio)
export default router