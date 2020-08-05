function Vehiculos(lista) {
  this.lista = lista
  this.formateaLista = () => {
    let result = []
    for (const car of this.lista) {
      let currentLine = []  // linea actual
      let options = { style: 'currency', currency: 'ARS', minimumFractionDigits: 2 }
      for (const [key, value] of Object.entries(car)) {
        // formato local de precios
        const val = key === 'Precio' ? this.formateaPrecio(value) : value
        currentLine.push(`${key}: ${val}`)
      }
      result.push(currentLine.join(' // '))
    }
    return result
  }
  this.masCaro = () => {
    let res = this.lista.reduce((acc, e) => acc.Precio > e.Precio ? acc : e)
    return res.Marca + ' ' + res.Modelo
  }
  this.masBarato = () => {
    let res = this.lista.reduce((acc, e) => acc.Precio < e.Precio ? acc : e)
    return res.Marca + ' ' + res.Modelo
  }
  this.ordenaPorPrecio = () => {
    let lista = [...this.lista]
    return lista.sort((a, b) => a.Precio > b.Precio ? -1 : (a.Precio < b.Precio) ? 1 : 0)
  }
  this.marcaYModelo = (vehiculo) => {
    return vehiculo.Marca + ' ' + vehiculo.Modelo
  }
  this.formateaPrecio = (p) => {
    const options = { style: 'currency', currency: 'ARS', minimumFractionDigits: 2 }
    return p.toLocaleString('es-ar', options).replace(/\s/g, '')
  }
  this.contieneLetra = (letra) => {
    const mod = this.lista.filter((e) => e.Modelo.includes(letra))[0]
    return this.marcaYModelo(mod) + ' ' + this.formateaPrecio(mod.Precio)
  }
}

let listaDeVehiculos = [
  {
    Marca: 'Peugeot',
    Modelo: '206',
    Puertas: '4',
    Precio: 200000.00
  },
  {
    Marca: 'Honda',
    Modelo: 'Titan',
    Cilindrada: '125c',
    Precio: 60000.00
  },
  {
    Marca: 'Peugeot',
    Modelo: '208',
    Puertas: '5',
    Precio: 250000.00
  },
  {
    Marca: 'Yamaha',
    Modelo: 'YBR',
    Cilindrada: '160c',
    Precio: 80500.50
  },
]

function solucion() {
  let res = []
  const misVehiculos = new Vehiculos(listaDeVehiculos)
  res = res.concat(misVehiculos.formateaLista())
  res.push('=============================')
  res.push('Vehículo más caro: ' + misVehiculos.masCaro())
  res.push('Vehículo más barato: ' + misVehiculos.masBarato())
  res.push('Vehículo que contiene en el modelo la letra ‘Y’: ' + misVehiculos.contieneLetra('Y'))
  res.push('=============================')
  res.push('Vehículos ordenados por precio de mayor a menor: ')
  for (const vehiculo of misVehiculos.ordenaPorPrecio()) {
    res.push(misVehiculos.marcaYModelo(vehiculo))
  }
  console.log()
  for (const line of res) {
    console.log(' ' + line)
  }
  console.log()
}

solucion()