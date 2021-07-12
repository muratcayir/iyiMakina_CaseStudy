exports.getIndexPage = (req, res) => {
    res.status(200).render("index");
  };
  
  exports.getPanel= async (req,res)=>{
    res.status(200).render("panel")
  }