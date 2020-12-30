const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 8080;
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use('/contents/', express.static('static'));

app.get(/^\/api\/current.json(\?.*)?/, (req, res) => {
    console.log(req.query);
    var duration = req.query.duration;
    var interval = req.query.interval;
    var time = new Date().getTime() / 1000;
    var time_label = new Array();
    for(i=duration,j=0;i>=0;i-=interval){
        time_label[j++] = -i;
    }
    var Iu_data = time_label.map((x)=>10*Math.sin(time+x));
    var Iv_data = time_label.map((x)=>10*Math.sin(time+x+2*(Math.PI/3)));
    var Iw_data = time_label.map((x)=>10*Math.sin(time+x-2*(Math.PI/3)));

    res.json({
        labels: time_label.map((x)=>x.toPrecision(4)),
        datasets: [
            {
                label: 'Iu(A)',
                data: Iu_data,
                borderColor: "rgba(255,128,128,1)",
                backgroundColor: "rgba(0,0,0,0)"
            },
            {
                label: 'Iv(A)',
                data: Iv_data,
                borderColor: "rgba(128,255,128,1)",
                backgroundColor: "rgba(0,0,0,0)"
            },
            {
                label: 'Iw(A)',
                data: Iw_data,
                borderColor: "rgba(128,128,255,1)",
                backgroundColor: "rgba(0,0,0,0)"
            },
        ],
    }
    );

    //send("<html><body>Received GET API<BR> at " + req.url +"</body></html>");
});
app.get(/.*/, (req, res) => {
    console.log(req.body);
    res.send("<html><body>Received GET something<BR> at " + req.url + "</body></html>");
});
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
