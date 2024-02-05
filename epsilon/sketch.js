let base
let eixo
let tubo

let inconsolata
let data = {}
let date, hour, ah, dec, cup
let val
let valor
let slider_size

let slider
let index
let color_slider
let multi_slider_size = 150
let rotY = 150
let set_scale



async function getJSONData() {
  // data_slider = await loadJSON('assets/slider_.json')
}


function preload() {
  base = loadModel("assets/_pilar_simplified.obj", false)
  eixo = loadModel("assets/_eixoPolar_simplified.obj", false)
  tubo = loadModel("assets/_tubo_conj_simplified.obj", false)
  inconsolata = loadFont('assets/inconsolata.otf')
  data_slider = loadJSON('assets/slider_.json')
  //setInterval(getJSONData, 5000)
}


function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL)
  textFont(inconsolata)
  textSize(height / 40)
  textAlign(CENTER, CENTER)

  slider_size = windowWidth - 20

  slider = createSlider(0, slider_size, 100, 100);
  slider.position(10, windowHeight - 45);
  slider.style('width', slider_size + 'px');

  color_slider = createSlider(0, 255, 200);
  color_slider.position(10, 10)
  color_slider.style('width', multi_slider_size + 'px');

  rotY = createSlider(0, 360, 135);
  rotY.position(10, 40)
  rotY.style('width', multi_slider_size + 'px');

  set_scale = createSlider(1, 100, 25);
  set_scale.position(10, 70)
  set_scale.style('width', multi_slider_size + 'px');


  refresh();

}

function draw() {

  refresh();

  background(color_slider.value())
  box(1);

  fill(150, 0, 100)

  text('\nEpsilon\n' + 'Date:' + date + '\n' + 'Hour:' + hour + '\n\n' + 'AH:' + ah + '\n' + 'DEC:' + dec + '\n'+ '\n\nra_deg: ' + ra_deg().toFixed(2) + '\ndec_deg: ' + dec_deg().toFixed(2), -280, 100)
  
  noFill()


  scale(set_scale.value()/100)
  normalMaterial()
  //fill(255,255,0) // Atribui cor ao modelo
  stroke(1)

  rotateY(-rotY.value() * PI / 180)

 // translate(0, 0, -500) //Offset para evidenciar a escrita

  let DEC = dec_deg()
  let RA_deg = ra_deg()

  rotateX(-202.25 * PI / 180) // É nessa linha que sera somado 22.5 graus
  model(base)
  rotateZ(-RA_deg * PI / 180) // Aqui configura o valor do Eixo RA (+/-4,5 ah)

  model(eixo)
  translate(250, 0, 0) //Offset para coincidir os pivôs do eixo e do tubo
  rotateX(22.25 * PI / 180)  // Aqui configura a Latitude
  rotateX(-1 * (DEC + 22.53) * PI / 180)  // Aqui configura o valor do eixo DEC (+57 N e -80 S)
  model(tubo)



}


function ra_deg() {

  ra_result = float(abs(ah.split(" ")[0] * 15)) + float(ah.split(" ")[1] / 60 * 15) + float(ah.split(" ")[2] / 3600 * 15)

  if (ah.split(" ")[0] + 0.5 < 0) { // Artificio para detectar valor negativo
    ra_result = -ra_result
  }

  return ra_result
}

function dec_deg() {

  dec_result = float(abs(dec.split(" ")[0])) + float(dec.split(" ")[1] / 60) + float(dec.split(" ")[2] / 3600)

  if (dec.split(" ")[0] < 0) {
    dec_result = -dec_result
  }

  dec_result = dec_result + 22.53

  return dec_result
}


function refresh() {
  val = slider.value();

  let n_itens = Object.keys(data_slider["data"]).length

  index = int(val / slider_size * (n_itens - 1))


  if (data_slider["data"][index][4] && data_slider["data"][index][6]) {
    hour = data_slider["data"][index][0]
    date = data_slider["data"][index][1]
    ah = data_slider["data"][index][4]
    dec = data_slider["data"][index][6]

    if (data_slider["data"][index][8] && data_slider["data"][index][10]) {

      cup = data_slider["data"][index][8]
      tube = data_slider["data"][index][10]
    }
  }

}