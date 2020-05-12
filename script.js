var contenido = document.querySelector('#contenido');
var btns = document.querySelector('#btns');
var filter = document.querySelector('#filter');

function llenarTabla(datos) {
    contenido.innerHTML = '';

    console.log(datos);//trae todo el json 

    for (let valor of datos.Countries) {
        contenido.innerHTML += `

            <tr>
                <th style="display:none">${valor.CountryCode}</th>
                <th>${valor.Country}</th>
                <td>${valor.NewConfirmed}</td>
                <td>${valor.TotalConfirmed}</td>
                <td>${valor.Date}</td>
            </tr>

        `;
    }

}
//llenando tabla cuando cargue la pg
document.addEventListener('DOMContentLoaded', () => {
    fetch('https://api.covid19api.com/summary')
        .then(resp => resp.json())
        .then((datos) => {
            llenarTabla(datos)
        });

    Swal.fire({
        icon: 'warning',
        showConfirmButton: false,
        title: 'Cargando...',
        timer: 5000, timerProgressBar: true
    })

})

//actualizando y limpiando datos con los btns
btns.addEventListener('click', (e) => {

    if (event.target.innerHTML == "Actualizar tabla") {

        fetch('https://api.covid19api.com/summary')
            .then(resp => resp.json())
            .then((datos) => {
                llenarTabla(datos)
            });

    } else if (e.target.innerHTML == "Limpiar tabla") {
        contenido.innerHTML = ''
    }

    event.preventDefault();
})



//filtrando datos
const keyup = () => {
    fetch('https://api.covid19api.com/summary')
        .then(resp => resp.json())
        .then((datos) => {

            contenido.innerHTML = '';
            const texto = filter.value.toLowerCase();//valor del input en minusculas


            for (i = 0; i <= datos.Countries.length; i++) {
                console.log(datos.Countries[i].Country)
                const Country = datos.Countries[i].Country.toLowerCase();


                if (Country.indexOf(texto) !== -1) {

                    contenido.innerHTML += `

                    <tr>
                        <th style="display:none">${datos.CountryCode}</th>
                        <th>${datos.Countries[i].Country}</th>
                        <td>${datos.Countries[i].NewConfirmed}</td>
                        <td>${datos.Countries[i].TotalConfirmed}</td>
                        <td>${datos.Countries[i].Date}</td>
                    </tr>
        
                `;
                }
            }




        });
}

filter.addEventListener('keyup', keyup);