console.log("Testing");
function buildMetadata(sample) {
    var url = `/metadata/${sample}`;
    
    d3.json(url).then((metaData)=>{
        var panel = d3.select("#sample-metadata");
        panel.html("");

        Object.entries(metaData).forEach(([key,value])=>{
            var paragraph = panel.append("p");
            paragraph.text(`${key}: ${value}`);
        });

    });


  // @TODO: Complete the following function that builds the metadata panel

  // Use `d3.json` to fetch the metadata for a sample
    // Use d3 to select the panel with id of `#sample-metadata`
  //var panel = d3.select("#sample-metadata");

    // Use `.html("") to clear any existing metadata
  //document.getElementById("sample-metadata").innerHTML= "";

    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.

    // BONUS: Build the Gauge Chart
    // buildGauge(data.WFREQ);
}

function buildCharts(sample) {

  // @TODO: Use `d3.json` to fetch the sample data for the plots
  var pieSelector = d3.select("#pie")
  var bubbleSelector = d3.select("#bubble")
  var url = `/samples/${sample}`;
 
  d3.json(url).then((sampleData) => {
    var sampleValues = sampleData.sample_values;
    var sampleLabels = sampleData.otu_ids;
    var hoverText = sampleData.otu_labels;
    // var pieValues10 = sampleValues.sort((first, second) => second- first).slice(0,9);
    // console.log(sampleValues);

    // pieValues10.forEach(function(value){
    //    var index = sampleValues.index;
    //    console.log(index);
    // })
    //console.log(pieValues.sort((first, second) => second- first).slice(0,9));
    //console.log(pieLabels.sort((first, second) => second- first).slice(0,9));

    var piePlot = {
      labels: sampleLabels.slice(0,9),
      values: sampleValues.slice(0,9),
      type: 'pie',
      hovertext: hoverText.slice(0,9)

    
    };

    var piedata = [piePlot];
    var pielayout = {};

    var bubblePlot = {
        x:  sampleLabels,
        y: sampleValues,
        mode: 'markers',
        text: hoverText,
        marker: {
          color: sampleLabels,
          size: sampleValues
          
        },
        type: 'scatter'
      };

      var bubbledata = [bubblePlot];
      var bubblelayout = {};

    Plotly.newPlot("pie", piedata, pielayout);
    Plotly.newPlot("bubble", bubbledata, bubblelayout);
  });

 

  

    // @TODO: Build a Bubble Chart using the sample data



    // @TODO: Build a Pie Chart
    // HINT: You will need to use slice() to grab the top 10 sample_values,
    // otu_ids, and labels (10 each).
}

function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("/names").then((sampleNames) => {
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    const firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildCharts(newSample);
  buildMetadata(newSample);
}

// Initialize the dashboard
init();
