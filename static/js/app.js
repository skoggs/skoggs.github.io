//Set the URL
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"

//Create empty arrays for data.
let values = [];
let labels = [];
let hovertext = [];
let valuesb = [];
let labelsb = [];
let hovertextb = [];

//Log the JSON data into arrays.
d3.json(url).then(function (data) {
  for (let p = 0; p < 10; p++)
{
    let value = data['samples']['0']['sample_values'][p];
    values.push(value);
    let label = data['samples']['0']['otu_ids'][p];
    labels.push("OTU "+label);
    let hover = data['samples']['0']['otu_labels'][p];
    hovertext.push(hover);
}
  for (let q = 0; q < data['samples']['0']['sample_values'].length; q++) 
{
  let value = data['samples']['0']['sample_values'][q];
  valuesb.push(value);
  let label = data['samples']['0']['otu_ids'][q];
  labelsb.push(label);
  let hover = data['samples']['0']['otu_labels'][q];
  hovertextb.push(hover);
}


//Pull metadata from JSON file. 
let id = data['metadata']['0']['id'];
let ethnicity = data['metadata']['0']['ethnicity'];
let gender = data['metadata']['0']['gender'];
let age = data['metadata']['0']['age'];
let location = data['metadata']['0']['location'];
let bbtype = data['metadata']['0']['bbtype'];
let wfrequency = data['metadata']['0']['wfreq'];

//Insert metadata into HTML element
d3.selectAll(".panel-body").html
("id: "+id+"<br>"+"ethnicity: "+ethnicity+"<br>"+"gender: "+gender+"<br>"+"age: "+age+"<br>"+
"location: "+location+"<br>"+"bbtype: "+bbtype+"<br>"+"wfrequency: "+wfrequency);

//Set values and layout for bar chart.
var chartdata = 
{
  'x': values,
  'y': labels,
  text: hovertext,
  type: 'bar',
  orientation: 'h'

}
;
var layout = {title: 'Top 10 OTUs'};

//Plot the barchart. 

Plotly.newPlot('barchart', [chartdata], layout);  

//Set values and layout for bubble chart. 

var bubbledata = {
  x: labelsb,
  y: valuesb,
  text: hovertextb,
  mode: 'markers',
  marker: {
    color: valuesb,
    size: valuesb
  }
};
var bubblelayout = {
  title: 'OTU IDs',
  showlegend: false,
  height: 600,
  width: 600
};

//Plot the bubble chart.

Plotly.newPlot('bubbles', [bubbledata], bubblelayout);
;




//Do it all over again when a new sample is selected.
d3.selectAll("#selDataset").on("change", updateCharts);
function updateCharts() {
  let dropdownMenu = d3.select("#selDataset");
  let dropdownvalue = dropdownMenu.property("value");
  console.log(dropdownvalue);

//Initialize arrays.
  let values = [];
  let labels = [];
  let hovertext = [];
  let valuesb = [];
  let labelsb = [];
  let hovertextb = [];

//Log corresonding JSON data into arrays.
  for (let p = 0; p < 10; p++)
  {
      let value = data['samples'][dropdownvalue]['sample_values'][p];
      values.push(value);
      let label = data['samples'][dropdownvalue]['otu_ids'][p];
      labels.push("OTU "+label);
      let hover = data['samples'][dropdownvalue]['otu_labels'][p];
      hovertext.push(hover);
  }

  for (let q = 0; q < data['samples'][dropdownvalue]['sample_values'].length; q++) 
  {
    let value = data['samples'][dropdownvalue]['sample_values'][q];
    valuesb.push(value);
    let label = data['samples'][dropdownvalue]['otu_ids'][q];
    labelsb.push(label);
    let hover = data['samples'][dropdownvalue]['otu_labels'][q];
    hovertextb.push(hover);
  }

//Rechart the bar chart with chosen data. Plotly.restyle was an option here too but I opted to reuse the existing code.

  var chartdata = 
  {
    'x': values,
    'y': labels,
    text: hovertext,
    type: 'bar',
    orientation: 'h'
  
  }
  ;
  var layout = {title: 'Top 10 OTUs'};
  Plotly.newPlot('barchart', [chartdata], layout);  

//Rechart the Bubble chart with chosen data. 

  var bubbledata = {
    x: labelsb,
    y: valuesb,
    text: hovertextb,
    mode: 'markers',
    marker: {
      color: valuesb,
      size: valuesb
    }
  };
  var bubblelayout = {
    title: 'OTU IDs',
    showlegend: false,
    height: 600,
    width: 600
  };
  Plotly.newPlot('bubbles', [bubbledata], bubblelayout);

//Pull updated metadata from JSON file. 
let id = data['metadata'][dropdownvalue]['id'];
let ethnicity = data['metadata'][dropdownvalue]['ethnicity'];
let gender = data['metadata'][dropdownvalue]['gender'];
let age = data['metadata'][dropdownvalue]['age'];
let location = data['metadata'][dropdownvalue]['location'];
let bbtype = data['metadata'][dropdownvalue]['bbtype'];
let wfrequency = data['metadata'][dropdownvalue]['wfreq'];

//Insert updated metadata into HTML element
d3.selectAll(".panel-body").html
("id: "+id+"<br>"+"ethnicity: "+ethnicity+"<br>"+"gender: "+gender+"<br>"+"age: "+age+"<br>"+
"location: "+location+"<br>"+"bbtype: "+bbtype+"<br>"+"wfrequency: "+wfrequency);


}

});
