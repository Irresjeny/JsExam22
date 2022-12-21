// const img_mars =  document.getElementById('mars')
// fetch('https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=DEMO_KEY')
//     .then((response) =>{
//         response.json().then((result) =>{
//             console.log(result.photos[0])
//             // rate.innerText = `USD buy:${result[0].buy} sale:${result[0].sale}`
//             // img_mars.src = result.photos[Math.floor(Math.random() * result.photos.length)].img_src
//         })
//     })

// const getMarsImg = (date) =>{
//     fetch('https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=DEMO_KEY')
//         .then((response) =>{
//             response.json().then((result) =>{
//                 // console.log(result.photos.filter(item => (new Date(item.earth_date)).toISOString().replace('T', ' ').replace('Z', ' ').slice(0, -5) === date))
//                 // console.log(result.photos)
//                 // console.log(date)
//                 // rate.innerText = `USD buy:${result[0].buy} sale:${result[0].sale}`
//                 img_mars.src = result.photos.filter(item => (new Date(item.earth_date)).toISOString().replace('T', ' ').replace('Z', ' ').slice(0, -5) === date).img_src
//             })
//         })
// }

const API_KEY = '6gWDxHBE3govN1Baabk3AlNafpi0t2SZzgFriC0P';
var rovers;

const getRovers = () => {
    fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers?&api_key=${API_KEY}`).then((response) => {
        response.json().then((result) => {
            rovers = result.rovers
            for (let i = 0; i < rovers.length; i++) {
                let element = "<button name='rover'class='buttons' value='"+i+"' onclick='getSol(this)'>" + rovers[i].name + "</button>"
                document.getElementById("output").innerHTML += element;
            }
        })
    })
}

const getSol = (id) => {
    document.getElementById("sol").innerHTML = '';
    document.getElementById("image").innerHTML = '';
    let element = "Enter sol(max "+ rovers[id.value].max_sol +"): <input id='input_sol' class='buttons' type='text'" +
        " name='sol' value='1'><button class='buttons' onclick='getImages("+id.value+")'>ok</button>"
    document.getElementById("sol").innerHTML += element;
}

const getImages = (id) =>{
    let sol = document.getElementById('input_sol').value
        fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/${rovers[id].name}/photos?sol=${sol}&api_key=${API_KEY}`)
        .then((response) =>{
            response.json().then((result) =>{
                let photos = result.photos;
                if (photos.length === 0){
                    document.getElementById("image").innerHTML = "<div>No photos were taken that day</div>"
                }
                else {
                    document.getElementById("image").innerHTML = '';
                    for (let i = 0; i < photos.length; i++) {
                        let element = "<a href='"+photos[i].img_src+"' class='image'><img src='"+photos[i].img_src+"'></a>"
                        document.getElementById("image").innerHTML += element;
                    }
                }
            })
        })
}

getRovers()
