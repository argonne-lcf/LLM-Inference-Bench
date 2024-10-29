
const xGridLinesName = "Vertical Grid Lines on Data",
      yGridLinesName = 'Horizontal Grid Lines';
const options = [
    {
        'name': xGridLinesName,
        'val': true,
        'type':'check'
    },
    {
        'name': yGridLinesName,
        'val': true,
        'type':'check'
    },
    {
        'name':'Log Scale',
        'val': false,
        'type':'check'
    },
    {
        'name':'Plot Title',
        'val': 'LLaMA-3-8B: Comparison Across Accelerators for Input & Output Length 1024 (fp16)',
        'type':'input'
    },
    {
        'name':'X-axis Title',
        'val': 'Batch Size',
        'type':'input'
    },
    {
        'name':'X Title Pad',
        'val': '33',
        'type':'input'
    },
    {
        'name':'X-Min',
        'val': '',
        'type':'input'
    },
    {
        'name':'X-Max',
        'val': '',
        'type':'input'
    },
    {
        'name':'Y-axis Title',
        'val': 'Throughput (Tokens/sec)',
        'type':'input'
    },
    {
        'name':'Y Title Pad',
        'val': '65',
        'type':'input'
    },
    {
        'name':'Y-Min',
        'val': '',
        'type':'input'
    },
    {
        'name':'Y-Max',
        'val': '',
        'type':'input'
    },
    {
        'name':'Legend Position',
        'val': ['Bottom', 'Right'],
        'type':'dropdown'
    },
    {
        'name':'Legend Title',
        'val': '',
        'type':'input'
    },
    {
        'name':'Legend Font Size',
        'val': '21',
        'type':'input'
    },
    {
        'name':'Font Size',
        'val': '21',
        'type':'input'
    },
    {
        'name':'Fig Width',
        'val': '1080',
        'type':'input'
    },
    {
        'name':'Fig Height',
        'val': '700',
        'type':'input'
    },
    {
        'name':'Symbol Size',
        'val': '64',
        'type':'input'
    },
    {
        'name':'Line Thickness',
        'val': '1',
        'type':'input'
    }
];

const selectorsContentContainer = d3.select('#selectors-content'),
      filtersContentContainer = d3.select('#filters-content'),
      optionsContentContainer = d3.select('#options-content');

let filters = [],
    selectors = [],
    aliases = {},
    data = [],
    filters_values = {},
    selector_values = {'x':"Batch Size", 'y':"Throughput", 'Legend_Position':"Bottom"};

let targetEle = d3.selectAll('#canvas'),
    total_width = targetEle.node().getBoundingClientRect().width,
    total_height = targetEle.node().getBoundingClientRect().height,
    margin,
    width,
    height,
    targetSVG = targetEle.append('svg'),
    targetG = targetSVG.append('g'),
    x_scale = d3.scaleLinear(),
    y_scale = d3.scaleLinear(),
    color_scale = d3.scaleOrdinal(d3.schemeCategory10),
    symbol_map = {},
    line = d3.line(),
    showGridLinesOnX,
    showGridLinesOnY,
    legend_title = '',
    legend_width,
    legend_height,
    legendG = targetSVG.append('g'),
    marker_radius = 64,
    legend_icon_padding = 2,
    legend_items,
    legend_start_x = 0,
    legend_start_y = 0,
    n_rows,
    n_cols;

// Populate Filters dynamically
function populateFilters() {
    filters.forEach(filter => {
        addDropDown(filtersContentContainer, filter, Array.from(new Set(data.map( d => d[filter.name]))), 'filterDropDown');
    });
}

// Populate Selectors dynamically
function populateSelectors() {
    selectors.forEach(selector => {
        addDropDown(selectorsContentContainer, selector, selector.values, "selectorDropDown");
    });
}

// Populate Options dynamically
function populateOptions() {
    options.forEach(option => {
        switch (option.type) {
            case 'dropdown':
                addDropDown(optionsContentContainer, { "name": option.name, "multi_select": "no", "values":option.val}, option.val, 'optionDropDown');
                break;
            case 'check':
                addCheckbox(optionsContentContainer, option.name, option.val);
                break;
            case 'input':
                addInput(optionsContentContainer, option)
                break;
        
            default:
                break;
        }
    });
}

function addDropDown(container, f, values, className) {
    let f_name = f.name.replace(/\W/g,'_');
    if (f.multi_select=='yes') {
        container.append("button")
            .attr('class', `btn btn-secondary dropdown-toggle ${className}`)
            .attr('type', 'button')
            .attr('id', `dropdownMenu_${f_name}`)
            .attr('data-bs-toggle', "dropdown")
            .attr('aria-expanded', "false")
            .text(f.name)
            
        let dropdownLst = container.append('ul')
                            .attr('class', 'dropdown-menu')
                            .attr('id', `dropdown-menu_${f_name}`)
                            .attr('aria-labelledby', `dropdownMenu_${f_name}`);
                            
        let list = dropdownLst.selectAll(".checkbox-li")
                        .data(values);

        list.enter().append("li")
            .attr("class", "checkbox-li")
            .each(function(d, i) {
                let div = d3.select(this).append("div")
                    .attr("class", "form-check form-switch multiSelectItem");

                let checkbox = div.append("input")
                                .attr("type", "checkbox")
                                .attr("class", "form-check-input")
                                .attr("value", d)
                                .attr("id", "id-" + d.replace(/\W/g,'_'));
                if ("default" in f && f.default.includes(d)) {
                    checkbox.attr("checked", true)
                }
                div.append("label")
                    .attr("type", "checkbox")
                    .attr("class", "form-check-label")
                    .attr("for", "id-" + d.replace(/\W/g,'_'))
                    .text(d);
            });
    } else {
        container.append('label')
            .attr('id', `lbl_${f_name}`)
            .attr('class', `filterLbl`)
            .text(f_name);

        container.append('select')
            .attr("name", `${f_name}`) 
            .attr("id", `lst_${f_name}`)
            .attr('class', `form-select selectorList ${className}`)
            .on('change', selctorSelectionChanged);
        let dropdown = document.getElementById(`lst_${f_name}`)
        values.forEach((v,i) => {
            let option = document.createElement("option");
                option.value = v;
                option.text = v;
            dropdown.appendChild(option)
        })
        if ('default' in f) {
            dropdown.value = f.default;             
        }

    }
}

function addCheckbox(container, name, value) {
    let checkDiv = container.append("div")
                    .attr('class', 'form-check form-switch optionContainer')

    let checkbox = checkDiv.append("input")
                        .attr("type", "checkbox")
                        .attr("class", "form-check-input optionCheckbox")
                        .attr("value", "")
                        .attr("id", "id-" + name.replace(/\W/g,'_'));
    if (value==true) {
        checkbox.attr("checked", true)
    }
    checkDiv.append("label")
        .attr("type", "checkbox")
        .attr("class", "form-check-label")
        .attr("for", "id-" + name.replace(/\W/g,'_'))
        .text(name);   
}

function addInput(container, inp) {
    let inpLbl = inp.name.replace(/\W/g,'_'),
        checkDiv = container.append("div")
                    .attr('class', 'mb-2');
    
    checkDiv.append('label')
        .attr('id', `lbl_${inpLbl}`)
        .attr('class', `selectorLbl`)
        .text(inp.name);

    let inpEle = checkDiv.append('input')
                    .attr("name", `${inpLbl}`) 
                    .attr("id", `${inpLbl}`)
                    .attr('class', `form-control form-control-sm configControl selectorInput`);
    inpEle.node().value = inp.val;
}

function selctorSelectionChanged() {
    selector_values[this.name] = this.value;
}

// Toggle section visibility
function toggleSection(section) {
    const content = document.getElementById(`${section}-content`);
    const icon = document.getElementById(`${section}-icon`);
    if (content.style.display === 'none') {
        content.style.display = 'block';
        icon.textContent = '-';
    } else {
        content.style.display = 'none';
        icon.textContent = '+';
    }
}

function configurationChanged() {
    let curSel = d3.select(this);
    d3.selectAll('.configButton').classed('active', false);
    curSel.classed('active', true);
    d3.select(`#configDropdownMenuButton`).text(curSel.text());
    options[3].val =  "";
    readFiles(curSel.attr('datadir'));
}

function readFiles(config) {

    selectorsContentContainer.selectAll("*").remove();
    filtersContentContainer.selectAll("*").remove();
    optionsContentContainer.selectAll("*").remove();
    targetG.selectAll('*').remove();
    legendG.selectAll('*').remove();

    return Promise.all([ d3.json(`./data/${config}/config.json`, {credentials: 'same-origin'}),
        d3.csv(`./data/${config}/All_results.csv`, {credentials: 'same-origin'}),
        d3.json(`./data/alias.json`, {credentials: 'same-origin'})])
    .then(files => {
        filters = files[0].Filters;
        selectors = files[0].Selectors;
        data = files[1];
        aliases = files[2];
        populateFilters();
        populateSelectors();
        populateOptions();
    });

}

function display() {
    showGridLinesOnX = d3.select("#id-" + xGridLinesName.replace(/\W/g,'_')).node().checked;
    showGridLinesOnY = d3.select("#id-" + yGridLinesName.replace(/\W/g,'_')).node().checked;
    title = d3.select('#Plot_Title').node().value;
    getFilters();

    let colorByAttrs = [];
    d3.select(`#dropdown-menu_Color_By`)
        .selectAll('.form-check-input')
        .each(function(d) {
            if(d3.select(this).node().checked) {
                colorByAttrs.push(d3.select(this).node().value);
            }
        })

    let filtered_data = data.filter(d => {
        for (var key in filters_values) {
            if(filters_values[key]=='' || !filters_values[key].includes(d[key]))
                return false;
        }
        return true
    });
    let plot_data = [],
        y_min = d3.select('#Y_Min').node().value,
        y_max = d3.select('#Y_Max').node().value,
        x_min = d3.select('#X_Min').node().value;
        x_max = d3.select('#X_Max').node().value;

    filtered_data.forEach(fd => {
        let colorByVal = '';
        colorByAttrs.forEach(c => {
            colorByVal += fd[c] + ' ';
        })
        plot_data.push({'x':+fd[selector_values['x']], 
                        'y':+fd[selector_values['y']], 
                        'c':colorByVal
                    })
    })

    x_min = x_min==="" ? 0 : +x_min;
    x_max = x_max==="" ? d3.max(plot_data, d => d.x) : +x_max
    y_min = y_min==="" ? 0 : +y_min;
    y_max = y_max==="" ? d3.max(plot_data, d => d.y) : +y_max;

    plot_data = init(plot_data);
    x_scale.domain([x_min, x_max]);
    y_scale.domain([y_min, y_max]);
    line.x((d) => x_scale(d.x))
        .y((d) => y_scale(d.y));
    
    updateColorScale();
    targetG.selectAll('*').remove();
    if (showGridLinesOnX) {
        targetG.append('g')
            .attr("class", "x-axis")
            .attr('transform', 'translate(0,' + height + ')')
            .call(d3.axisBottom(x_scale).tickValues(d3.map(plot_data, d => d.x)).tickFormat(d3.format("d")))
    } else {
        targetG.append('g')
            .attr("class", "x-axis")
            .attr('transform', 'translate(0,' + height + ')')
            .call(d3.axisBottom(x_scale).ticks(5).tickFormat(d3.format(".2s")))
    }

    targetG.append('text')
        .attr('transform', `translate(${width/2}, ${height+(+d3.select('#X_Title_Pad').node().value)})`)
        .attr('class', 'axisText')
        .style('alignment-baseline', 'hanging')
        .style('text-anchor', 'middle')
        .style('font-size', `${d3.select('#Font_Size').node().value}px`)
        .text(d3.select('#X_axis_Title').node().value);
    
    targetG.append('g')
        .attr("class", "y-axis")
        .call(d3.axisLeft(y_scale).ticks(5).tickFormat(d3.format(".2s")))
    targetG.append('text')
        .attr('transform', `translate(${-d3.select('#Y_Title_Pad').node().value}, ${height/2}) rotate(-90)`)
        .attr('class', 'axisText')
        .text(d3.select('#Y_axis_Title').node().value)
        .style("text-anchor", "middle")
        .style('font-size', `${d3.select('#Font_Size').node().value}px`);
    
    if (showGridLinesOnX) {
        targetG.append('g')
            .attr('class', 'x axis-grid')
            .attr('transform', 'translate(0,' + height + ')')
            .call(d3.axisBottom(x_scale).tickSize(-height).tickValues(d3.map(plot_data, d => d.x)).tickFormat(''));
    } else {    
        targetG.append('g')
            .attr('class', 'x axis-grid')
            .attr('transform', 'translate(0,' + height + ')')
            .call(d3.axisBottom(x_scale).ticks(5).tickSize(-height).tickFormat(''));
    }
    if (showGridLinesOnY) {
        targetG.append('g')
            .attr('class', 'y axis-grid')
            .call(d3.axisLeft(y_scale).tickSize(-width).tickFormat(''));
    }

    d3.selectAll(".x-axis text").style('font-size', `${d3.select('#Font_Size').node().value}px`);
    d3.selectAll(".y-axis text").style('font-size', `${d3.select('#Font_Size').node().value}px`);

    let titleG = targetG.append('g')
                    .attr('transform', `translate(0, ${-0.99 * margin.t})`)
    titleG.append("foreignObject")
            .attr("width", width)
            .attr("height", 0.98 * margin.t)
        .append("xhtml:body")
            .attr('class', 'plotTitle')
            .style('font-size', `${d3.select('#Font_Size').node().value}px`)
            .html(`<p>${title}`);

    
    targetG.append('rect')
        .attr("x", 0)
        .attr("y", 0)
        .attr("width", width)
        .attr("height", height)
        .attr("class", 'bbox')
        
    d3.groups(plot_data, d=> d.c).map((item) => {
        targetG.append('path')
            .datum(item[1])
                .attr('fill', 'transparent')
                .attr('stroke', color_scale(item[0]))
                .attr('stroke-width', `${d3.select('#Line_Thickness').node().value}px`)
                .attr('d', line)
      })

    targetG.selectAll('.symbol')
        .data(plot_data)
        .join('path')
            .attr('transform', d => `translate(${x_scale(d.x)}, ${y_scale(d.y)})`)
            .attr('fill', d => color_scale(d.c))
            .attr('d', d => {
                let symSel = d3.select(`#id_symbol_${d.c.replace(/\W/g,'_')}`)
                if (symSel.node()!==null) {
                    symbol_map[d.c]=symSel.node().value;
                    return getSymbol(symSel.node().value);
                } else {
                    symbol_map[d.c]='Circle';
                    return d3.symbol().type(d3.symbolCircle).size(marker_radius)();
                }
                
            });
    updateLegend();
}

function getFilters() {
    filters_values = {};
    filters.forEach(f => {
        let f_name = f.name.replace(/\W/g,'_');
       
        d3.select(`#dropdown-menu_${f_name}`)
            .selectAll('.form-check-input')
            .each(function(d) {
                if (f.name in filters_values) {
                    if(d3.select(this).node().checked) filters_values[f.name].push(d3.select(this).node().value);   
                } else {
                    if(d3.select(this).node().checked) filters_values[f.name] = [d3.select(this).node().value];
                }
            })
    })
}

function init(plot_data) { 
    plot_data = updateColorLabels(plot_data);
    let fig_width = d3.select('#Fig_Width').node().value,
        fig_height = d3.select('#Fig_Height').node().value,
        top_margin = 0,
        right_margin = 0;

    total_width = targetEle.node().getBoundingClientRect().width;
    total_height = targetEle.node().getBoundingClientRect().height;
    marker_radius = +d3.select('#Symbol_Size').node().value;

    if (fig_width!='') {
        total_width = +fig_width;
    }
    if (fig_height!='') {
        total_height = +fig_height;
    }
        
    legend_items = [... new Set(d3.map(plot_data, d=>d['c']))];
    legend_title = d3.select('#Legend_Title').node().value;

    let legend_item_max_length = d3.max(legend_items.map(d => d.length));

    if (legend_item_max_length > 25) {
        right_margin = 400;
    } else if (legend_item_max_length > 20) {
        right_margin = 350;
    } else if (legend_item_max_length > 15) {
        right_margin = 270;
    } else {
        right_margin = 220; 
    }

    switch (selector_values['Legend_Position']) {
        case 'Right':
            if (title.length > 110) {
                top_margin = 100;
            } else if (title.length > 50) {
                top_margin = 70;
            } else {
                top_margin = 35; 
            }
            margin = {'t':top_margin, 'l':120, 'r':right_margin, 'b':60};
            legend_width = right_margin;
            legend_height = 25*(legend_items.length+1);
            break;

        case 'Bottom':
            if (title.length > 140) {
                top_margin = 100;
            } else if (title.length > 70) {
                top_margin = 70;
            } else {
                top_margin = 35; 
            }
            margin = {'t':top_margin, 'l':90, 'r':25, 'b':0};
            legend_width = total_width - margin.l;
            legend_start_x = margin.l;
            n_cols = Math.floor(legend_width/(legend_item_max_length*14+legend_icon_padding+marker_radius/8));
            if(n_cols>legend_items.length) {
                n_cols = legend_items.length;
            }
            n_rows = Math.ceil(legend_items.length/n_cols);
            legend_height = (n_rows+1)*30;
            margin.b = 65 + (n_rows+1)*30;
            if (legend_title=="") {
                legend_height = (n_rows)*32;
                margin.b = 65 + (n_rows)*32;
            }
            break;
            
        default:
            if (title.length > 140) {
                top_margin = 100;
            } else if (title.length > 70) {
                top_margin = 70;
            } else {
                top_margin = 35; 
            }
            margin = {'t':top_margin, 'l':120, 'r':20, 'b':60};
            legend_width = right_margin;
            break;
    }
    
    width = total_width - margin.l - margin.r;
    height = total_height - margin.t - margin.b;
    targetSVG.attr('width', total_width)
        .attr('height', total_height);
    targetG.attr('transform', `translate(${margin.l}, ${margin.t})`);
    x_scale.range([0, width]);
    y_scale.range([height, 0]);

    return plot_data;
}

function updateColorScale() {
    let colorMap = {},
        isValid = true;
    
    legend_items.forEach(d => {
        let sel = d3.select(`#id_hexInp_${d.replace(/\W/g,'_')}`);
        if (sel.node()!==null) {
            if (sel.node().value=="") {
                isValid = false;
            }
            colorMap[d] = sel.node().value;
        } else
            isValid = false;
        
    })
    
    if (isValid) {
        color_scale = d3.scaleOrdinal().domain(Object.keys(colorMap)).range(Object.values(colorMap));
    } else {
        color_scale = d3.scaleOrdinal(d3.schemeCategory10);
        color_scale.domain(legend_items);
        if (color_scale.domain().length>10) {
            color_scale = d3.scaleOrdinal(d3.schemePaired);
        }
    }
}

function updateColorLabels(plot_data) {
    for (let i = 0; i < plot_data.length; i++) {
        Object.keys(aliases).forEach(d => {
            let c = plot_data[i]['c'];
            plot_data[i]['c'] = c.replace(d, aliases[d]);
        })
    }
    return plot_data;
}

function updateLegend() {
    legend_items = legend_items.sort((a,b) => d3.ascending(+a, +b));
    switch (selector_values['Legend_Position']) {
        case 'Right':
            updateLegend_right(legend_items);
            break;
        case 'Bottom':
            updateLegend_bottom(legend_items);
            break;
        default:
            updateLegend_right(legend_items);
            break;
    }
    // updateDisplaySelection();
}

function updateLegend_right(legend_items) {
    legendG.attr('transform', `translate(${total_width - 0.97*margin.r}, ${margin.t + height/2 - legend_height/2})`)

    let legend_top = 40,
        legend_y_scale = d3.scaleBand().domain(legend_items).range([legend_height,legend_top]);

    legendG.selectAll('*').remove();

    legendG.selectAll(".legendTitle")
        .data([1])
        .join('text')
            .attr('transform', `translate(${legend_width/2}, 20)`)
            .attr("class", 'legendTitle')
            .text(legend_title)

    legendG.selectAll(".legendIcon")
        .data(legend_items)
        .join('circle')
            .attr('cx', marker_radius)
            .attr('cy', d => legend_y_scale(d))
            .attr('r', marker_radius)
            .attr('fill', d => color_scale(d))
            .attr("class", 'legendIcon')

    legendG.selectAll(".legendIconText")
        .data(legend_items)
        .join('text')
            .attr('x', 3*marker_radius + legend_icon_padding)
            .attr('y', d => legend_y_scale(d))
            .attr("class", 'legendIconText')
            .style('alignment-baseline', 'middle')
            .text(d => d)   
}

function updateLegend_bottom(legend_items) {
    legendG.selectAll('*').remove();
    legendG.attr('transform', `translate(${legend_start_x}, ${total_height-legend_height})`)

    let legend_y_scale = d3.scaleBand().domain([...Array(n_rows).keys()]).range([0, legend_height,]),
        legend_x_scale = d3.scaleBand().domain([...Array(n_cols).keys()]).range([0, legend_width]);
    if (legend_title!="") {
        legend_y_scale = d3.scaleBand().domain([...Array(n_rows).keys()]).range([35, legend_height,]);
        legendG.selectAll(".legendTitle")
            .data([legend_title])
            .join('text')
                .attr('transform', `translate(${legend_width/2}, 10)`)
                .attr("class", 'legendTitle')
                .style('font-size', `${d3.select('#Legend_Font_Size').node().value}px`)
                .text(d => d)
    }

    legendG.selectAll(".legendIcon")
        .data(legend_items)
        .join('path')
            .attr('transform', (d,i) => `translate(${legend_x_scale(i%n_cols)}, ${legend_y_scale(Math.floor(i/n_cols))})`)
            .attr('fill', d => color_scale(d))
            .attr("class", 'legendIcon')
            .attr('d', d => {
                let symSel = d3.select(`#id_symbol_${d.replace(/\W/g,'_')}`)
                if (symSel.node()!==null) {
                    return getSymbol(symSel.node().value);
                } else {
                    return d3.symbol().type(d3.symbolCircle).size(marker_radius)();
                }
                
            });

    legendG.selectAll(".legendIconText")
        .data(legend_items)
        .join('text')
            .attr('x', (d,i) => legend_x_scale(i%n_cols)+marker_radius/8)
            .attr('y', (d,i) => legend_y_scale(Math.floor(i/n_cols)))
            .attr("class", 'legendIconText')
            .style('alignment-baseline', 'middle')
            .style('font-size', `${d3.select('#Legend_Font_Size').node().value}px`)
            .text(d => d)  
}


readFiles('Throughput').then(() => {
    display();
});
d3.selectAll('.configButton').on("click", configurationChanged)

function startTour() {
    introJs().start();
}


d3.selectAll('#btnUpdate').on('click', display);
