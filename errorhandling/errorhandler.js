
const HttpStatus = require('http-status-codes');

const commonUtils = {
	errorHandler(response, error) {
		response.status(error.statusCode || HttpStatus.INTERNAL_SERVER_ERROR).send({ message: error.message || error });
	},
	unAuthorized(response, error) {
		response.status(error.statusCode || HttpStatus.UNAUTHORIZED).send({ message: error.message || error });
	},
	success(response, data) {
		response.status(HttpStatus.OK).send(data);
	},
};

module.exports=commonUtils;



// router.get('/', (request, response) => {
//     promoCodeService.fetchPromoCode().then(user => {
//         httpResponse.success(response, { data: user });
//     }).catch(error => {
//         httpResponse.errorHandler(response, error);
//     })
// });

// function fetchPromoCodeById(promo_code_id) {
//     return new Promise((resolve, reject) => {
//       return PromoCode.find({
//         where: { id: promo_code_id }, attributes: ['promoCodeId', 'code', 'units', 'offer_users', 'offer_available']
//       }).then(promoCode => {
//         resolve(promoCode)
//       }).catch(error => {
//         console.log(error)
//         return reject(error)
//       });

//     });
  