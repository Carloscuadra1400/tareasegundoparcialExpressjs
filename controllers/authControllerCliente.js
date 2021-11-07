
import cnn from '../databases/connection.js'

let datos = ''

export const mostrarclientes =  (req, res) => {
    datos = ` 
        select c.id as idcliente, c.nombre, c.apellido, c.telefono, c.email, m.id as idMunicipio, m.municipio as municipio
        from clientes  c 
        inner join municipios m on c.municipioID = m.id;

    `
    cnn.query(datos, (err, results) => {
        if (err) {
            console.log(err)
            return res.send("Error") 
        }
        console.log(results)
        res.render('clientes', {"tableclientes": results})
    })

    
}

export const ingresoclientes = (req, res) => {
    const {nombre, apellido, telefono, email, idMunicipio} = req.body
    datos = 'insert into clientes (nombre, apellido, telefono, email, municipioID) values (?, ?, ?, ?, ?)'
    cnn.query(datos, [nombre, apellido, telefono, email, idMunicipio], (err) => {
        if (err) throw err
        console.log("hola")
        res.redirect('/')
    })
}

export const combobox = (req, res) => {
    datos = 'select c.id as idCliente, c.nombre, c.apellido, c.telefono, c.email, m.id as idMunicipio, m.municipio as Municipio  from clientes  c inner join municipios m on c.municipioID = m.id where c.id = ?;'
    cnn.query(datos, [req.params.cid], (err, clientesId) => {
        if (err) return res.send("Error")
        
        datos = 'select c.id as idCliente, c.nombre, c.apellido, c.telefono, c.email, m.id as idMunicipio, m.municipio as Municipio  from clientes  c inner join municipios m on c.municipioID = m.id;'
        cnn.query(datos, (err, clientes) => {
            if (err) return res.send("Error")
            console.log(clientes)
            res.render('clientes', {"tableclientes": clientes, "cliente":clientesId})
        })
    })

}

export const actualizarClientes = (req, res) => {
    const {nombre, apellido, telefono, email, idMunicipio} = req.body
    datos = 'update clientes set nombre = ?, apellido = ?, telefono = ?, email = ?, municipioID = ? where id = ?'
    cnn.query(datos, [nombre, apellido, telefono, email, idMunicipio, req.params.cid], err => {
        if (err) throw err;
        res.redirect('/')
    })

}

export const borrarcliente = (req, res) => {
    datos = 'delete from clientes where id = ?'
    cnn.query(datos, [req.params.cid], (err) => {
        if (err) throw err
        res.redirect('/')
    })

}
