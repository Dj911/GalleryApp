exports.handleResponse = ({res,statusCode=200,msg="Success",data={}})=>{
    res.status(statusCode).json({msg,data});        // instead of .json({}) you can use .send({}) to send other type of data too
}