function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("samples.json").then((data) => {
    var sampleNames = data.names;

    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    var firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
    
  });
}

// Initialize the dashboard
init();

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildMetadata(newSample);
  buildCharts(newSample);
  
}

// Demographics Panel 
function buildMetadata(sample) {
  d3.json("samples.json").then((data) => {
    var metadata = data.metadata;
    // Filter the data for the object with the desired sample number
    var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
    var result = resultArray[0];
    // Use d3 to select the panel with id of `#sample-metadata`
    var PANEL = d3.select("#sample-metadata");

    // Use `.html("") to clear any existing metadata
    PANEL.html("");

    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.
    Object.entries(result).forEach(([key, value]) => {
      PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
    });

  });
}

// 1. Create the buildCharts function.
function buildCharts(sample) {
  // 2. Use d3.json to load and retrieve the samples.json file 
  d3.json("samples.json").then((data) => {
    console.log(data);
    // 3. Create a variable that holds the samples array. 
    var samplesdata = data.samples;

    // 4. Create a variable that filters the samples for the object with the desired sample number.
    var resultsArray = samplesdata.filter(sampleObj => sampleObj.id == sample);

    //  5. Create a variable that holds the first sample in the array.
    var results = resultsArray[0];


    // 6. Create variables that hold the otu_ids, otu_labels, and sample_values.

    // otu_ids
    var otuIds = results.otu_ids.map(numericIds => {
      return numericIds;
    }).reverse();

    var top_otu_ids = otuIds.slice(0, 10).map(numericIds => {
      return 'OTU ' + numericIds;
    }).reverse();
    

    // otu_labels
    var otuLabels = results.otu_labels.reverse();
    var top_otu_labels = otuLabels.slice(0, 10).reverse();
    

    // samples_values
    var samplevalues = results.sample_values.reverse();
    var top_sample_values = samplevalues.slice(0, 10).reverse();
    


    // 7. Create the yticks for the bar chart.
    // Hint: Get the the top 10 otu_ids and map them in descending order  
    //  so the otu_ids with the most bacteria are last. 

    // 8. Create the trace for the bar chart. 
    var bar_trace = [{
      
      x: top_sample_values,
      y: top_otu_ids,
      text : top_otu_labels,
      type : "bar",
      orientation : "h"
        
     
    }];
      
    // 9. Create the layout for the bar chart. 
    var barLayout = {
      title: "Top 10 Bacteria Cultures Found",
      
     
    };
    // 10. Use Plotly to plot the data with the layout. 
    Plotly.newPlot("bar", bar_trace , barLayout);
  

    // 1. Create the trace for the bubble chart.

    var bubbleData = [
      {
        x: otuIds,
        y: samplevalues,
        mode: "markers",
        text: otuLabels,
        marker: {
          size: samplevalues,
          color: otuIds,
          colorscale: 'RdBu',
        } 
        
    }];

    // 2. Create the layout for the bubble chart.
    var bubbleLayout = {
      title: "Bacteria Cultures Per Sample",
      xaxis: {title: "OTU ID"},
      titlefont: {"size": 15},
      hovermode: "closest",
      height: 500

      
    };

    // 3. Use Plotly to plot the data with the layout.
    Plotly.newPlot("bubble", bubbleData, bubbleLayout);
  
  // step: 1-3initialize variables that hold arrays for the sample 
    //that is selected from the dropdown menu on the webpage
    var metdata = data.metadata;
    // Filter the data for the object with the desired sample number
    var resultArray = metdata.filter(sampleObj => sampleObj.id == sample);
    console.log(resultArray);

    var result = resultArray[0];
    console.log(result);

    //initialize variables and convert to a float
    var wFreq = result.wfreq
    var wFreqFloat = parseFloat(wFreq).toFixed(2)
    console.log(wFreqFloat)

    // 4. Create the trace for the gauge chart.
    var gaugeData = [{
      title: {text: "Scrubs per Week", font: {size: 12}},
      type: "indicator",
      mode: "gauge+number",
      value: wFreq,
      tickmode: 'linear',
      gauge: {
        axis: { range: [null, 10], dtick: 2, tick0: 0 },
        bar: { color: "black" },
        bgcolor: "white",
        borderwidth: 2,
        bordercolor: "gray",
        steps: [
          { range: [0, 2], color: "red"},
          { range: [2, 4], color: "orange"},
          { range: [4, 6], color: "yellow"},
          { range: [6, 8], color: " lightgreen" },
          { range: [8, 10], color: "green" },
        ]},
        
    }];
    // 5. Create the layout for the gauge chart.
    var gaugeLayout = { 
      title:"Belly Button Washing Frequency",
      titlefont: {"size": 15}
    };

    // 6. Use Plotly to plot the gauge data and layout.
    Plotly.newPlot("gauge", gaugeData, gaugeLayout)
    });
  }