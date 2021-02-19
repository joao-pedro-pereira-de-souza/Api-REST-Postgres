const bcryptj = require('bcryptjs')

exports.HashPassword = async (password) =>{
    return await bcryptj.hash(password , 10);
}
