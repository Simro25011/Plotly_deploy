// Create the buildChart function.
function buildCharts(sample) {
  // Use d3.json to load the samples.json file 
  d3.json("samples.json").then((data) => {
    console.log(data);

    // Create a variable that holds the samples array. 

    // Create a variable that filters the samples for the object with the desired sample number.

    // 1. Create a variable that filters the metadata array for the object with the desired sample number.
    var metadata = data.metadata;
    var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);

    // Create a variable that holds the first sample in the array.
  
  
   
  
  

    // 2. Create a variable that holds the first sample in the metadata array.
    var result = resultArray[0];

    // Create variables that hold the otu_ids, otu_labels, and sample_values.



    // 3. Create a variable that holds the washing frequency.
    var w_Freq = result.wfreq;
    var wFreqFloat = parseFloat(wFreq).toFixed(2);
   
    // Create the yticks for the bar chart.

    // Use Plotly to plot the bar data and layout.
    Plotly.newPlot();
    
    // Use Plotly to plot the bubble data and layout.
    Plotly.newPlot();
   
    
    // 4. Create the trace for the gauge chart.
    var gaugeData = [
      {
        title: {text: "Scrubs per Week", font: {size: 18}},
        type: "indicator",
        mode: "gauge+number",
        value: wfreq,
        tickmode: "linear",
        gauge: {
          axis: { range: [null, 10], dtick: 2, tick0: 0 },
          bar: { color: "firebrick" },
          bgcolor: "white",
          borderwidth: 2,
          bordercolor: "gray",
          steps: [
            { range: [0, 2], color: "cyan" },
            { range: [2, 4], color: "orange" },
            { range: [4, 6], color: "yellow"},
            { range: [6, 8], color: "lightgreen"},
            { range: [8, 10], color: "green"},
          ]},
          
    }];
    
    // 5. Create the layout for the gauge chart.
    var gaugeLayout = { 
      title : "Belly Button Washing Frequency",
      width: 600, height: 500, margin: { t: 0, b: 0 } 
     
    };

    // 6. Use Plotly to plot the gauge data and layout.
    Plotly.newPlot('gauge', gaugeData, gaugeLayout );
  });
}
