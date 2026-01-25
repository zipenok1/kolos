module.exports = function fileFormat(img){
    const allowed = ['jpg', 'jpeg', 'png']
    const extension = img.name.split('.').pop().toLowerCase()

    if (!allowed.includes(extension)){
        throw new Error('недопустимый формат файла. Разрешены: jpg, jpeg, png')
    }

    return extension
}