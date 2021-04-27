// VACCINE DATA D3

// Code for Chart is Wrapped Inside a Function That Automatically Resizes the Chart
function makeResponsive() {

  // If SVG Area is not Empty When Browser Loads, Remove & Replace with a Resized Version of Chart
  var svgArea = d3.select("body").select("svg");

  // Clear SVG is Not Empty
  if (!svgArea.empty()) {
    svgArea.remove();
  }
  
  // Setup Chart Parameters/Dimensions
  var svgWidth = 980;
  var svgHeight = 600;

  // Set SVG Margins
  var margin = {
    top: 20,
    right: 40,
    bottom: 90,
    left: 100
  };

  // Define Dimensions of the Chart Area
  var width = svgWidth - margin.left - margin.right;
  var height = svgHeight - margin.top - margin.bottom;

  // Create an SVG Element/Wrapper - Select Body, Append SVG Area & Set the Dimensions
  var svg = d3
    .select("#scatter")
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight);

  // Append Group Element & Set Margins - Shift (Translate) by Left and Top Margins Using Transform
  var chartGroup = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

  // Import Data from the data.csv file
  d3.csv("vaccinestats.csv")
    .then(function(VaccineData) {
 
    VaccineData.forEach(function(data) {
    data.age_mean = +data.age_mean;
    data.age_median = +data.age_median;
    data.age_min = +data.age_min;
    data.age_max = +data.age_max;
    data.symptoms_mean = +data.symptoms_mean;
    data.symptoms_median = +data.symtoms_median;
    data.symptoms_min = +data.symptoms_min;
    data.symptoms_max = +data.symptoms_max;
    data.symptoms_count = +data.symptoms_count;
    data.hospital_mean = +data.hospital_mean;
    data.hospital_median = +data.hospital_median;
    data.hospital_min = +data.hospital_min;
    data.hospital_max = +data.hospital_max;
    data.onset_mean = +data.onest_mean;
    data.onset_median = +data.onset_median;
    data.onset_min = +data.onset_min;
    data.onset_max = +data.onset_max;

  });

  // Initial Params
  var chosenXAxis = "age_median";
  var chosenYAxis = "symptoms_median";

  // Function for Updating xScale Upon Click on Axis Label
  function xScale(VaccineData, chosenXAxis) {
    // Create Scale Functions for the Chart (chosenXAxis)
    var xLinearScale = d3.scaleLinear()
      .domain([d3.min(VaccineData, d => d[chosenXAxis]) * 0.8,
        d3.max(VaccineData, d => d[chosenXAxis]) * 1.2
      ])
      .range([0, width]);
    return xLinearScale;
  }

  // Function for Updating yScale Upon Click on Axis Label
  function yScale(VaccineData, chosenYAxis) {
    // Create Scale Functions for the Chart (chosenYAxis)
    var yLinearScale = d3.scaleLinear()
      .domain([d3.min(VaccineData, d => d[chosenYAxis]) * 0.8,
        d3.max(VaccineData, d => d[chosenYAxis]) * 1.2
      ])
      .range([height, 0]);
    return yLinearScale;
  }

  // Function for Updating xAxis Upon Click on Axis Label
  function renderXAxes(newXScale, xAxis) {
    var bottomAxis = d3.axisBottom(newXScale);
    xAxis.transition()
      .duration(1000)
      .call(bottomAxis);
    return xAxis;
  }

  // Function for Updating yAxis Upon Click on Axis Label
  function renderYAxes(newYScale, yAxis) {
    var leftAxis = d3.axisLeft(newYScale);
    yAxis.transition()
      .duration(1000)
      .call(leftAxis);
    return yAxis;
  }

  // Function for Updating Circles Group with a Transition to New Circles
  function renderCircles(circlesGroup, newXScale, chosenXAxis, newYScale, chosenYAxis) {

    circlesGroup.transition()
      .duration(1000)
      .attr("cx", d => newXScale(d[chosenXAxis]))
      .attr("cy", d => newYScale(d[chosenYAxis]));
    return circlesGroup;
  }

  // Function for Updating Text Group with a Transition to New Text
  function renderText(textGroup, newXScale, chosenXAxis, newYScale, chosenYAxis) {

    textGroup.transition()
      .duration(1000)
      .attr("x", d => newXScale(d[chosenXAxis]))
      .attr("y", d => newYScale(d[chosenYAxis]))
      .attr("text-anchor", "middle");

    return textGroup;
  }

  // Function for Updating Circles Group with New Tooltip
  function updateToolTip(chosenXAxis, chosenYAxis, circlesGroup, textGroup) {

    if (chosenXAxis === "age_median") {
      var xLabel = "Median Age";
    }
    else if (chosenXAxis === "age_max") {
      var xLabel = "Max Age";
    }
    else {
      var xLabel = "symptoms_count";
    }
    if (chosenYAxis === "symptoms_median") {
      var yLabel = "Number of Symptoms (Median)";
    }
    else if (chosenYAxis === "hospital_max") {
      var yLabel = "Number of Hospital Days (Max)";
    }
    else if (chosenYAxis === "onset_max") {
      var yLabel = "Number of Symptom Days";
    }

    // Initialize Tool Tip
    var toolTip = d3.tip()
      .attr("class", "tooltip d3-tip")
      .offset([90, 90])
      .html(function(d) {
        return (`<strong>${d.abbr}</strong><br>${xLabel} ${d[chosenXAxis]}<br>${yLabel} ${d[chosenYAxis]}`);
      });
    // Create Circles Tooltip in the Chart
    circlesGroup.call(toolTip);
    // Create Event Listeners to Display and Hide the Circles Tooltip
    circlesGroup.on("mouseover", function(data) {
      toolTip.show(data, this);
    })
      // onmouseout Event
      .on("mouseout", function(data) {
        toolTip.hide(data);
      });
    // Create Text Tooltip in the Chart
    textGroup.call(toolTip);
    // Create Event Listeners to Display and Hide the Text Tooltip
    textGroup.on("mouseover", function(data) {
      toolTip.show(data, this);
    })
      // onmouseout Event
      .on("mouseout", function(data) {
        toolTip.hide(data);
      });
    return circlesGroup;
  }


    // Create xLinearScale & yLinearScale Functions for the Chart
    var xLinearScale = xScale(VaccineData, chosenXAxis);
    var yLinearScale = yScale(VaccineData, chosenYAxis);

    // Create Axis Functions for the Chart
    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);

    // Append xAxis to the Chart
    var xAxis = chartGroup.append("g")
      .classed("x-axis", true)
      .attr("transform", `translate(0, ${height})`)
      .call(bottomAxis);

    // Append yAxis to the Chart
    var yAxis = chartGroup.append("g")
      .classed("y-axis", true)
      .call(leftAxis);

    // Create & Append Initial Circles
    var circlesGroup = chartGroup.selectAll(".stateCircle")
      .data(VaccineData)
      .enter()
      .append("circle")
      .attr("cx", d => xLinearScale(d[chosenXAxis]))
      .attr("cy", d => yLinearScale(d[chosenYAxis]))
      .attr("class", "stateCircle")
      .attr("r", 15)
      .attr("opacity", ".75");

    // Append Text to Circles
    var textGroup = chartGroup.selectAll(".stateText")
      .data(VaccineData)
      .enter()
      .append("text")
      .attr("x", d => xLinearScale(d[chosenXAxis]))
      .attr("y", d => yLinearScale(d[chosenYAxis]*.98))
      .text(d => (d.abbr))
      .attr("class", "stateText")
      .attr("font-size", "12px")
      .attr("text-anchor", "middle")
      .attr("fill", "white");

    // Create Group for 3 xAxis Labels
    var xLabelsGroup = chartGroup.append("g")
      .attr("transform", `translate(${width / 2}, ${height + 20})`);
    // Append xAxis
    var age_medianLabel = xLabelsGroup.append("text")
      .attr("x", 0)
      .attr("y", 20)
      .attr("value", "age_median") // Value to Grab for Event Listener
      .classed("active", true)
      .text("Median Age");

    var age_maxLabel = xLabelsGroup.append("text")
      .attr("x", 0)
      .attr("y", 40)
      .attr("value", "age_max") // Value to Grab for Event Listener
      .classed("inactive", true)
      .text("Max Age");

    var symptoms_countLabel = xLabelsGroup.append("text")
      .attr("x", 0)
      .attr("y", 60)
      .attr("value", "symptoms_count") // Value to Grab for Event Listener
      .classed("inactive", true)
      .text("People Count");

    // Create Group for 3 yAxis Labels
    var yLabelsGroup = chartGroup.append("g")
      .attr("transform", `translate(-25, ${height / 2})`);
    // Append yAxis
    var symptoms_medianLabel = yLabelsGroup.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", -30)
      .attr("x", 0)
      .attr("value", "symptoms_median")
      .attr("dy", "1em")
      .classed("axis-text", true)
      .classed("active", true)
      .text("Number of Symptoms");

    var hospital_maxLabel = yLabelsGroup.append("text") 
      .attr("transform", "rotate(-90)")
      .attr("y", -50)
      .attr("x", 0)
      .attr("value", "hospital_max")
      .attr("dy", "1em")
      .classed("axis-text", true)
      .classed("inactive", true)
      .text("Hospital Days");

    var onset_maxLabel = yLabelsGroup.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", -70)
      .attr("x", 0)
      .attr("value", "onset_max")
      .attr("dy", "1em")
      .classed("axis-text", true)
      .classed("inactive", true)
      .text("Symptom Onset Days");

    // updateToolTip Function
    var circlesGroup = updateToolTip(chosenXAxis, chosenYAxis, circlesGroup, textGroup);

    // xAxis Labels Event Listener
    xLabelsGroup.selectAll("text")
      .on("click", function() {
        // Get Value of Selection
        var value = d3.select(this).attr("value");
        if (value !== chosenXAxis) {
          // Replaces chosenXAxis with Value
          chosenXAxis = value;
          // Updates xScale for New Data
          xLinearScale = xScale(VaccineData, chosenXAxis);
          // Updates xAxis with Transition
          xAxis = renderXAxes(xLinearScale, xAxis);
          // Updates Circles with New Values
          circlesGroup = renderCircles(circlesGroup, xLinearScale, chosenXAxis, yLinearScale, chosenYAxis);
          // Updates Text with New Values
          textGroup = renderText(textGroup, xLinearScale, chosenXAxis, yLinearScale, chosenYAxis)
          // Updates Tooltips with New Information
          circlesGroup = updateToolTip(chosenXAxis, chosenYAxis, circlesGroup, textGroup);
          // Changes Classes to Change Bold Text
          if (chosenXAxis === "age_median") {
            age_medianLabel
              .classed("active", true)
              .classed("inactive", false);
            age_maxLabel
              .classed("active", false)
              .classed("inactive", true);
            symptoms_countLabel
              .classed("active", false)
              .classed("inactive", true);
          }
          else if (chosenXAxis === "age_max") {
            age_medianLabel
              .classed("active", false)
              .classed("inactive", true);
            age_maxLabel
              .classed("active", true)
              .classed("inactive", false);
            symptoms_countLabel
              .classed("active", false)
              .classed("inactive", true);
          }
          else {
            age_medianLabel
              .classed("active", false)
              .classed("inactive", true);
            age_maxLabel
              .classed("active", false)
              .classed("inactive", true);
            symptoms_countLabel
              .classed("active", true)
              .classed("inactive", false);
          }
        }
      });
    
      // yAxis Labels Event Listener
    yLabelsGroup.selectAll("text")
      .on("click", function() {
        // Get Value of Selection
        var value = d3.select(this).attr("value");
        if (value !== chosenYAxis) {
          // Replaces chosenYAxis with Value
          chosenYAxis = value;
          // Updates yScale for New Data
          yLinearScale = yScale(VaccineData, chosenYAxis);
          // Updates yAxis with Transition
          yAxis = renderYAxes(yLinearScale, yAxis);
          // Updates Circles with New Values
          circlesGroup = renderCircles(circlesGroup, xLinearScale, chosenXAxis, yLinearScale, chosenYAxis);
          // Updates Text with New Values
          textGroup = renderText(textGroup, xLinearScale, chosenXAxis, yLinearScale, chosenYAxis)
          // Updates Tooltips with New Information
          circlesGroup = updateToolTip(chosenXAxis, chosenYAxis, circlesGroup, textGroup);
          // Changes Classes to Change Bold Text
          if (chosenYAxis === "symptoms_median") {
            symptoms_medianLabel
              .classed("active", true)
              .classed("inactive", false);
            hospital_maxLabel
              .classed("active", false)
              .classed("inactive", true);
            onset_maxLabel
              .classed("active", false)
              .classed("inactive", true);
          }
          else if (chosenYAxis === "hospital_max") {
            symptoms_medianLabel
              .classed("active", false)
              .classed("inactive", true);
            hospital_maxLabel
              .classed("active", true)
              .classed("inactive", false);
            onset_maxLabel
              .classed("active", false)
              .classed("inactive", true);
          }
          else {
            symptoms_medianLabel
              .classed("active", false)
              .classed("inactive", true);
            hospital_maxLabel
              .classed("active", false)
              .classed("inactive", true);
            onset_maxLabel
              .classed("active", true)
              .classed("inactive", false);
          }
        }
      });
  });
}

// When Browser Window is Resized, makeResponsive() is Called
d3.select(window).on("resize", makeResponsive);

