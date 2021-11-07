import cnn from '../databases/connection.js'

let datos = ''

export const mostrarmunicipios =  (req, res) => {
    datos = 'select * from municipios;'
    cnn.query(datos, (err, results) => {
        if (err) {
            console.log(err)
            return res.send("Error") 
        } 
        res.render('municipio', {"municipios": results})
    })

    
}
export const munid =  (req, res) => {
    console.log("hhh")
    datos = 'select * from municipios;'
    cnn.query(datos, (err, results) => {
        if (err) {
            console.log(err)
            return res.send("Error") 
        } 
        datos = 'select * from municipios where id = ?;'
        cnn.query(datos, [req.params.cid],(err, municip)=>{
            if (err) {
                console.log(err)
                return res.send("Error") 
            }
            console.log("zzz") 
            res.render('municipio', {"municipios": results, "municipio": municip})
            
        } )

        
    })

    
}

export const ingresomunicipios = (req, res) => {
    const {municipio, abreviatura, departamento} = req.body
    datos = 'insert into municipios (municipio, abreviatura, departamento) values (?, ?, ?)'
    cnn.query(datos, [municipio, abreviatura, departamento], (err) => {
        if (err) throw err
        res.redirect('/municipio')
    })
}

export const actualizarmunicipio = (req, res) => {
    const {municipio, abreviatura, departamento} = req.body
    datos = 'update municipios set municipio = ?, abreviatura = ?, departamento = ? where id = ?'
    cnn.query(datos, [municipio, abreviatura, departamento, req.params.cid], err => {
        if (err) throw err;
        res.redirect('/municipio')
    })

}


export const borrarmunicipio = (req, res) => {
    datos = 'delete from municipios where id = ?'
    cnn.query(datos, [req.params.cid], (err) => {
        if (err) throw err
        res.redirect('/municipio')
    })

}
