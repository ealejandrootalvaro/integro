var exports = module.exports = {};

exports.buildModifications = function buildModifications (model, fieldsInModel, fieldsInModification, modifications) {
    fieldsInModification.forEach( (modificationField, index) => {
        if (typeof modifications[modificationField] != 'undefined' || typeof modifications[modificationField] != 'null') {
            model[fieldsInModel[index]] = modifications[modificationField];
        }
    });
    return model;
}