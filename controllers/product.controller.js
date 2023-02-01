let tools = [
    {
        id:1,
        tool:"Hammer"
    },
    {
        id:2,
        tool:"Hammer2"
    },
    {
        id:3,
        tool:"Hammer3"
    },
];
module.exports.getAllProducts = (req, res) => {
    const {ip,query,params,path}=req
    // console.log(ip,query,params,path)
    // res.download(__dirname + "/product.controller.js")
    res.send(tools);
  }
  module.exports.saveProducts =(req, res) => {
    console.log(req.body)
    tools.push(req.body)
    res.send(tools);
  }
  module.exports.specificProducts = (req, res) => {
    const {id}=req.params;
    const findTools =tools.find(tool => tool.id == id);
    res.send(findTools);
  }
  
  module.exports.updateProducts = (req, res) => {
    const {id}=req.params;
    const newData = tools.find(tool => tool.id === Number(id));
    newData.id = id;
    newData.tool = req.body.tool
    res.send(newData);
  }

  module.exports.deleteProducts=(req, res) => {
    const {id}=req.params;
    tools = tools.filter(tool => tool.id !== Number(id));
    res.send(tools)
  }