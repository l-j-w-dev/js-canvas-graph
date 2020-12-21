function newGraph() {
    if (document.querySelector('.graph-wrap').children[0] != undefined) {
        document.querySelector('.graph-wrap').children[0].remove();
    }
    let values = [];
    let maxRandom = Math.floor(Math.random() * 2000) + 300;
    for (let i = 0; i < Math.floor(Math.random() * 15) + 8; i++) {
        let a = new Object();
        a.name = String.fromCharCode(97 + i);
        a.value = Math.floor(Math.random() * maxRandom);
        values.push(a);
    }
    drawGraph(document.querySelector('.graph-wrap'), values)
}

newGraph();

function drawGraph(parent, obj) {
    const canvas = document.createElement('canvas');
    canvas.width = parent.offsetWidth;
    canvas.height = parent.offsetHeight;
    const graph = {
        max: Math.max(...obj.map(a => a.value)),
        min: Math.min(...obj.map(a => a.value)),
        width: parent.offsetWidth,
        height: parent.offsetHeight - 40,
    }
    const calcHeight = (graph.height - 40) / graph.max;
    const calcWidth = 0.93 - (obj.length / (graph.width));
    document.querySelector('.graph-wrap').append(canvas);
    const ctx = canvas.getContext('2d');

    ctx.save();
    ctx.beginPath();
    ctx.strokeStyle = 'black';
    ctx.moveTo(0, canvas.height - 40);
    ctx.lineTo(canvas.width, canvas.height - 40);
    ctx.stroke();
    ctx.beginPath();
    for (let i = 0; i < obj.length; i++) {
        ctx.lineTo(((i + (obj.length / 10)) / obj.length * canvas.width) * calcWidth, graph.height - (obj[i].value * calcHeight));
        ctx.font = (16 * calcWidth) + 'px Arial'
        ctx.strokeStyle = 'red'
        ctx.fillText(obj[i].value, ((i + (obj.length / 10)) / obj.length * canvas.width) * calcWidth - 10, graph.height - (obj[i].value * calcHeight) - 10);

    }
    ctx.stroke();
    ctx.beginPath();
    for (let i = 0; i < obj.length; i++) {
        ctx.strokeStyle = '#c5c5c5'
        ctx.setLineDash([5, 3]);
        ctx.moveTo(((i + (obj.length / 10)) / obj.length * canvas.width) * calcWidth, graph.height - (obj[i].value * calcHeight));
        ctx.lineTo(((i + (obj.length / 10)) / obj.length * canvas.width) * calcWidth, graph.height);
        ctx.font = (16 * calcWidth) + 'px Arial'
        ctx.fillText(obj[i].name, ((i + (obj.length / 10)) / obj.length * canvas.width) * calcWidth - 8,
            graph.height + 20);
    }
    ctx.stroke();
    ctx.restore();
}