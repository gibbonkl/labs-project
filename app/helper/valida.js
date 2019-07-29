const removeTags = (value) => {
    let str = value.replace(/<[^>]{0,}>/g, '');
    return str;
};