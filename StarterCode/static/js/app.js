//Step 1: Plotly
// initialize page
function init() {
    d3.json("samples.json").then((data) => {
        //dropdown menu
        var dropdown = d3.select("#selDataset");

        data.names.forEach(function(name) {
            dropdown.append("option").text(name).property("value", name);

        });

        // build charts
        // create bar plot
        var sampleValues = data.samples[0].sample_values.slice(0, 10).reverse();
        var sampleIDs = data.samples[0].otu_ids.slice(0, 10).reverse();
        var sampleLabels = data.samples[0].otu_labels.slice(0, 10).reverse();

        var stringIDs = sampleIDs.map(samID => 'OTU ${samID}');
        
        // trace1 for OTU Data
        var trace1 = {
            x: sampleValues,
            y: stringIDs,
            text: sampleLabels,
            name: "OTU",
            type: "bar",
            orientation: "h"
        };

        // bar chart for first subject
        var layout1 = {
            title: "Belly Button Biodiversity Bar Chart",
            xaxis:{title: "OTU Values"},
            yaxis:{title: "OTU ID"},
            height: 500,
            width: 1000,
            margin: {
                l: 50,
                r: 50,
                t: 50,
                b: 50
            }

        };
        // data variable
        var data1 = [trace1];

        // bar chart with plotly
        Plotly.newPlot("bar", data1, layout1);

        //Bubble Plot
        var trace2 = {
            x: data.samples[0].otu_ids,
            y: data.samples[0].sample_values,
            mode: "markers",
            marker: {
                size: data.samples[0].sample_values,
                color: data.samples[0].otu_ids
            },
            text: data.samples[0].otu_labels
        };

        // layout for the bubble plot
        var layout_2 = {
            title: "Belly Button Biodiversity Bubble Plot",
            xaxis:{title: "OTU ID"},
            yaxis:{title: "OTU Values"},
            height: 500,
            width: 1000
        };

        // creating data variable
        var data2 = [trace2];

        // create bubble plot
        Plotly.newPlot("bubble", data2, layout_2);

        // metadata insert
        var metadata = data.metadata[0];

        // filter by ID
        var mData = d3.select("#sample-metadata");

        // reset mData panel
        mData.html("");

        // Object.entries for itteration over selectedMetadata
        Object.defineProperties(metadata).forEach((key) => {
            mData.append("p").text(key[0].toUpperCase() + ": " + key[1] + "\n");

        });
    });
}

// update plots and metadata for newly selected value in dropdown menu
function optionChanged(selectValue) {
    d3.json("samples.json").then((data) => {
        
        var sampleData = data.samples;
        
        // filter data by matching id for samples to the selectValue
    
        var filteredSample = sampleData.filter(record => record.id === selectValue)[0];
        var sampleValues = filteredSample.sample_values.slice(0, 10).reverse();
        var sampleIDs = filteredSample.otu_ids.slice(0, 10).reverse();
        var stringIDs = sampleIDs.map(samID => 'OTU ${samID}');
        var sampleLabels = filteredSample.otu_labels.slice(0, 10).reverse();

        // Trace1 for the OTU Data
        var trace1 = {
            x: sampleValues,
            y: stringIDs,
            text: sampleLabels,
            name: "OTU",
            type: "bar",
            orientation: "h"
        };

        // bar chart for first subject in the data
        var layout1 = {
            title: "Belly Button Biodiversity Bar Chart",
            xaxis:{title: "OTU Values"},
            yaxis:{title: "OTU ID"},
            height: 500,
            width: 1000,
            margin: {
                l: 50,
                r: 50,
                t: 50,
                b: 50
            }
        };
    
    // creating data variable
    var data1 = [trace1];
    
    // create bar chart using plotly
    Plotly.newPlot("bar", data1, layout1);

        // Bubble plot
        var bubValues = filteredSample.sample_values;
        var bubIDs = filteredSample.otu_ids;
        var stringBubIDs = bubIDs.map(bubID => 'OTU ${bubID}');
        var bubLabels = filteredSample.otu_labels;

        var trace2 = {
            x: bubIDs,
            y: bubValues,
            mode: "markers",
            marker: {
                size: bubValues,
                color: bubIDs
            },
            text: bubLabels
        };

        // layout for bubble plot
        var layout_2 = {
            title: "Belly Button Biodiversity Bubble Plot",
            xaxis:{title: "OTU ID"},
            yaxis:{title: "OTU Values"},
            height: 500,
            width: 1000
        };

        // create data variable
        var data2 = [trace2];

        // create bubble plot
        Plotly.newPlot("bubble", data2, layout_2);

        // build metadata 
        var metadata = data.metadata;

        // filter by ID
        var filteredMeta = metadata.filter(record => record.id.toString() === selectValue)[0];

        var mData = d3.select("#sample-metadata");

        // reset mData panel
        mData.html("");

        Object.entries(filteredMeta).forEach((key) => {
            mData.append("p").text(key[0].toUpperCase() + ": " + key[1] + "\n");
        });
    });
}

init(); 