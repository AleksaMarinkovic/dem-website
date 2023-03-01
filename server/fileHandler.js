const fs = require('fs');

const deleteFile = (url) => {
    fs.unlink(url, (err) => {
        if (err) {
            return err;
        }    
        console.log("Delete File successfully.");
        return true;
    });
};
exports.deleteFile = deleteFile;

