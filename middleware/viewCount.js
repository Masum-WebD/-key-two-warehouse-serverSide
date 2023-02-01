let count =0
const viewCount = (req,res,next) => {
    count++
    // res.send('count is starting')
    console.log(count)
    next()
}
module.exports=viewCount;